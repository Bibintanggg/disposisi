<?php

namespace App\Http\Controllers\Kepala;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Disposisi;
use App\Http\Enum\Jabatan;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use App\Http\Enum\StatusAkhir;
use App\Models\TujuanDisposisi;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class SuratMenungguController extends Controller
{
    public function index()
    {
        $suratMasuk = SuratMasuk::where('status_akhir', StatusAkhir::BARU->value)
            ->get()
            ->map(function ($surat) {
                return [
                    'id' => $surat->id,
                    'nomor_surat' => $surat->nomor_surat,
                    'tanggal_surat' => $surat->tanggal_surat,
                    'tanggal_terima' => $surat->tanggal_terima,
                    'pengirim' => $surat->pengirim,
                    'isi_surat' => $surat->isi_surat,
                    'sifat_surat' => $surat->sifat_surat->value,
                ];
            });

        return Inertia::render('Kepala/SuratMenunggu', [
            'suratMenunggu' => $suratMasuk
        ]);
    }

    public function showDisposisi($id)
    {
        $surat = SuratMasuk::findOrFail($id);

        $staffList = User::where('jabatan', Jabatan::STAF->value)
            ->with('bidang')
            ->get()
            ->map(fn($user) => [
                'id' => $user->id,
                'name' => $user->nama_lengkap,
                'bidang' => $user->bidang->nama_bidang ?? '-'
            ]);

        return Inertia::render('Kepala/ShowDisposisi', [
            'surat' => $surat,
            'staffList' => $staffList
        ]);
    }

    public function previewFile($id)
    {

        $surat = SuratMasuk::findOrFail($id);

        if (!$surat->gambar) {
            abort(404, 'File surat tidak ditemukan');
        }

        $path = storage_path('app/public/' . $surat->gambar);

        if (!file_exists($path)) {
            abort(404, 'File surat tidak ditemukan');
        }

        return response()->file($path);
    }

    public function submitDisposisi(Request $request)
    {
        $validated = $request->validate([
            'surat_id' => 'required|exists:surat_masuk,id',
            'instruksi' => 'required|string',
            'staff_ids' => 'required|array|min:1',
            'staff_ids.*' => 'exists:users,id'
        ]);

        DB::transaction(function () use ($validated) {

            // Update status akhir surat
            SuratMasuk::where('id', $validated['surat_id'])
                ->update(['status_akhir' => 2]); // DISPOSISI

            // Buat disposisi
            $disposisi = Disposisi::create([
                'surat_id' => $validated['surat_id'],
                'pengirim_id' => Auth::id(),
                'isi_surat' => $validated['instruksi'],
                'tanggal_disposisi' => now(),
            ]);

            // Simpan tujuan disposisi
            foreach ($validated['staff_ids'] as $staffId) {
                TujuanDisposisi::create([
                    'disposisi_id' => $disposisi->id,
                    'penerima_id' => $staffId,
                    'status_tindak_lanjut' => 1, // belum
                ]);
            }
        });

        return redirect()->route('kepala.surat-menunggu')
            ->with('success', 'Disposisi berhasil dikirim!');
    }
}
