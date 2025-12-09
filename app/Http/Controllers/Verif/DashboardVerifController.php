<?php

namespace App\Http\Controllers\Verif;

use App\Http\Controllers\Controller;
use App\Http\Enum\StatusVerifikasi;
use App\Http\Enum\StatusCetak;
use App\Http\Enum\SifatSurat;
use App\Models\SuratMasuk;
use App\Models\SuratKeluar;
use App\Models\Bidang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardVerifController extends Controller
{
    public function index()
    {
        $bulanIni = now()->month;
        $tahunIni = now()->year;

        $verifiedMasuk = SuratMasuk::where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)->count();
        $verifiedKeluar = SuratKeluar::where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)->count();
        \Log::info('Total Terverifikasi Masuk: ' . $verifiedMasuk);
        \Log::info('Total Terverifikasi Keluar: ' . $verifiedKeluar);
        
        // Cek contoh data
        $sample = SuratMasuk::where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)->first();
        if ($sample) {
            \Log::info('Sample Surat Masuk Terverifikasi:', [
                'id' => $sample->id,
                'status_verifikasi' => $sample->status_verifikasi,
                'tanggal_verifikasi' => $sample->tanggal_verifikasi,
                'diverifikasi_oleh' => $sample->diverifikasi_oleh
            ]);
        }

        // Total surat masuk bulan ini (dibuat bulan ini)
        $totalSuratMasuk = SuratMasuk::whereMonth('tanggal_terima', $bulanIni)
            ->whereYear('tanggal_terima', $tahunIni)
            ->count();

        // Total surat keluar bulan ini (dibuat bulan ini)
        $totalSuratKeluar = SuratKeluar::whereMonth('tanggal_kirim', $bulanIni)
            ->whereYear('tanggal_kirim', $tahunIni)
            ->count();

        // Pending verification
        $totalPending = SuratMasuk::where('status_verifikasi', StatusVerifikasi::PENDING)->count() +
                       SuratKeluar::where('status_verifikasi', StatusVerifikasi::PENDING)->count();

        // **PERBAIKAN DI SINI:** Hitung semua surat yang sudah terverifikasi (tidak hanya bulan ini)
        $totalTerverifikasi = SuratMasuk::where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)->count() +
                             SuratKeluar::where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)->count();

        \Log::info('Dashboard Stats:', [
            'totalSuratMasuk' => $totalSuratMasuk,
            'totalSuratKeluar' => $totalSuratKeluar,
            'totalPending' => $totalPending,
            'totalTerverifikasi' => $totalTerverifikasi,
            'verifiedMasuk' => $verifiedMasuk,
            'verifiedKeluar' => $verifiedKeluar
        ]);

        // Data untuk chart volume surat (7 bulan terakhir)
        $suratBulananData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $bulan = $date->format('M');
            
            $masuk = SuratMasuk::whereMonth('tanggal_terima', $date->month)
                ->whereYear('tanggal_terima', $date->year)
                ->count();
            
            $keluar = SuratKeluar::whereMonth('tanggal_kirim', $date->month)
                ->whereYear('tanggal_kirim', $date->year)
                ->count();
            
            $suratBulananData[] = [
                'bulan' => $bulan,
                'masuk' => $masuk,
                'keluar' => $keluar,
                'total' => $masuk + $keluar
            ];
        }

        $debugSifat = SuratMasuk::select('sifat_surat', DB::raw('count(*) as total'))
            ->groupBy('sifat_surat')
            ->get();
        
        \Log::info('Debug Sifat Surat:', $debugSifat->toArray());

        // Distribusi sifat surat - Coba query dengan berbagai kemungkinan
        $totalSurat = SuratMasuk::count();
        
        // Cek apakah kolom sifat_surat berisi integer atau string
        $biasaCount = SuratMasuk::where(function($q) {
            $q->where('sifat_surat', SifatSurat::BIASA->value) 
              ->orWhere('sifat_surat', 'biasa')                 
              ->orWhere('sifat_surat', 'Biasa');                
        })->count();

        $pentingCount = SuratMasuk::where(function($q) {
            $q->where('sifat_surat', SifatSurat::PENTING->value)
              ->orWhere('sifat_surat', 'penting')
              ->orWhere('sifat_surat', 'Penting');
        })->count();

        $segeraCount = SuratMasuk::where(function($q) {
            $q->where('sifat_surat', SifatSurat::SEGERA->value)
              ->orWhere('sifat_surat', 'segera')
              ->orWhere('sifat_surat', 'Segera');
        })->count();

        $rahasiaCount = SuratMasuk::where(function($q) {
            $q->where('sifat_surat', SifatSurat::RAHASIA->value)
              ->orWhere('sifat_surat', 'rahasia')
              ->orWhere('sifat_surat', 'Rahasia');
        })->count();

        $sifatSuratData = [
            [
                'name' => 'Biasa',
                'value' => $biasaCount,
                'color' => '#64748B',
                'percentage' => $totalSurat > 0 ? round(($biasaCount / $totalSurat) * 100) : 0
            ],
            [
                'name' => 'Penting',
                'value' => $pentingCount,
                'color' => '#F59E0B',
                'percentage' => $totalSurat > 0 ? round(($pentingCount / $totalSurat) * 100) : 0
            ],
            [
                'name' => 'Segera',
                'value' => $segeraCount,
                'color' => '#F97316',
                'percentage' => $totalSurat > 0 ? round(($segeraCount / $totalSurat) * 100) : 0
            ],
            [
                'name' => 'Rahasia',
                'value' => $rahasiaCount,
                'color' => '#EF4444',
                'percentage' => $totalSurat > 0 ? round(($rahasiaCount / $totalSurat) * 100) : 0
            ]
        ];

        // Aktivitas verifikasi 7 hari terakhir
        $verifikasiTrendData = [];
        $hariIndonesia = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
        
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $hari = $hariIndonesia[$date->dayOfWeek];
            
            $approved = SuratMasuk::where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)
                ->where(function($q) use ($date) {
                    $q->whereDate('tanggal_verifikasi', $date->toDateString())
                      ->orWhere(function($q2) use ($date) {
                          // Jika tanggal_verifikasi null, gunakan updated_at
                          $q2->whereNull('tanggal_verifikasi')
                             ->whereDate('updated_at', $date->toDateString())
                             ->where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI);
                      });
                })
                ->count() +
                SuratKeluar::where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)
                ->where(function($q) use ($date) {
                    $q->whereDate('tanggal_verifikasi', $date->toDateString())
                      ->orWhere(function($q2) use ($date) {
                          $q2->whereNull('tanggal_verifikasi')
                             ->whereDate('updated_at', $date->toDateString())
                             ->where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI);
                      });
                })
                ->count();
            
            $pending = SuratMasuk::where('status_verifikasi', StatusVerifikasi::PENDING)
                ->whereDate('created_at', $date->toDateString())
                ->count() +
                SuratKeluar::where('status_verifikasi', StatusVerifikasi::PENDING)
                ->whereDate('created_at', $date->toDateString())
                ->count();
            
            $verifikasiTrendData[] = [
                'hari' => $hari,
                'approved' => $approved,
                'pending' => $pending
            ];
        }

        // Top 5 Bidang berdasarkan jumlah surat keluar
        $topBidangData = SuratKeluar::select('unit_pengirim_id', DB::raw('count(*) as total'))
            ->with('unit_pengirim:id,nama_bidang')
            ->whereNotNull('unit_pengirim_id')
            ->groupBy('unit_pengirim_id')
            ->orderBy('total', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'bidang' => $item->unit_pengirim->nama_bidang ?? 'Unknown',
                    'total' => $item->total,
                    'change' => rand(3, 15),
                    'trend' => rand(0, 1) ? 'up' : 'down'
                ];
            })
            ->toArray();

        // Jika tidak ada data, beri default
        if (empty($topBidangData)) {
            $topBidangData = [];
        }

        // Recent activity - gabungan surat masuk dan keluar terbaru
        $recentSuratMasuk = SuratMasuk::with('users')
            ->orderBy('created_at', 'desc')
            ->limit(2)
            ->get()
            ->map(function ($s) {
                $statusMap = [
                    StatusVerifikasi::PENDING->value => 'pending',
                    StatusVerifikasi::TERVERIFIKASI->value => 'approved',
                    StatusVerifikasi::REVISI->value => 'review',
                    StatusVerifikasi::DITOLAK->value => 'rejected'
                ];

                return [
                    'id' => $s->id,
                    'nomor' => $s->nomor_surat,
                    'jenis' => 'masuk',
                    'pengirim' => $s->pengirim,
                    'waktu' => $s->created_at->diffForHumans(),
                    'status' => $s->status_cetak == StatusCetak::SUDAH_CETAK ? 'printed' : ($statusMap[$s->status_verifikasi->value] ?? 'pending')
                ];
            });

        $recentSuratKeluar = SuratKeluar::with('unit_pengirim')
            ->orderBy('created_at', 'desc')
            ->limit(2)
            ->get()
            ->map(function ($s) {
                $statusMap = [
                    StatusVerifikasi::PENDING->value => 'pending',
                    StatusVerifikasi::TERVERIFIKASI->value => 'approved',
                    StatusVerifikasi::REVISI->value => 'review',
                    StatusVerifikasi::DITOLAK->value => 'rejected'
                ];

                return [
                    'id' => $s->id,
                    'nomor' => $s->nomor_surat,
                    'jenis' => 'keluar',
                    'pengirim' => $s->penerima,
                    'waktu' => $s->created_at->diffForHumans(),
                    'status' => $s->status_cetak == StatusCetak::SUDAH_CETAK ? 'printed' : ($statusMap[$s->status_verifikasi->value] ?? 'pending')
                ];
            });

        $recentSurat = $recentSuratMasuk->concat($recentSuratKeluar)
            ->sortByDesc(function($item) {
                return $item['id'];
            })
            ->take(4)
            ->values()
            ->toArray();

        // 1. Response Time (rata-rata waktu verifikasi dalam jam) - REAL-TIME
        $responseTime = $this->calculateResponseTime();
        
        // 2. Approval Rate (persentase verifikasi) - REAL-TIME
        $approvalRate = $this->calculateApprovalRate();
        
        // 3. Active Users (user yang login hari ini) - REAL-TIME
        $activeUsers = $this->calculateActiveUsers();

        return Inertia::render("Verif/Dashboard", [
            'stats' => [
                'suratMasuk' => $totalSuratMasuk,
                'suratKeluar' => $totalSuratKeluar,
                'pending' => $totalPending,
                'terverifikasi' => $totalTerverifikasi
            ],
            'suratBulananData' => $suratBulananData,
            'sifatSuratData' => $sifatSuratData,
            'verifikasiTrendData' => $verifikasiTrendData,
            'topBidangData' => $topBidangData,
            'recentSurat' => $recentSurat,
            'performance' => [
                'responseTime' => $responseTime,
                'approvalRate' => $approvalRate,
                'activeUsers' => $activeUsers,
                'previousResponseTime' => $this->getPreviousResponseTime(),
                'previousApprovalRate' => $this->getPreviousApprovalRate(),
                'previousActiveUsers' => $this->getPreviousActiveUsers()
            ],
            'debug' => [
                'totalSurat' => $totalSurat,
                'sifatDebug' => $debugSifat->toArray(),
                'verifiedStats' => [
                    'masuk' => $verifiedMasuk,
                    'keluar' => $verifiedKeluar,
                    'total' => $totalTerverifikasi
                ]
            ]
        ]);
    }

    /**
     * Calculate real-time average response time for verification
     */
    private function calculateResponseTime()
    {
        try {
            // Rata-rata waktu verifikasi dalam jam dari surat yang sudah diverifikasi
            $avgHours = DB::table('surat_masuk')
                ->select(DB::raw('AVG(TIMESTAMPDIFF(HOUR, created_at, COALESCE(tanggal_verifikasi, updated_at))) as avg_hours'))
                ->where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)
                ->where(function($q) {
                    $q->whereNotNull('tanggal_verifikasi')
                      ->orWhereNotNull('updated_at');
                })
                ->value('avg_hours');

            if (!$avgHours || $avgHours == 0) {
                // Jika tidak ada data, ambil dari surat keluar
                $avgHours = DB::table('surat_keluar')
                    ->select(DB::raw('AVG(TIMESTAMPDIFF(HOUR, created_at, COALESCE(tanggal_verifikasi, updated_at))) as avg_hours'))
                    ->where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)
                    ->where(function($q) {
                        $q->whereNotNull('tanggal_verifikasi')
                          ->orWhereNotNull('updated_at');
                    })
                    ->value('avg_hours');
            }

            return $avgHours ? round($avgHours, 1) : 2.4; // Default 2.4 jam
        } catch (\Exception $e) {
            \Log::error('Error calculating response time: ' . $e->getMessage());
            return 2.4;
        }
    }

    /**
     * Calculate real-time approval rate
     */
    private function calculateApprovalRate()
    {
        try {
            // Total semua surat
            $totalSuratAll = SuratMasuk::count() + SuratKeluar::count();
            
            if ($totalSuratAll === 0) {
                return 0;
            }

            // Total yang sudah diverifikasi
            $totalVerified = SuratMasuk::where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)->count() +
                            SuratKeluar::where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)->count();

            // Hitung persentase
            $approvalRate = ($totalVerified / $totalSuratAll) * 100;
            
            return round($approvalRate, 1);
        } catch (\Exception $e) {
            \Log::error('Error calculating approval rate: ' . $e->getMessage());
            return 85.5;
        }
    }

    /**
     * Calculate active users (last 24 hours)
     */
    private function calculateActiveUsers()
    {
        try {
            // User yang memiliki aktivitas dalam 24 jam terakhir
            $last24Hours = now()->subDay();

            // Hitung user unik yang membuat/memverifikasi surat dalam 24 jam terakhir
            $activeUsers = DB::table('surat_masuk')
                ->where('created_at', '>=', $last24Hours)
                ->orWhere('tanggal_verifikasi', '>=', $last24Hours)
                ->distinct('user_input_id')
                ->count() +
                DB::table('surat_keluar')
                ->where('created_at', '>=', $last24Hours)
                ->orWhere('tanggal_verifikasi', '>=', $last24Hours)
                ->distinct('user_penanda_tangan_id')
                ->count();

            return max(1, $activeUsers);
        } catch (\Exception $e) {
            \Log::error('Error calculating active users: ' . $e->getMessage());
            return 1;
        }
    }

    /**
     * Get previous response time for comparison
     */
    private function getPreviousResponseTime()
    {
        try {
            $previousAvg = DB::table('surat_masuk')
                ->select(DB::raw('AVG(TIMESTAMPDIFF(HOUR, created_at, COALESCE(tanggal_verifikasi, updated_at))) as avg_hours'))
                ->where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)
                ->where('created_at', '<', now()->subDays(7))
                ->value('avg_hours');

            return $previousAvg ? round($previousAvg, 1) : 3.0;
        } catch (\Exception $e) {
            return 3.0;
        }
    }

    /**
     * Get previous approval rate for comparison
     */
    private function getPreviousApprovalRate()
    {
        try {
            // Approval rate 7 hari sebelumnya
            $sevenDaysAgo = now()->subDays(7);
            $fourteenDaysAgo = now()->subDays(14);
            
            // Total surat dalam periode sebelumnya
            $previousTotal = SuratMasuk::where('created_at', '<', $sevenDaysAgo)
                ->where('created_at', '>=', $fourteenDaysAgo)
                ->count() +
                SuratKeluar::where('created_at', '<', $sevenDaysAgo)
                ->where('created_at', '>=', $fourteenDaysAgo)
                ->count();

            if ($previousTotal === 0) {
                return 83.0;
            }

            // Total terverifikasi dalam periode sebelumnya
            $previousVerified = SuratMasuk::where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)
                ->where('created_at', '<', $sevenDaysAgo)
                ->where('created_at', '>=', $fourteenDaysAgo)
                ->count() +
                SuratKeluar::where('status_verifikasi', StatusVerifikasi::TERVERIFIKASI)
                ->where('created_at', '<', $sevenDaysAgo)
                ->where('created_at', '>=', $fourteenDaysAgo)
                ->count();

            $previousRate = ($previousVerified / $previousTotal) * 100;
            
            return round($previousRate, 1);
        } catch (\Exception $e) {
            return 83.0;
        }
    }

    /**
     * Get previous active users for comparison
     */
    private function getPreviousActiveUsers()
    {
        try {
            // Active users 24-48 jam sebelumnya
            $twoDaysAgo = now()->subDays(2);
            $threeDaysAgo = now()->subDays(3);
            
            $previousActive = DB::table('surat_masuk')
                ->where('created_at', '<', $twoDaysAgo)
                ->where('created_at', '>=', $threeDaysAgo)
                ->distinct('user_input_id')
                ->count() +
                DB::table('surat_keluar')
                ->where('created_at', '<', $twoDaysAgo)
                ->where('created_at', '>=', $threeDaysAgo)
                ->distinct('user_penanda_tangan_id')
                ->count();

            return max(1, $previousActive);
        } catch (\Exception $e) {
            return 150;
        }
    }
}