<?php

namespace App\Http\Controllers\Kepala;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Enum\StatusTindakLanjut;
use App\Models\Disposisi;
use Illuminate\Support\Facades\Auth;

class LacakDisposisiController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        // Ambil semua disposisi yang dibuat oleh Kepala yang sedang login
        $disposisi = Disposisi::with([
            'suratMasuk',
            'tujuanDisposisi.penerima',
            'tujuanDisposisi.riwayatTindakLanjut', // Tambahkan ini dari show method
        ])
            ->where('pengirim_id', Auth::id())
            ->when($search, function ($query) use ($search) {
                $query->whereHas('suratMasuk', function ($q) use ($search) {
                    $q->where('nomor_surat', 'LIKE', "%$search%")
                        ->orWhere('perihal', 'LIKE', "%$search%");
                });
            })
            ->latest()
            ->get();

        // Map disposisi untuk frontend - SERTAKAN SEMUA DATA DARI SHOW METHOD
        $disposisiMapped = $disposisi->map(function ($d) {
            $statusList = $d->tujuanDisposisi->pluck('status_tindak_lanjut')->toArray();

            // Status global: ambil status TERBURUK (max)
            $globalStatus = collect($statusList)->max();

            // Buat struktur yang SAMA PERSIS dengan yang ada di show method
            return [
                'id' => $d->id,
                // Data utama (sudah ada)
                'tanggal_disposisi' => $d->tanggal_disposisi->format('Y-m-d'),
                'instruksi' => $d->isi_surat,
                'waktu_berjalan' => now()->diffForHumans($d->tanggal_disposisi, true),

                // Data dari show method - TAMBAHKAN SEMUA FIELD INI
                'nomor_surat' => $d->suratMasuk?->nomor_surat ?? '-',
                'isi_disposisi' => $d->isi_surat ?? '-',

                'file_surat' => $d->suratMasuk?->gambar
                    ? asset('storage/' . $d->suratMasuk->gambar)
                    : null,

                'surat' => [
                    'nomor_surat' => $d->suratMasuk?->nomor_surat,
                    'perihal' => $d->suratMasuk?->perihal,
                    'file_surat' => $d->suratMasuk?->gambar
                        ? asset('storage/' . $d->suratMasuk->gambar)
                        : null,
                ],

                'status_global' => match ($globalStatus) {
                    StatusTindakLanjut::BELUM->value => 'tertunda',
                    StatusTindakLanjut::PROSES->value => 'sebagian_proses',
                    StatusTindakLanjut::SELESAI->value => 'semua_selesai',
                    StatusTindakLanjut::DIBATALKAN->value => 'tertunda',
                    default => 'tertunda',
                },

                // penerima - PASTIKAN FORMATNYA SAMA DENGAN SHOW METHOD
                'penerima' => $d->tujuanDisposisi->map(function ($t) {
                    return [
                        'id' => $t->id,
                        'nama' => $t->penerima?->nama_lengkap ?? '-',
                        'jabatan' => $t->penerima?->jabatan?->value ?? '-',
                        'status' => match ($t->status_tindak_lanjut) {
                            StatusTindakLanjut::BELUM => 'belum',
                            StatusTindakLanjut::PROSES => 'proses',
                            StatusTindakLanjut::SELESAI => 'selesai',
                            StatusTindakLanjut::DIBATALKAN => 'tertunda',
                            default => 'belum',
                        },
                        'tanggal_update' => $t->updated_at?->format('Y-m-d H:i:s') ?? null,
                        'laporan' => null,
                    ];
                }),

                // statistik penerima
                'count' => [
                    'belum'  => $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::BELUM->value)->count(),
                    'proses' => $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::PROSES->value)->count(),
                    'selesai' => $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::SELESAI->value)->count(),
                    'batal'  => $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::DIBATALKAN->value)->count(),
                ],
            ];
        });

        return Inertia::render('Kepala/LacakDisposisi', [
            'disposisi' => $disposisiMapped,
            'filters' => [
                'search' => $search,
            ]
        ]);
    }

}
