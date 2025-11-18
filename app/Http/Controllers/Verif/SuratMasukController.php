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
}
