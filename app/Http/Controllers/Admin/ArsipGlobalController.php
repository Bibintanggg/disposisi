<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Bidang;
use App\Models\SuratKeluar;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArsipGlobalController extends Controller
{
    public function index(Request $request)
    {
        $bidang = Bidang::all();

        // Surat Masuk
        $queryMasuk = SuratMasuk::query();

        if ($request->search) {
            $search = $request->search;
            $queryMasuk->where(function ($q) use ($search) {
                $q->where('nomor_surat', 'like', '%' . $search . '%')
                    ->orWhere('pengirim', 'like', '%' . $search . '%')
                    ->orWhere('isi_surat', 'like', '%' . $search . '%');
            });
        }

        if ($request->sifat) {
            $queryMasuk->where('sifat', $request->sifat);
        }

        if ($request->statusAkhir) {
            $queryMasuk->where('status_akhir', $request->statusAkhir);
        }

        if ($request->tanggalMulai) {
            $queryMasuk->whereDate('tanggal_terima', '>=', $request->tanggalMulai);
        }

        if ($request->tanggalAkhir) {
            $queryMasuk->whereDate('tanggal_terima', '<=', $request->tanggalAkhir);
        }

        $suratMasuk = $queryMasuk->with('users')->paginate(10)->withQueryString();

        // Surat Keluar
        $queryKeluar = SuratKeluar::query();

        if ($request->search) {
            $search = $request->search;
            $queryKeluar->where(function ($q) use ($search) {
                $q->where('nomor_surat', 'like', '%' . $search . '%')
                    ->orWhere('penerima', 'like', '%' . $search . '%')
                    ->orWhere('isi_surat', 'like', '%' . $search . '%');
            });
        }

        if ($request->unitPengirim) {
            $queryKeluar->whereHas('unit_pengirim', function($q) use ($request) {
                $q->where('nama_bidang', $request->unitPengirim);
            });
        }

        if ($request->statusArsip) {
            $queryKeluar->where('status_arsip', $request->statusArsip);
        }

        if ($request->tanggalMulai) {
            $queryKeluar->whereDate('tanggal_kirim', '>=', $request->tanggalMulai);
        }

        if ($request->tanggalAkhir) {
            $queryKeluar->whereDate('tanggal_kirim', '<=', $request->tanggalAkhir);
        }

        $suratKeluar = $queryKeluar->with('unit_pengirim')->paginate(10)->withQueryString();

        return Inertia::render('Admin/ArsipGlobal', [
            'suratMasuk' => $suratMasuk,
            'suratKeluar' => $suratKeluar,
            'bidang' => $bidang
        ]);
    }
}
