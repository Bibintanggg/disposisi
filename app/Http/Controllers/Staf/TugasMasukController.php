<?php

namespace App\Http\Controllers\Staf;

use App\Http\Controllers\Controller;
use App\Models\TujuanDisposisi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Enum\StatusTindakLanjut;
use Inertia\Inertia;

class TugasMasukController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $tugas = TujuanDisposisi::with([
            'disposisi.suratMasuk',
            'disposisi.pengirim'
        ])
            ->where('penerima_id', $userId)
            ->where('status_tindak_lanjut', StatusTindakLanjut::BELUM->value)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                $surat = $item->disposisi->suratMasuk;

                $fileName = $surat->gambar;

                // DEBUG: Log informasi file
                \Log::info('File info for surat ' . $surat->id . ':', [
                    'file_name' => $fileName,
                    'file_exists' => $fileName ? Storage::disk('public')->exists($fileName) : false,
                    'storage_path' => $fileName ? storage_path('app/public/' . $fileName) : null,
                    'all_files_in_surat' => Storage::disk('public')->files('surat')
                ]);

                // PERBAIKI DI SINI: Gunakan Storage::url() atau url()
                $fileUrl = $fileName ? Storage::url($fileName) : null;
                // atau: $fileUrl = $fileName ? url('storage/' . $fileName) : null;

                $hasFile = $fileName && Storage::disk('public')->exists($fileName);

                return [
                    'id' => $item->id,
                    'nomor_surat' => $surat->nomor_surat,
                    'perihal' => $surat->isi_surat,
                    'instruksi' => $item->disposisi->isi_surat,
                    'dari_kepala' => $item->disposisi->pengirim->nama_lengkap ?? '-',
                    'sifat_surat' => $surat->sifat_surat->label(),
                    'tanggal_disposisi' => $item->disposisi->tanggal_disposisi,
                    'file_path' => $fileUrl,
                    'has_file' => $hasFile,
                ];
            });

        return Inertia::render('Staf/TugasMasuk', [
            'tugas' => $tugas,
        ]);
    }

    public function mulai($id)
    {
        $tugas = TujuanDisposisi::findOrFail($id);

        $tugas->status_tindak_lanjut = StatusTindakLanjut::PROSES->value;
        $tugas->save();

        return back()->with('success', 'Tugas telah dipindahkan ke sedang diproses');
    }
}
