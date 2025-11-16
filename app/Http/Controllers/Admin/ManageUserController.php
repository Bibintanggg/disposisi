<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManageUserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ManageUser', [
            'users' => User::all(),
        ]);
    }
}
