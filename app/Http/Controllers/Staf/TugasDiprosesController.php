<?php

namespace App\Http\Controllers\Staf;

use App\Http\Controllers\Controller;
use App\Http\Enum\StatusTindakLanjut;
use App\Models\TujuanDisposisi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TugasDiprosesController extends Controller
{
    public function index()
    {
        $surat = TujuanDisposisi::with([
            'disposisi.suratMasuk',
            'disposisi.pengirim'
        ])
            ->where('penerima_id', Auth::id())
            ->where('status_tindak_lanjut', StatusTindakLanjut::PROSES->value)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                $surat = $item->disposisi->suratMasuk;

                return [
                    'id' => $item->id,
                    'nomor_surat' => $surat->nomor_surat,
                    'perihal' => $surat->isi_surat,
                    'instruksi' => $item->disposisi->isi_surat,
                    'dari_kepala' => $item->disposisi->pengirim->nama_lengkap ?? '-',
                    'sifat_surat' => $surat->sifat_surat->label(),
                    'tanggal_disposisi' => Carbon::parse($item->disposisi->tanggal_disposisi)
                        ->translatedFormat('d M Y'),
                    'tanggal_disposisi_raw' => $item->disposisi->tanggal_disposisi,

                ];
            });
        return Inertia::render('Staf/TugasProses', [
            'surat' => $surat,
        ]);
    }

    public function lihatSurat($id)
    {
        $item = TujuanDisposisi::with(['disposisi.suratMasuk'])
            ->where('id', $id)
            ->where('penerima_id', Auth::id())
            ->firstOrFail();

        $surat = $item->disposisi->suratMasuk;

        $filePath = $surat->gambar ?? null;

        if (!$filePath || !Storage::disk('public')->exists($filePath)) {
            abort(404, 'File surat tidak ditemukan.');
        }

        return response()->file(storage_path("app/public/" . $filePath));
    }

    public function selesaikan($id)
    {
        $item = TujuanDisposisi::where('id', $id)
            ->where('penerima_id', Auth::id())
            ->firstOrFail();

        $item->update([
            'status_tindak_lanjut' => StatusTindakLanjut::SELESAI->value,
            'tanggal_selesai' => now(),
        ]);

        return back()->with('success', 'Tugas berhasil diselesaikan.');
    }
}
