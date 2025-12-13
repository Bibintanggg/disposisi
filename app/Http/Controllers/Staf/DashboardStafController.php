<?php

namespace App\Http\Controllers\Staf;

use App\Http\Controllers\Controller;
use App\Services\Staf\DashboardStafService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardStafController extends Controller
{
    protected $dashboardService;

    public function __construct(DashboardStafService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    /**
     * Display staff dashboard with real data
     */
    public function index(Request $request): Response
    {
        $staffId = Auth::id();

        $stats = $this->dashboardService->getStats($staffId);
        $performanceData = $this->dashboardService->getPerformanceData($staffId);
        $tugasMendesak = $this->dashboardService->getTugasMendesak($staffId);

        return Inertia::render('Staf/Dashboard', [
            'stats' => $stats,
            'performanceData' => $performanceData,
            'tugasMendesak' => $tugasMendesak
        ]);
    }
}