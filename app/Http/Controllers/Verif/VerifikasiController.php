<?php

namespace App\Http\Controllers\Verif;

use App\Http\Controllers\Controller;
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
        $surat = SuratMasuk::with("user_input")->get()->map(function ($s) {

            // normalize verifikasi → string untuk UI
            $statusVerifikasiString = match (StatusVerifikasi::from($s->status_verifikasi)) {
                StatusVerifikasi::PENDING => "pending",
                StatusVerifikasi::TERVERIFIKASI => "approved",
                StatusVerifikasi::REVISI => "review",
                StatusVerifikasi::DITOLAK => "rejected",
            };

            // normalize cetak
            $statusCetakString = match (StatusCetak::from($s->status_cetak)) {
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

                "diajukan_oleh" => $s->user_input->name ?? "-",
                "diverifikasi_oleh" => $s->diverifikasi_oleh,
                "tanggal_verifikasi" => $s->tanggal_verifikasi,
                "catatan_verifikasi" => $s->catatan_verifikasi,
                "dicetak_oleh" => $s->dicetak_oleh,
                "tanggal_cetak" => $s->tanggal_cetak,
            ];
        });

            // dd($surat);

        return Inertia::render("Verif/CetakVerifikasi", [
            "suratMasuk" => $surat
        ]);
    }
}
