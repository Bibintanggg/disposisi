<?php

namespace App\Http\Controllers\Kepala;

use App\Http\Controllers\Controller;
use App\Http\Enum\SifatSurat;
use App\Http\Enum\StatusAkhir;
use App\Http\Enum\StatusTindakLanjut;
use App\Models\SuratMasuk;
use App\Models\TujuanDisposisi;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardKepalaController extends Controller
{
    public function index()
    {
        $stats = [
            'surat_menunggu' => SuratMasuk::whereNull('status_akhir')->count(),

            'surat_urgen' => SuratMasuk::where(
                'sifat_surat',
                SifatSurat::SEGERA
            )->count(),

            'tugas_tertunda' => TujuanDisposisi::where(
                'status_tindak_lanjut',
                StatusTindakLanjut::PROSES
            )
                ->whereDate('created_at', '<=', now()->subDays(5))
                ->count(),

            'rata_waktu_disposisi' => round(
                DB::table('tujuan_disposisi')
                    ->join('disposisi', 'tujuan_disposisi.disposisi_id', '=', 'disposisi.id')
                    ->join('surat_masuk', 'disposisi.surat_id', '=', 'surat_masuk.id')
                    ->whereNotNull('tujuan_disposisi.tanggal_selesai')
                    ->avg(DB::raw(
                        'DATEDIFF(tujuan_disposisi.tanggal_selesai, surat_masuk.tanggal_terima)'
                    )) ?? 0,
                1
            ),

            'tingkat_penyelesaian' => $this->tingkatPenyelesaian(),
        ];

        /** =======================
         *  2. TREN DATA
         *  ======================= */
        $trendData = [
            'volume_surat' => $this->volumeSurat6Bulan(),
            'status_tugas' => $this->statusTugas(),
        ];

        /** =======================
         *  3. AKTIVITAS TERBARU
         *  ======================= */
        $recentActivities = [
            'laporan_terbaru' => $this->laporanTerbaru(),
            'surat_selesai' => $this->suratSelesaiTerbaru(),
        ];

        return Inertia::render('Kepala/Dashboard', [
            'stats' => $stats,
            'trendData' => $trendData,
            'recentActivities' => $recentActivities,
        ]);
    }

    /** =======================
     *  HELPER METHODS
     *  ======================= */

    private function tingkatPenyelesaian(): int
    {
        $total = TujuanDisposisi::count();
        if ($total === 0) return 0;

        $selesai = TujuanDisposisi::where(
            'status_tindak_lanjut',
            StatusTindakLanjut::SELESAI
        )->count();

        return round(($selesai / $total) * 100);
    }

    private function volumeSurat6Bulan(): array
    {
        return collect(range(5, 0))->map(function ($i) {
            $bulan = Carbon::now()->subMonths($i);

            return [
                'bulan' => $bulan->translatedFormat('M'),
                'jumlah' => SuratMasuk::whereMonth('tanggal_terima', $bulan->month)
                    ->whereYear('tanggal_terima', $bulan->year)
                    ->count(),
            ];
        })->values()->toArray();
    }

    private function statusTugas(): array
    {
        $total = TujuanDisposisi::count();
        if ($total === 0) $total = 1;

        return collect([
            StatusTindakLanjut::SELESAI,
            StatusTindakLanjut::PROSES,
            StatusTindakLanjut::BELUM,
        ])->map(function ($status) use ($total) {
            $jumlah = TujuanDisposisi::where(
                'status_tindak_lanjut',
                $status
            )->count();

            return [
                'status' => $status->label(),
                'jumlah' => $jumlah,
                'persen' => round(($jumlah / $total) * 100),
            ];
        })->values()->toArray();
    }

    private function laporanTerbaru(): array
    {
        return TujuanDisposisi::with('penerima')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn($t) => [
                'id' => $t->id,
                'staff' => $t->penerima->nama_lengkap ?? '-',
                'tugas' => 'Tindak lanjut surat',
                'waktu' => $t->created_at->diffForHumans(),
                'status' => $t->status_tindak_lanjut === StatusTindakLanjut::SELESAI
                    ? 'selesai'
                    : 'progress',
            ])->toArray();
    }

    private function suratSelesaiTerbaru(): array
    {
        return DB::table('surat_masuk')
            ->join('disposisi', 'disposisi.surat_id', '=', 'surat_masuk.id')
            ->join('tujuan_disposisi', 'tujuan_disposisi.disposisi_id', '=', 'disposisi.id')
            ->select(
                'surat_masuk.id',
                'surat_masuk.nomor_surat',
                'surat_masuk.isi_surat',
                DB::raw('MAX(tujuan_disposisi.tanggal_selesai) as selesai_pada')
            )
            ->whereNotNull('tujuan_disposisi.tanggal_selesai')
            ->groupBy(
                'surat_masuk.id',
                'surat_masuk.nomor_surat',
                'surat_masuk.isi_surat'
            )
            ->havingRaw(
                'SUM(tujuan_disposisi.status_tindak_lanjut != ?) = 0',
                [StatusTindakLanjut::SELESAI->value]
            )
            ->orderByDesc('selesai_pada')
            ->limit(5)
            ->get()
            ->map(fn($s) => [
                'id' => $s->id,
                'nomor' => $s->nomor_surat,
                'perihal' => $s->isi_surat,
                'waktu' => Carbon::parse($s->selesai_pada)->diffForHumans(),
            ])
            ->toArray();
    }
}
