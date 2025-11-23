<?php

namespace App\Http\Controllers\Verif;

use App\Http\Controllers\Controller;
use App\Http\Requests\Verif\SuratKeluarRequest;
use App\Models\Bidang;
use App\Models\SuratKeluar;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuratKeluarController extends Controller
{
    public function index()
    {
        $suratKeluar = SuratKeluar::with(['unit_pengirim', 'user_penanda_tangan'])
            ->orderBy('created_at', 'desc')
            ->get();
            
        $bidangs = Bidang::select('id', 'nama_bidang')->get();
        $users = User::select('id', 'nama_lengkap', 'jabatan')->get();
        return Inertia::render('Verif/SuratKeluar', [
            'suratKeluar' => $suratKeluar,
            'bidangs' => $bidangs,
            'users' => $users
        ]);
    }

    public function store(SuratKeluarRequest $request)
    {
        $data = $request->validated();

        // dd($data);
        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('surat-keluar', $filename, 'public');
            $data['gambar'] = $path;
        }

        SuratKeluar::create($data);

        return redirect()->route('verif.surat-keluar')->with('success', 'Surat keluar berhasil dibuat');
    }

    public function previewFile($filename)
    {
        $path = storage_path('app/public/surat-keluar/' . $filename);

        if (!file_exists($path)) {
            abort(404);
        }

        return response()->file($path);
    }
}