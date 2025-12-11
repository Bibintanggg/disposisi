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
        ])
        ->where('pengirim_id', Auth::id()) // hanya disposisi si Kepala
        ->when($search, function ($query) use ($search) {
            $query->whereHas('suratMasuk', function ($q) use ($search) {
                $q->where('nomor_surat', 'LIKE', "%$search%")
                  ->orWhere('perihal', 'LIKE', "%$search%");
            });
        })
        ->latest()
        ->get();

        // Proses status global
        $disposisi = $disposisi->map(function ($d) {
            $statusList = $d->tujuanDisposisi->pluck('status_tindak_lanjut')->toArray();

            // Status global: ambil status "TERBURUK"
            $globalStatus = collect($statusList)->max();

            return [
                'id' => $d->id,
                'tanggal_disposisi' => $d->tanggal_disposisi,
                'surat_masuk' => $d->suratMasuk,
                'instruksi' => $d->isi_disposisi,
                
                'status_global' => $globalStatus,  // 1 / 2 / 3 / 4

                // hitung berjalan
                'waktu_berjalan' => now()->diffForHumans($d->tanggal_disposisi, true),

                // kirim tujuan
                'penerima' => $d->tujuanDisposisi->map(function ($t) {
                    return [
                        'id' => $t->id,
                        'penerima' => $t->penerima?->nama,
                        'status' => $t->status_tindak_lanjut,
                    ];
                }),

                // statistik
                'count' => [
                    'belum'  => $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::BELUM->value)->count(),
                    'proses' => $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::PROSES->value)->count(),
                    'selesai'=> $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::SELESAI->value)->count(),
                    'batal'  => $d->tujuanDisposisi->where('status_tindak_lanjut', StatusTindakLanjut::DIBATALKAN->value)->count(),
                ],
            ];
        });

        return Inertia::render('Kepala/LacakDisposisi', [
            'disposisi' => $disposisi,
            'filters' => [
                'search' => $search,
            ]
        ]);
    }



    // DETAIL PELACAKAN
    public function show($id)
    {
        $data = Disposisi::with([
            'suratMasuk',
            'tujuanDisposisi.penerima',
            'tujuanDisposisi.riwayat',
        ])
        ->where('id', $id)
        ->firstOrFail();

        return Inertia::render('Kepala/LacakDisposisiDetail', [
            'data' => $data
        ]);
    }
}
