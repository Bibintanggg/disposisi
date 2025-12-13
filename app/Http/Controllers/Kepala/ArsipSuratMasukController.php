<?php

namespace App\Http\Controllers\Kepala;

use App\Http\Controllers\Controller;
use App\Http\Enum\StatusAkhir;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArsipSuratMasukController extends Controller
{
    public function index(Request $request)
    {
        $query = SuratMasuk::with(['users', 'disposisi.pengirim.bidang', 'disposisi.tujuanDisposisi.penerima']);

        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nomor_surat', 'like', "%$search%")
                    ->orWhere('pengirim', 'like', "%$search%")
                    ->orWhere('isi_surat', 'like', "%$search%");
            });
        }

        if ($request->status_akhir) {
            $query->where('status_akhir', $request->status_akhir);
        }

        if ($request->tanggal_dari) {
            $query->whereDate('tanggal_terima', '>=', $request->tanggal_dari);
        }

        if ($request->tanggal_sampai) {
            $query->whereDate('tanggal_terima', '<=', $request->tanggal_sampai);
        }

        $arsipSurat = $query->get()->map(function ($surat) {
            $disposisiPertama = $surat->disposisi->first();
            $riwayat = [];

            foreach ($surat->disposisi as $disposisi) {
                // Event disposisi dibuat
                $riwayat[] = [
                    'judul' => 'Disposisi Dibuat',
                    'deskripsi' => 'Oleh ' . ($disposisi->pengirim->nama_lengkap ?? '-'),
                    'tanggal' => $disposisi->tanggal_disposisi,
                    'warna' => 'blue',
                ];

                foreach ($disposisi->tujuanDisposisi as $tujuan) {
                    $riwayat[] = [
                        'judul' => 'Tindak Lanjut',
                        'deskripsi' => ($tujuan->penerima->nama_lengkap ?? '-') .
                            ' - ' .
                            ($tujuan->status_tindak_lanjut?->label() ?? 'Belum Ditentukan'),
                        'tanggal' => $tujuan->tanggal_selesai ?? $disposisi->tanggal_disposisi,
                        'warna' => match ($tujuan->status_tindak_lanjut) {
                            \App\Http\Enum\StatusTindakLanjut::SELESAI => 'green',
                            \App\Http\Enum\StatusTindakLanjut::PROSES => 'yellow',
                            \App\Http\Enum\StatusTindakLanjut::DIBATALKAN => 'red',
                            default => 'gray',
                        },
                    ];
                }
            }


            return [
                'id' => $surat->id,
                'nomor_surat' => $surat->nomor_surat,
                'pengirim' => $surat->pengirim,
                'perihal' => $surat->isi_surat,
                'tanggal_terima' => $surat->tanggal_terima,
                'status_akhir' => [
                    'value' => $surat->status_akhir->value ?? $surat->status_akhir,
                    'label' => $surat->status_akhir->label() ?? '-',
                ],

                'bidang' => $disposisiPertama?->pengirim?->bidang?->nama_bidang ?? '-',
                'disposisi_oleh' => $surat->users->nama_lengkap ?? '-',
                'riwayat_disposisi' => collect($riwayat)
                    ->sortBy('tanggal')
                    ->values(),

                'file_path' => $surat->gambar ?? null,
            ];
        });

        $countSelesai = $arsipSurat->filter(
            fn($s) => $s['status_akhir']['value'] === StatusAkhir::SELESAI->value
        )->count();

        $countArsip = $arsipSurat->filter(
            fn($s) => $s['status_akhir']['value'] === StatusAkhir::ARSIP->value
        )->count();
        $totalSurat   = $arsipSurat->count();

        return Inertia::render('Kepala/ArsipSuratMasuk', [
            'arsipSurat' => $arsipSurat,
            'stats' => [
                'total' => $totalSurat,
                'selesai' => $countSelesai,
                'arsip' => $countArsip,
            ]
        ]);
    }

    public function download(SuratMasuk $surat)
    {
        if (!$surat->gambar) {
            return Redirect::back()->with(
                'error',
                'File surat belum diunggah.'
            );
        }

        $path = $surat->gambar;

        if (!Storage::disk('public')->exists($path)) {
            return Redirect::back()->with(
                'error',
                'File surat tidak ditemukan atau sudah dihapus.'
            );
        }

        return Storage::disk('public')->download(
            $path,
            'Surat-' . $surat->nomor_surat . '.pdf'
        );
    }
}
