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
        $data = $request->validated();

        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $filename = time() . '-' . $file->getClientOriginalName();
            $filePath = $file->storeAs('surat', $filename, 'public');

            $data['gambar'] = $filePath;
        }

        SuratMasuk::create($data);

        return redirect()->route('verif.input-surat-masuk')->with('success', 'Surat berhasil dibuat');
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

        if ($request->sifat && $request->sifat !== "all") {
            $query->where('sifat_surat', $request->sifat);
        }

        if ($request->status && $request->status !== "all") {
            $query->where('status_akhir', $request->status);
        }


        return Inertia::render('Verif/DaftarSuratMasuk', [
            'surat' => $query->get(),
            'filters' => $request->only('nomor_surat', 'sifat', 'status')
        ]);
    }

    public function destroy($id)
    {
        $surat = SuratMasuk::findOrFail($id);

        if ($surat->gambar && file_exists(storage_path('app/public/' . $surat->gambar))) {
            unlink(storage_path('app/public/' . $surat->gambar));
        }

        $surat->delete();

        return redirect()->back()->with('success', 'Surat berhasil dihapus');
    }

    public function download($id)
    {
        $surat = SuratMasuk::findOrFail($id);

        $file = storage_path('app/public/' . $surat->gambar);

        if (!file_exists($file)) {
            abort(404, 'File tidak ditemukan');
        }

        return response()->download($file);
    }
}
