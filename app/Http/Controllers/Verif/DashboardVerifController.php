<?php

namespace App\Http\Controllers\Verif;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardVerifController extends Controller
{
    public function index()
    {
        return Inertia::render("Verif/Dashboard");
    }
}
