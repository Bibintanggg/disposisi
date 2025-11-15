<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Enum\Jabatan;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        if($request->user()->jabatan === Jabatan::ADMIN) {
            return redirect()->route('admin.dashboard');
        } else if ($request->user()->jabatan === Jabatan::KEPALA) {
            return redirect()->route('kepala.dashboard');
        } else if ($request->user()->jabatan === Jabatan::STAF) {
            return redirect()->route('staf.dashboard');
        } else if ($request->user()->jabatan === Jabatan::VERIFIKATOR) {
            return redirect()->route('verif.dashboard');
        }

        return redirect()->route('/');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
