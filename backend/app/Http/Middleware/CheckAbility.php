<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Api\ApiController;
use Closure;
use Illuminate\Http\Request;

class CheckAbility extends ApiController
{
    public function handle(Request $request, Closure $next, string $ability)
    {
        if (!$request->user() || !$request->user()->tokenCan($ability)) {
            return $this->sendError('No tienes permiso para realizar esta acción', [], 403);

        }

        return $next($request);
    }
}