<?php

namespace App\Http\Controllers\Verif;

use App\Http\Controllers\Controller;
use App\Http\Requests\Verif\SuratKeluarRequest;
use App\Models\SuratKeluar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuratKeluarController extends Controller
{
    public function index()
    {
        return Inertia::render('Verif/SuratKeluar', [

        ]);
    }

    public function store(SuratKeluarRequest $request)
    {
        $data = $request->validated();

        SuratKeluar::created($data);

        return redirect()->route('')->with('success', 'Surat keluar berhasil dibuat');
    }
}