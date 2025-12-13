<?php

namespace App\Http\Controllers\Kepala;

use App\Http\Controllers\Controller;
use App\Http\Enum\StatusAkhir;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArsipSuratMasukController extends Controller
{
    public function index(Request $request)
    {
        $query = SuratMasuk::with(['users', 'disposisi.pengirim.bidang']);

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
                'file_path' => $surat->gambar ?? null,
            ];
        });

        $countSelesai = $arsipSurat->where('status_akhir', StatusAkhir::SELESAI->value)->count();
        $countArsip   = $arsipSurat->where('status_akhir', StatusAkhir::ARSIP->value)->count();
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
}
