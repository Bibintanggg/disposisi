<?php

namespace App\Http\Controllers\Verif;

use App\Http\Controllers\Controller;
use App\Http\Enum\StatusArsip;
use App\Http\Enum\StatusCetak;
use App\Http\Enum\StatusVerifikasi;
use App\Models\SuratKeluar;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VerifikasiController extends Controller
{
    public function index()
    {
        $surat = SuratMasuk::with("users")->get()->map(function ($s) {
            $statusVerifikasiString = match ($s->status_verifikasi) {
                StatusVerifikasi::PENDING => "pending",
                StatusVerifikasi::TERVERIFIKASI => "approved",
                StatusVerifikasi::REVISI => "review",
                StatusVerifikasi::DITOLAK => "rejected",
                default => "pending"
            };

            $statusCetakString = match ($s->status_cetak) {
                StatusCetak::BELUM_CETAK => "belum",
                StatusCetak::SUDAH_CETAK => "sudah",
                default => "Belum Di Cetak"
            };

            return [
                "id" => $s->id,
                "nomor_surat" => $s->nomor_surat,
                "tanggal_surat" => $s->tanggal_surat,
                "tanggal_pengajuan" => $s->tanggal_terima,
                "pengirim_penerima" => $s->pengirim,
                "isi_surat" => $s->isi_surat,
                "jenis" => "masuk",
                "status_verifikasi" => $statusVerifikasiString,
                "status_cetak" => $statusCetakString,
                "diajukan_oleh" => $s->users->nama_lengkap ?? "-",
                "diverifikasi_oleh" => $s->diverifikasi_oleh,
                "tanggal_verifikasi" => $s->tanggal_verifikasi,
                "catatan_verifikasi" => $s->catatan_verifikasi,
                "dicetak_oleh" => $s->dicetak_oleh,
                "tanggal_cetak" => $s->tanggal_cetak,
            ];
        });

        $suratKeluar = SuratKeluar::with(['unit_pengirim', 'user_penanda_tangan'])->get()->map(function ($s) {
            $statusVerifikasiString = match ($s->status_verifikasi) {
                StatusVerifikasi::PENDING => "pending",
                StatusVerifikasi::TERVERIFIKASI => "approved",
                StatusVerifikasi::REVISI => "review",
                StatusVerifikasi::DITOLAK => "rejected",
                default => "pending"
            };

            $statusCetakString = match ($s->status_cetak) {
                StatusCetak::BELUM_CETAK => "belum",
                StatusCetak::SUDAH_CETAK => "sudah",
                default => "Belum Di Cetak"
            };

            $statusArsip = match ($s->status_arsip) {
                StatusArsip::BELUM_DIARSIP => "belum",
                StatusArsip::SUDAH_DIARSIP => "sudah",
                default => "belum"
            };

            return [
                "id" => $s->id,
                "unit_pengirim_id" => $s->unit_pengirim_id,
                "user_penanda_tangan_id" => $s->user_penanda_tangan_id,
                "nomor_surat" => $s->nomor_surat,
                "tanggal_surat" => $s->tanggal_surat,
                "penerima" => $s->penerima,
                "isi_surat" => $s->isi_surat,
                "gambar" => $s->gambar,
                "tanggal_kirim" => $s->tanggal_kirim,
                "status_arsip" => $s->status_arsip,
                "created_at" => $s->created_at,
                "updated_at" => $s->updated_at,
                "unit_pengirim" => [
                    "id" => $s->unit_pengirim->id,
                    "nama_bidang" => $s->unit_pengirim->nama_bidang ?? "-"
                ],
                "user_penanda_tangan" => [
                    "id" => $s->user_penanda_tangan->id,
                    "nama_lengkap" => $s->user_penanda_tangan->nama_lengkap ?? "-",
                    "jabatan" => $s->user_penanda_tangan->jabatan ?? null
                ],
                "jenis" => "keluar",
                "status_verifikasi" => $statusVerifikasiString,
                "status_cetak" => $statusCetakString,
                "status_arsip" => $statusArsip,
                "diajukan_oleh" => $s->user_penanda_tangan->nama_lengkap ?? "-",
                "diverifikasi_oleh" => $s->diverifikasi_oleh,
                "tanggal_verifikasi" => $s->tanggal_verifikasi,
                "catatan_verifikasi" => $s->catatan_verifikasi,
                "dicetak_oleh" => $s->dicetak_oleh,
                "tanggal_cetak" => $s->tanggal_cetak,
            ];
        });

        return Inertia::render("Verif/CetakVerifikasi", [
            "suratMasuk" => $surat,
            'suratKeluar' => $suratKeluar
        ]);
    }

    public function approve(Request $request, $id)
    {
        $request->validate([
            'catatan_verifikasi' => 'nullable|string|max:500',
        ]);

        $jenis = $request->input('jenis');
        
        if ($jenis === 'masuk') {
            $surat = SuratMasuk::findOrFail($id);
        } else {
            $surat = SuratKeluar::findOrFail($id);
        }

        $surat->update([
            'status_verifikasi' => StatusVerifikasi::TERVERIFIKASI,
            'diverifikasi_oleh' => Auth::user()->nama_lengkap,
            'tanggal_verifikasi' => now(),
            'catatan_verifikasi' => $request->catatan_verifikasi,
        ]);

        return redirect()->back()->with('success', 'Surat berhasil disetujui!');
    }

    public function reject(Request $request, $id)
    {
        $request->validate([
            'catatan_verifikasi' => 'required|string|max:500',
        ]);

        $jenis = $request->input('jenis'); // 'masuk' atau 'keluar'
        
        if ($jenis === 'masuk') {
            $surat = SuratMasuk::findOrFail($id);
        } else {
            $surat = SuratKeluar::findOrFail($id);
        }

        $surat->update([
            'status_verifikasi' => StatusVerifikasi::DITOLAK,
            'diverifikasi_oleh' => Auth::user()->nama_lengkap,
            'tanggal_verifikasi' => now(),
            'catatan_verifikasi' => $request->catatan_verifikasi,
        ]);

        return redirect()->back()->with('success', 'Surat berhasil ditolak!');
    }

    public function print(Request $request, $id)
    {
        $jenis = $request->input('jenis'); // 'masuk' atau 'keluar'
        
        if ($jenis === 'masuk') {
            $surat = SuratMasuk::findOrFail($id);
        } else {
            $surat = SuratKeluar::findOrFail($id);
        }

        // Pastikan surat sudah diverifikasi
        if ($surat->status_verifikasi !== StatusVerifikasi::TERVERIFIKASI) {
            return redirect()->back()->with('error', 'Surat belum diverifikasi!');
        }

        $surat->update([
            'status_cetak' => StatusCetak::SUDAH_CETAK,
            'dicetak_oleh' => Auth::user()->nama_lengkap,
            'tanggal_cetak' => now(),
        ]);

        return redirect()->back()->with('success', 'Surat berhasil dicetak!');
    }
}