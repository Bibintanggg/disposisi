<?php

namespace App\Http\Controllers\Staf;

use App\Http\Controllers\Controller;
use App\Http\Enum\StatusTindakLanjut;
use App\Models\TujuanDisposisi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DaftarTindakLanjutController extends Controller
{
    public function index()
    {
        $tugasList = TujuanDisposisi::with(['disposisi.suratMasuk', 'disposisi.pengirim'])
            ->where('penerima_id', Auth::id())
            ->whereIn('status_tindak_lanjut', [
                StatusTindakLanjut::BELUM->value,
                StatusTindakLanjut::PROSES->value
            ])
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nomor_surat' => $item->disposisi->suratMasuk->nomor_surat ?? '-',
                    'perihal' => $item->disposisi->suratMasuk->isi_surat ?? '-',
                    'dari_kepala' => $item->disposisi->pengirim->nama_lengkap ?? '-',
                ];
            });


        return Inertia::render('Staf/DaftarTindakLanjut', [
            'tugasList' => $tugasList
        ]);
    }
}
