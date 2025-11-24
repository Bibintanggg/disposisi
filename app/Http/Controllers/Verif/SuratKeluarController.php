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

    public function suratTerakhir(Request $request)
    {
        $query = SuratKeluar::with(['unit_pengirim', 'user_penanda_tangan']);

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nomor_surat', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('penerima', 'LIKE', '%' . $request->search . '%')
                    ->orWhere('isi_surat', 'LIKE', '%' . $request->search . '%');
            });
        }

        return Inertia::render('Verif/SuratKeluar', [
            'suratKeluar' => $query->get(),
            'filters' => $request->only('search'),
            'bidangs' => Bidang::all(),
            'users' => User::all(),
        ]);
    }

    public function previewFile($filename)
    {
        $path = storage_path('app/public/surat-keluar/' . $filename);

        if (!file_exists($path)) {
            abort(404);
        }

        return response()->file($path);
    }

    public function daftarSuratKeluar(Request $request)
    {
        $query = SuratKeluar::with(['unit_pengirim', 'user_penanda_tangan'])
            ->orderBy('tanggal_kirim', 'desc');

        // Filter berdasarkan search (nomor surat, penerima, isi surat)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nomor_surat', 'LIKE', '%' . $search . '%')
                    ->orWhere('penerima', 'LIKE', '%' . $search . '%')
                    ->orWhere('isi_surat', 'LIKE', '%' . $search . '%');
            });
        }

        // Filter berdasarkan unit pengirim
        if ($request->filled('unit_pengirim_id') && $request->unit_pengirim_id !== 'all') {
            $query->where('unit_pengirim_id', $request->unit_pengirim_id);
        }

        // Filter berdasarkan status arsip
        if ($request->filled('status_arsip') && $request->status_arsip !== 'all') {
            $query->where('status_arsip', $request->status_arsip);
        }

        // Filter berdasarkan tanggal
        if ($request->filled('tanggal_dari')) {
            $query->whereDate('tanggal_surat', '>=', $request->tanggal_dari);
        }

        if ($request->filled('tanggal_sampai')) {
            $query->whereDate('tanggal_surat', '<=', $request->tanggal_sampai);
        }

        $suratKeluar = $query->get();
        $bidangs = Bidang::select('id', 'nama_bidang')->get();
        $users = User::select('id', 'nama_lengkap', 'jabatan')->get();

        return Inertia::render('Verif/DaftarSuratKeluar', [
            'suratKeluar' => $suratKeluar,
            'bidangs' => $bidangs,
            'users' => $users,
            'filters' => $request->only(['search', 'unit_pengirim_id', 'status_arsip', 'tanggal_dari', 'tanggal_sampai'])
        ]);
    }
}
