<?php

namespace App\Services\Staf;

use App\Models\TujuanDisposisi;
use App\Models\RiwayatTindakLanjut;
use App\Http\Enum\StatusTindakLanjut;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardStafService
{
    public function getStats(int $staffId): array
    {
        $today = Carbon::now();
        $fourDaysAgo = $today->copy()->subDays(4);

        return [
            'tugas_baru' => TujuanDisposisi::where('penerima_id', $staffId)
                ->where('status_tindak_lanjut', StatusTindakLanjut::BELUM)
                ->count(),

            'tugas_proses' => TujuanDisposisi::where('penerima_id', $staffId)
                ->where('status_tindak_lanjut', StatusTindakLanjut::PROSES)
                ->count(),

            'tugas_deadline' => TujuanDisposisi::where('penerima_id', $staffId)
                ->whereIn('status_tindak_lanjut', [StatusTindakLanjut::BELUM, StatusTindakLanjut::PROSES])
                ->whereHas('disposisi', function ($query) use ($fourDaysAgo) {
                    $query->where('tanggal_disposisi', '<=', $fourDaysAgo);
                })
                ->count(),

            'laporan_menunggu' => TujuanDisposisi::where('penerima_id', $staffId)
                ->where('status_tindak_lanjut', StatusTindakLanjut::PROSES)
                ->whereDoesntHave('riwayatTindakLanjut', function ($query) {
                    $query->where('tanggal_laporan', '>=', Carbon::now()->subDays(3));
                })
                ->count()
        ];
    }

    /**
     * Get performance metrics for the staff
     */
    public function getPerformanceData(int $staffId): array
    {
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        // Total tasks this month
        $totalTasks = TujuanDisposisi::where('penerima_id', $staffId)
            ->whereHas('disposisi', function ($query) use ($startOfMonth, $endOfMonth) {
                $query->whereBetween('tanggal_disposisi', [$startOfMonth, $endOfMonth]);
            })
            ->count();

        // Completed tasks this month
        $completedTasks = TujuanDisposisi::where('penerima_id', $staffId)
            ->where('status_tindak_lanjut', StatusTindakLanjut::SELESAI)
            ->whereBetween('tanggal_selesai', [$startOfMonth, $endOfMonth])
            ->count();

        // Completion rate
        $tingkatPenyelesaian = $totalTasks > 0
            ? round(($completedTasks / $totalTasks) * 100, 1)
            : 0;

        // Average completion time
        $rataWaktu = TujuanDisposisi::where('penerima_id', $staffId)
            ->where('status_tindak_lanjut', StatusTindakLanjut::SELESAI)
            ->whereNotNull('tanggal_selesai')
            ->whereBetween('tanggal_selesai', [$startOfMonth, $endOfMonth])
            ->join('disposisi', 'tujuan_disposisi.disposisi_id', '=', 'disposisi.id')
            ->selectRaw('AVG(DATEDIFF(tujuan_disposisi.tanggal_selesai, disposisi.tanggal_disposisi)) as avg_days')
            ->value('avg_days');

        return [
            'tingkat_penyelesaian' => $tingkatPenyelesaian,
            'rata_waktu' => $rataWaktu ? round($rataWaktu, 1) : 0,
            'total_selesai_bulan_ini' => $completedTasks,
            'trend_laporan' => $this->getTrendLaporan($staffId),
            'status_tugas' => $this->getStatusTugas($staffId),
            'trend_selesai' => $this->getTrendSelesai($staffId)
        ];
    }

    /**
     * Get report submission trend (last 4 weeks)
     */
    private function getTrendLaporan(int $staffId): array
    {
        $weeks = [];
        $today = Carbon::now();

        for ($i = 3; $i >= 0; $i--) {
            $weekStart = $today->copy()->subWeeks($i)->startOfWeek();
            $weekEnd = $today->copy()->subWeeks($i)->endOfWeek();

            $count = RiwayatTindakLanjut::whereHas('tujuan', function ($query) use ($staffId) {
                $query->where('penerima_id', $staffId);
            })
                ->whereBetween('tanggal_laporan', [$weekStart, $weekEnd])
                ->count();

            $weeks[] = [
                'minggu' => 'W' . ($i === 0 ? 'Now' : ($i + 1)),
                'jumlah' => $count
            ];
        }

        return $weeks;
    }

    /**
     * Get task status distribution
     */
    private function getStatusTugas(int $staffId): array
    {
        $total = TujuanDisposisi::where('penerima_id', $staffId)->count();

        if ($total === 0) {
            return [
                ['status' => 'Selesai', 'jumlah' => 0, 'persen' => 0, 'color' => 'green'],
                ['status' => 'Proses', 'jumlah' => 0, 'persen' => 0, 'color' => 'blue'],
                ['status' => 'Belum', 'jumlah' => 0, 'persen' => 0, 'color' => 'gray']
            ];
        }

        $selesai = TujuanDisposisi::where('penerima_id', $staffId)
            ->where('status_tindak_lanjut', StatusTindakLanjut::SELESAI)
            ->count();

        $proses = TujuanDisposisi::where('penerima_id', $staffId)
            ->where('status_tindak_lanjut', StatusTindakLanjut::PROSES)
            ->count();

        $belum = TujuanDisposisi::where('penerima_id', $staffId)
            ->where('status_tindak_lanjut', StatusTindakLanjut::BELUM)
            ->count();

        return [
            [
                'status' => 'Selesai',
                'jumlah' => $selesai,
                'persen' => round(($selesai / $total) * 100, 0),
                'color' => 'green'
            ],
            [
                'status' => 'Proses',
                'jumlah' => $proses,
                'persen' => round(($proses / $total) * 100, 0),
                'color' => 'blue'
            ],
            [
                'status' => 'Belum',
                'jumlah' => $belum,
                'persen' => round(($belum / $total) * 100, 0),
                'color' => 'gray'
            ]
        ];
    }

    /**
     * Get completion trend (last 5 periods)
     */
    private function getTrendSelesai(int $staffId): array
    {
        $trends = [];
        $today = Carbon::now();

        for ($i = 4; $i >= 0; $i--) {
            $weekStart = $today->copy()->subWeeks($i)->startOfWeek();
            $weekEnd = $today->copy()->subWeeks($i)->endOfWeek();

            $count = TujuanDisposisi::where('penerima_id', $staffId)
                ->where('status_tindak_lanjut', StatusTindakLanjut::SELESAI)
                ->whereBetween('tanggal_selesai', [$weekStart, $weekEnd])
                ->count();

            $monthName = $weekStart->format('M');
            $weekNumber = $weekStart->weekOfMonth;

            $trends[] = [
                'periode' => $monthName . ' W' . $weekNumber,
                'jumlah' => $count
            ];
        }

        return $trends;
    }

    /**
     * Get urgent tasks (inbox priority)
     */
    public function getTugasMendesak(int $staffId): array
    {
        // Top 3 new tasks (ordered by urgency)
        $tugasBaru = TujuanDisposisi::with([
            'disposisi.suratMasuk',
            'disposisi.pengirim'
        ])
            ->where('penerima_id', $staffId)
            ->where('status_tindak_lanjut', StatusTindakLanjut::BELUM)
            ->whereHas('disposisi.suratMasuk')
            ->orderByRaw("
                CASE 
                    WHEN EXISTS (
                        SELECT 1 FROM surat_masuk sm 
                        JOIN disposisi d ON d.surat_id = sm.id 
                        WHERE d.id = tujuan_disposisi.disposisi_id 
                        AND sm.sifat_surat = 4
                    ) THEN 1
                    WHEN EXISTS (
                        SELECT 1 FROM surat_masuk sm 
                        JOIN disposisi d ON d.surat_id = sm.id 
                        WHERE d.id = tujuan_disposisi.disposisi_id 
                        AND sm.sifat_surat = 2
                    ) THEN 2
                    ELSE 3
                END
            ")
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($tugas) {
                $surat = $tugas->disposisi->suratMasuk;
                return [
                    'id' => $tugas->id,
                    'nomor_surat' => $surat->nomor_surat,
                    'perihal' => $surat->isi_surat,
                    'instruksi' => $tugas->disposisi->isi_surat ?? 'Tidak ada instruksi khusus',
                    'sifat' => $surat->sifat_surat->label(),
                    'dari' => $tugas->disposisi->pengirim->name ?? 'Sistem',
                    'waktu' => $tugas->created_at->diffForHumans()
                ];
            });

        // Top 3 longest running tasks
        $tugasProses = TujuanDisposisi::with([
            'disposisi.suratMasuk',
            'disposisi.pengirim',
            'riwayatTindakLanjut'
        ])
            ->where('penerima_id', $staffId)
            ->where('status_tindak_lanjut', StatusTindakLanjut::PROSES)
            ->whereHas('disposisi.suratMasuk')
            ->join('disposisi', 'tujuan_disposisi.disposisi_id', '=', 'disposisi.id')
            ->orderBy('disposisi.tanggal_disposisi', 'asc')
            ->select('tujuan_disposisi.*')
            ->limit(3)
            ->get()
            ->map(function ($tugas) {
                $surat = $tugas->disposisi->suratMasuk;
                $start = Carbon::parse($tugas->disposisi->tanggal_disposisi);
                $now = Carbon::now();

                $totalMinutes = $start->diffInMinutes($now);

                $days = intdiv($totalMinutes, 1440);
                $hours = intdiv($totalMinutes % 1440, 60);
                $minutes = $totalMinutes % 60;

                if ($days > 0) {
                    $waktuBerjalan = "{$days}h {$hours}j";
                } elseif ($hours > 0) {
                    $waktuBerjalan = "{$hours}j {$minutes}m";
                } else {
                    $waktuBerjalan = "{$minutes}m";
                }
                $latestReport = $tugas->riwayatTindakLanjut->last();

                return [
                    'id' => $tugas->id,
                    'nomor_surat' => $surat->nomor_surat,
                    'perihal' => $surat->isi_surat,
                    'instruksi' => $tugas->disposisi->isi_surat ?? 'Tidak ada instruksi khusus',
                    'waktu_berjalan' => $waktuBerjalan,
                    'dari' => $tugas->disposisi->pengirim->name ?? 'Sistem',
                    'progress' => $latestReport ?
                        (strlen($latestReport->deskripsi) > 40 ?
                            substr($latestReport->deskripsi, 0, 40) . '...' :
                            $latestReport->deskripsi) :
                        'Belum ada laporan'
                ];
            });

        return [
            'tugas_baru_teratas' => $tugasBaru,
            'tugas_proses_terlama' => $tugasProses
        ];
    }
}
