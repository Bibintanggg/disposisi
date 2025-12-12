<?php

namespace App\Http\Controllers\Staf;

use App\Http\Controllers\Controller;
use App\Http\Enum\StatusTindakLanjut;
use App\Models\RiwayatTindakLanjut;
use App\Models\TujuanDisposisi;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanTindakLanjutController extends Controller
{
    public function form($id)
    {
        $tugas = TujuanDisposisi::with(['disposisi.suratMasuk', 'disposisi.pengirim'])
            ->where('penerima_id', Auth::id())
            ->findOrFail($id);

        return Inertia::render('Staf/LaporanTindakLanjut', [
            'tugas' => [
                'id' => $tugas->id,
                'nomor_surat' => $tugas->disposisi->suratMasuk->nomor_surat,
                'perihal' => $tugas->disposisi->suratMasuk->isi_surat,
                'instruksi' => $tugas->disposisi->isi_surat,
                'dari_kepala' => $tugas->disposisi->pengirim->nama_lengkap,
                'file_path' => Storage::url($tugas->disposisi->suratMasuk->gambar),
                'has_file' => !!$tugas->disposisi->suratMasuk->gambar,
            ]
        ]);
    }


    public function lihatSurat()
    {
        $tugas = TujuanDisposisi::with(['disposisi.suratMasuk'])
            ->where('penerima_id', Auth::id())
            ->whereIn('status_tindak_lanjut', [
                StatusTindakLanjut::BELUM->value,
                StatusTindakLanjut::PROSES->value
            ])
            ->latest()
            ->firstOrFail();

        $surat = $tugas->disposisi->suratMasuk;
        $file = $surat->gambar;

        if (!$file || !Storage::disk('public')->exists($file)) {
            abort(404, 'File surat tidak ditemukan.');
        }

        return response()->file(storage_path('app/public/' . $file));
    }

    public function store(Request $request)
    {
        $tugas = TujuanDisposisi::where('penerima_id', Auth::id())
            ->whereIn('status_tindak_lanjut', [
                StatusTindakLanjut::BELUM->value,
                StatusTindakLanjut::PROSES->value
            ])
            ->latest()
            ->firstOrFail();

        $request->validate([
            'deskripsi_laporan' => 'required|min:10',
            'judul_laporan' => 'nullable|string|max:255',
            'file_laporan' => 'nullable|file|max:5120'
        ]);

        $file = null;
        if ($request->hasFile('file_laporan')) {
            $file = $request->file('file_laporan')->store('laporan', 'public');
        }

        // Simpan laporan
        RiwayatTindakLanjut::create([
            'tujuan_id' => $tugas->id,
            'tanggal_laporan' => now(),
            'deskripsi' => $request->deskripsi_laporan,
            'file_laporan' => $file
        ]);

        if ($request->tandai_selesai) {
            $tugas->update([
                'status_tindak_lanjut' => StatusTindakLanjut::SELESAI->value
            ]);
        }

        return back()->with('success', 'Laporan berhasil dikirim!');
    }
}
