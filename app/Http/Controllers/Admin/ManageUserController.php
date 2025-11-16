<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserRequest;
use App\Models\Bidang;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ManageUserController extends Controller
{
    public function index()
    {
        $activeUsers = DB::table('sessions')
            ->whereNotNull('user_id')
            ->distinct('user_id')
            ->count('user_id');
        
        $newUsers = User::whereMonth('created_at', now()->month)
               ->whereYear('created_at', now()->year)
               ->count();

        return Inertia::render('Admin/ManageUser', [
            'users' => User::with('bidang')->get(),
            'bidang' => Bidang::all(),
            'active_users' => $activeUsers,
            'new_users' => $newUsers
        ]);
    }

    public function store(UserRequest $request)
    {
        $password = $request->filled('password') ? $request->password : Str::random(12);

        User::create([
            'email' => $request->email,
            'nip' => $request->nip,
            'username' => $request->username,
            'nama_lengkap' => $request->nama_lengkap,
            'bidang_id' => $request->bidang_id,
            'jabatan' => $request->jabatan,
            'password' => Hash::make($password),
            'email_verified_at' => now(),
        ]);

        return redirect()->route('admin.manage-user')->with('success', 'User berhasil dibuat');
    }
}
