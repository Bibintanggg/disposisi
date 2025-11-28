<?php

namespace App\Http\Controllers\Verif;

use App\Http\Controllers\Controller;
use App\Http\Enum\StatusArsip;
use App\Http\Enum\StatusCetak;
use App\Http\Enum\StatusVerifikasi;
use App\Models\SuratKeluar;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
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
            };

            $statusCetakString = match ($s->status_cetak) {
                StatusCetak::BELUM_CETAK => "belum",
                StatusCetak::SUDAH_CETAK => "sudah",
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

        $suratKeluar = SuratKeluar::with('user_penanda_tangan')->get()->map(function ($s) {
            $statusArsip = match ($s->status_arsip) {
                StatusArsip::BELUM_DIARSIP => "belum",
                StatusArsip::SUDAH_DIARSIP => "sudah"
            };

            return [
                "id" => $s->id,
                "unit_pengirim_id" => $s->unit_pengirim->nama_bidang ?? "-",
                "user_penanda_tangan_id" => $s->user_penanda_tangan->nama_lengkap ?? "-",
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


        return Inertia::render("Verif/CetakVerifikasi", [
            "suratMasuk" => $surat
        ]);
    }
}
