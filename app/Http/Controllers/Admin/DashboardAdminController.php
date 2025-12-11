<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Enum\StatusVerifikasi;
use App\Models\Bidang;
use App\Models\SuratKeluar;
use App\Models\SuratMasuk;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardAdminController extends Controller
{
    public function index()
    {
        $suratMasuk = SuratMasuk::get();
        $suratKeluar = SuratKeluar::get();
        $unitKerja = Bidang::get();
        $users = User::get();

        $suratMenunggu = SuratMasuk::where(['status_verifikasi', StatusVerifikasi::PENDING]);

        $recentMasuk = SuratMasuk::with('users')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($item) {
                return [
                    'type' => 'masuk',
                    'nomor' => $item->nomor_surat,
                    'detail' => $item->pengirim,
                    'verifikator' => $item->users?->nama_lengkap ?? '-',
                    'timestamp' => $item->created_at->diffForHumans(),
                    'created_at' => $item->created_at,
                ];
            });

        $recentKeluar = SuratKeluar::with('verifikator')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($item) {
                return [
                    'type' => 'keluar',
                    'nomor' => $item->nomor_surat,
                    'detail' => $item->penerima,
                    'verifikator' => $item->verifikator?->name ?? '-',
                    'timestamp' => $item->created_at->diffForHumans(),
                    'created_at' => $item->created_at,
                ];
            });

        $recentActivity = $recentMasuk
            ->merge($recentKeluar)
            ->sortByDesc('created_at')
            ->take(5)
            ->values();

        return Inertia::render("Admin/Dashboard", [
            'suratMasuk' => $suratMasuk,
            'suratKeluar' => $suratKeluar,
            'unitKerja' => $unitKerja,
            'users' => $users,
            'suratMenunggu' => $suratMenunggu,
            'recentActivity' => $recentActivity,
        ]);
    }
}
