<?php

namespace App\Http\Controllers\Kepala;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LacakDisposisiController extends Controller
{
    public function index()
    {
        return Inertia::render('Kepala/LacakDisposisi');
    }
}
