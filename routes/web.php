<?php

use App\Http\Controllers\Admin\ArsipGlobalController;
use App\Http\Controllers\Admin\DashboardAdminController;
use App\Http\Controllers\Admin\LaporanAuditController;
use App\Http\Controllers\Admin\ManageUserController;
use App\Http\Controllers\Kepala\DashboardKepalaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Staf\DashboardStafController;
use App\Http\Controllers\Verif\DashboardVerifController;
use App\Http\Controllers\Verif\SuratKeluarController;
use App\Http\Controllers\Verif\SuratMasukController;
use App\Http\Controllers\Verif\VerifikasiController;
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['jabatan:'.Jabatan::ADMIN->value])->group(function () {
        Route::get('/admin/dashboard', [DashboardAdminController::class, 'index'])->name('admin.dashboard');
        Route::get('/admin/manage-user', [ManageUserController::class, 'index'])->name('admin.manage-user');
        Route::post('/admin/manage-user', [ManageUserController::class, 'store'])->name('admin.manage-user.store');

        Route::get('/admin/master-data', [ManageUserController::class, 'masterBidang'])->name('admin.master-bidang');
        Route::post('/admin/master-data', [ManageUserController::class, 'storeBidang'])->name('admin.master-bidang.store');

        Route::get('/admin/arsip-global', [ArsipGlobalController::class, 'index'])->name('admin.arsip-global');

        // Route::get('/admin/laporan-audit', [LaporanAuditController::class, 'index'])->name('admin.laporan-audit');
    });

    Route::middleware(['jabatan:'.Jabatan::KEPALA->value])->group(function () {
        Route::get('kepala/dashboard', [DashboardKepalaController::class, 'index'])->name('kepala.dashboard');
    });

    Route::middleware(['jabatan:'.Jabatan::STAF->value])->group(function () {
        Route::get('staf/dashboard', [DashboardStafController::class, 'index'])->name('staf.dashboard');
    });

    Route::middleware(['jabatan:'.Jabatan::VERIFIKATOR->value])->group(function () {
        Route::get('verif/dashboard', [DashboardVerifController::class, 'index'])->name('verif.dashboard');
        Route::get('verif/input-surat-masuk', [SuratMasukController::class, 'index'])->name('verif.input-surat-masuk');
        Route::get('verif/input-surat-masuk/{filename}', [SuratMasukController::class, 'previewFile'])->name('verif.surat-masuk.file');
        Route::post('verif/input-surat-masuk', [SuratMasukController::class, 'store'])->name('verif.input-surat-masuk.store');

        Route::get('verif/daftar-surat-masuk', [SuratMasukController::class, 'daftarSurat'])->name('verif.daftar-surat-masuk');
        Route::delete('/verif/daftar-surat-masuk/{id}', [SuratMasukController::class, 'destroy'])->name('verif.surat-masuk.destroy');
        Route::get('/surat/download/{id}', [SuratMasukController::class, 'download'])
            ->name('surat.download');

        Route::get('verif/input-surat-keluar', [SuratKeluarController::class, 'index'])->name('verif.surat-keluar');
        Route::post('verif/input-surat-keluar', [SuratKeluarController::class, 'store'])->name('verif.surat-keluar.store');
        Route::get('verif/surat-keluar/file/{filename}', [SuratKeluarController::class, 'previewFile'])
            ->name('verif.surat-keluar.file');
        Route::get('verif/input-surat-keluar', [SuratKeluarController::class, 'suratTerakhir'])->name('verif.surat-keluar.search');

        Route::get('verif/daftar-surat-keluar', [SuratKeluarController::class, 'daftarSuratKeluar'])->name('verif.daftar-surat-keluar');
        Route::delete('verif/input-surat-keluar/{id}', [SuratKeluarController::class, 'destroy'])->name('verif.surat-keluar.destroy');

        Route::get('verif/cetak-verifikasi', [VerifikasiController::class, 'index'])->name('verif.cetak-verifikasi');
        Route::post('/verifikasi/{id}/approve', [VerifikasiController::class, 'approve'])->name('verif.approve');
        Route::post('/verifikasi/{id}/reject', [VerifikasiController::class, 'reject'])->name('verif.reject');
        Route::post('/verifikasi/{id}/print', [VerifikasiController::class, 'print'])->name('verif.print');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
