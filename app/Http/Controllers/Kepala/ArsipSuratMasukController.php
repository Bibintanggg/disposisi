<?php

namespace App\Http\Controllers\Kepala;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArsipSuratMasukController extends Controller
{
    public function index()
    {
        return Inertia::render('Kepala/ArsipSuratMasuk');
    }
}
