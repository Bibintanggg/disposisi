<?php

namespace App\Http\Controllers\Kepala;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\TujuanDisposisi;
use App\Http\Enum\StatusTindakLanjut;
use Carbon\Carbon;

class LaporanKinerjaController extends Controller
{
    public function index(Request $request)
    {
        $periode = $request->periode ?? 'bulan_ini';

        $startDate = match ($periode) {
            '3_bulan'   => now()->subMonths(3),
            '6_bulan'   => now()->subMonths(6),
            'tahun_ini' => now()->startOfYear(),
            default     => now()->startOfMonth(),
        };

        // ================= DATA KINERJA STAF =================
        $stafData = User::whereHas('tujuanDisposisi')
            ->with(['tujuanDisposisi' => function ($q) use ($startDate) {
                $q->whereDate('created_at', '>=', $startDate)
                  ->whereNot('status_tindak_lanjut', StatusTindakLanjut::DIBATALKAN);
            }])
            ->get()
            ->map(function ($staf) {

                $tugas = $staf->tujuanDisposisi;

                $total = $tugas->count();

                $selesai = $tugas->where(
                    'status_tindak_lanjut',
                    StatusTindakLanjut::SELESAI
                )->count();

                $proses = $tugas->where(
                    'status_tindak_lanjut',
                    StatusTindakLanjut::PROSES
                )->count();

                $belum = $tugas->where(
                    'status_tindak_lanjut',
                    StatusTindakLanjut::BELUM
                )->count();

                $rataHari = $tugas
                    ->where('status_tindak_lanjut', StatusTindakLanjut::SELESAI)
                    ->avg(fn ($t) =>
                        Carbon::parse($t->created_at)
                            ->diffInDays($t->tanggal_selesai)
                    );

                $tingkat = $total > 0
                    ? round(($selesai / $total) * 100)
                    : 0;

                return [
                    'id' => $staf->id,
                    'nama' => $staf->nama_lengkap,
                    'total_tugas' => $total,
                    'tugas_selesai' => $selesai,
                    'tugas_proses' => $proses,
                    'tugas_belum' => $belum,
                    'rata_hari' => round($rataHari ?? 0, 1),
                    'tingkat_penyelesaian' => $tingkat,
                ];
            });

        // ================= TUGAS TERTUNDA (>7 hari) =================
        $tugasTertunda = TujuanDisposisi::with([
                'penerima',
                'disposisi.suratMasuk'
            ])
            ->whereIn('status_tindak_lanjut', [
                StatusTindakLanjut::BELUM,
                StatusTindakLanjut::PROSES,
            ])
            ->whereDate('created_at', '<=', now()->subDays(7))
            ->get()
            ->map(function ($tugas) {
                return [
                    'id' => $tugas->id,
                    'staf' => $tugas->penerima->nama_lengkap,
                    'nomor_surat' => $tugas->disposisi->suratMasuk->nomor_surat ?? '-',
                    'perihal' => $tugas->disposisi->suratMasuk->perihal ?? '-',
                    'hari_tertunda' => now()->diffInDays($tugas->created_at),
                    'status' => $tugas->status_tindak_lanjut->label(),
                ];
            });

        return Inertia::render('Kepala/LaporanKinerja', [
            'stafData' => $stafData,
            'tugasTertunda' => $tugasTertunda,
            'filter' => $request->only(['periode']),
        ]);
    }
}
