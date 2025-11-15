<?php

namespace App\Http\Controllers\Staf;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardStafController extends Controller
{
    public function index()
    {
        return Inertia::render("Staf/Dashboard");
    }
}
