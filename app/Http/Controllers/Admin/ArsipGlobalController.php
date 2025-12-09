<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SuratKeluar;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArsipGlobalController extends Controller
{
    public function index(Request $request)
    {
        $queryMasuk = SuratMasuk::with('users');
        $queryKeluar = SuratKeluar::query();

        if ($request->search) {
            $search = $request->search;
            $queryMasuk->where(function ($q) use ($search) {
                $q->where('nomor_surat', 'like', '%' . $search . '%')
                    ->orWhere('pengirim', 'like', '%' . $search . '%')
                    ->orWhere('isi_surat', 'like', '%' . $search . '%');
            });
        }

        $suratMasuk = $queryMasuk->get();
        $suratKeluar = $queryKeluar->get(); 

        return Inertia::render('Admin/ArsipGlobal', [
            'suratMasuk' => $suratMasuk,
            'suratKeluar' => $suratKeluar,
            'filters' => $request->only('search')
        ]);
    }
}
