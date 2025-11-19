<?php

namespace App\Http\Controllers\Verif;

use App\Http\Controllers\Controller;
use App\Http\Requests\Verif\SuratMasukRequest;
use App\Models\SuratMasuk;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuratMasukController extends Controller
{
    public function index()
    {
        return Inertia::render('Verif/SuratMasuk', [
            'surat' => SuratMasuk::with('users')->get()
        ]);
    }

    public function store(SuratMasukRequest $request)
    {
        SuratMasuk::create($request->validated());

        return redirect()->route('verif.input-surat-masuk')->with('success', 'Data surat berhasil dibuat');
    }

    public function daftarSurat(Request $request)
    {
        $query = SuratMasuk::with('users');

        if ($request->nomor_surat) {
            $query->where(function ($q) use ($request) {
                $q->where('nomor_surat', 'like', '%' . $request->nomor_surat . '%')
                    ->orWhere('pengirim', 'like', '%' . $request->nomor_surat . '%')
                    ->orWhere('isi_surat', 'like', '%' . $request->nomor_surat . '%');
            });
        }

        return Inertia::render('Verif/DaftarSuratMasuk', [
            'surat' => SuratMasuk::with("users")->get(),
            'filters' => $request->only('nomor_surat')
        ]);
    }
}
