<?php

use App\Http\Controllers\Api\CanchaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\PropietarioController;
use App\Http\Controllers\Api\AdministradorController;
use App\Http\Controllers\Api\EmpresaController;

use App\Http\Controllers\Api\ReservaController;
use App\Http\Controllers\Api\ResenaController;

Route::apiResource('usuarios', UsuarioController::class);
Route::apiResource('propietarios', PropietarioController::class);
Route::apiResource('administradores', AdministradorController::class);
// API Routes
Route::apiResource('empresas', EmpresaController::class);
Route::apiResource('canchas', CanchaController::class);
Route::apiResource('reservas', ReservaController::class);
Route::apiResource('resenas', ResenaController::class);
