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

        $disposisi = Disposisi::with([
            'suratMasuk',
            'tujuanDisposisi.penerima',
            'tujuanDisposisi.riwayatTindakLanjut',
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

        $disposisiMapped = $disposisi->map(function ($d) {
            // Karena status_tindak_lanjut sudah enum object, pakai ->value
            $statusList = $d->tujuanDisposisi->pluck('status_tindak_lanjut')->map(function ($status) {
                return $status->value; // ← Ambil value dari enum object
            })->toArray();

            $allSelesai = collect($statusList)->every(fn($s) => $s == StatusTindakLanjut::SELESAI->value);
            $anyProses = collect($statusList)->contains(fn($s) => $s == StatusTindakLanjut::PROSES->value);
            $anySelesai = collect($statusList)->contains(fn($s) => $s == StatusTindakLanjut::SELESAI->value);

            $statusGlobal = match (true) {
                $allSelesai => 'semua_selesai',
                $anyProses || $anySelesai => 'sebagian_proses',
                default => 'tertunda',
            };

            return [
                'id' => $d->id,
                'tanggal_disposisi' => $d->tanggal_disposisi->format('Y-m-d'),
                'instruksi' => $d->isi_surat,
                'waktu_berjalan' => now()->diffForHumans($d->tanggal_disposisi, true),
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

                'status_global' => $statusGlobal,

                // OPTION 1: Pakai ->value
                'penerima' => $d->tujuanDisposisi->map(function ($t) {
                    return [
                        'id' => $t->id,
                        'nama' => $t->penerima?->nama_lengkap ?? '-',
                        'jabatan' => $t->penerima?->jabatan?->value ?? '-',
                        'status' => match ($t->status_tindak_lanjut->value) { // ← ->value di sini
                            StatusTindakLanjut::BELUM->value => 'belum',
                            StatusTindakLanjut::PROSES->value => 'proses',
                            StatusTindakLanjut::SELESAI->value => 'selesai',
                            StatusTindakLanjut::DIBATALKAN->value => 'tertunda',
                            default => 'belum',
                        },
                        'tanggal_update' => $t->updated_at?->format('Y-m-d H:i:s') ?? null,
                        'laporan' => null,
                    ];
                }),


                'count' => [
                    'belum'  => $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::BELUM)->count(),
                    'proses' => $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::PROSES)->count(),
                    'selesai' => $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::SELESAI)->count(),
                    'batal'  => $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::DIBATALKAN)->count(),
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
