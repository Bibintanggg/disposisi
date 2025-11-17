<?php

use App\Http\Controllers\Admin\DashboardAdminController;
use App\Http\Controllers\Admin\ManageUserController;
use App\Http\Controllers\Kepala\DashboardKepalaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Staf\DashboardStafController;
use App\Http\Controllers\Verif\DashboardVerifController;
use App\Http\Enum\Jabatan;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function() {
    Route::middleware(['jabatan:'.Jabatan::ADMIN->value])->group(function() {
        Route::get('/admin/dashboard', [DashboardAdminController::class, 'index'])->name('admin.dashboard');
        Route::get('/admin/manage-user', [ManageUserController::class, 'index'])->name('admin.manage-user');
        Route::post('/admin/manage-user', [ManageUserController::class, 'store'])->name('admin.manage-user.store');
        
        Route::get('/admin/master-data', [ManageUserController::class, 'masterBidang'])->name('admin.master-bidang');
        Route::post('/admin/master-data', [ManageUserController::class, 'storeBidang'])->name('admin.master-bidang.store');
    });

    Route::middleware(['jabatan:'.Jabatan::KEPALA->value])->group(function() {
        Route::get('kepala/dashboard', [DashboardKepalaController::class, 'index'])->name('kepala.dashboard');
    });

    Route::middleware(['jabatan:'.Jabatan::STAF->value])->group(function() {
        Route::get('staf/dashboard', [DashboardStafController::class, 'index'])->name('staf.dashboard');
    });

    Route::middleware(['jabatan:'.Jabatan::VERIFIKATOR->value])->group(function() {
        Route::get('verif/dashboard', [DashboardVerifController::class, 'index'])->name('verif.dashboard');

        Route::get('verif/input-surat-masuk', function() {
            return Inertia::render('Verif/SuratMasuk');
        });
        
        
        Route::get('verif/daftar-surat-masuk', function() {
            return Inertia::render('Verif/DaftarSuratMasuk');
        });
        
        Route::get('verif/daftar-surat-keluar', function() {
            return Inertia::render('Verif/DaftarSuratKeluar');
        });

        Route::get('verif/input-surat-keluar', function() {
            return Inertia::render('Verif/SuratKeluar');
        });

        Route::get('verif/cetak-verifikasi', function() {
            return Inertia::render('Verif/CetakVerifikasi');
        });
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
