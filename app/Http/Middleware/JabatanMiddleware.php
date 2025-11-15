<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JabatanMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ... $jabatans): Response
    {
        $user = $request->user();
        
        if(!$user) {
            abort(401);
        }

        $allowedJabatan = array_map("intval", $jabatans);

        $userJabatanValue = $user->jabatan->value;

        if(!in_array($userJabatanValue, $allowedJabatan, true)) {
            abort(403);
        }
        return $next($request);
    }
}
