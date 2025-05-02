<?php

use App\Http\Controllers\Api\CanchaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\PropietarioController;
use App\Http\Controllers\Api\AdministradorController;
use App\Http\Controllers\Api\EmpresaController;
use App\Http\Controllers\Api\EstadoCanchaController;
use App\Http\Controllers\Api\ReservaController;
use App\Http\Controllers\Api\ResenaController;
use App\Http\Controllers\Api\TipoCanchaController;

// First define the specific routes
Route::get('reservas/active', [App\Http\Controllers\Api\ReservaController::class, 'obtenerReservasActivas']);
Route::get('reservas/history', [App\Http\Controllers\Api\ReservaController::class, 'obtenerHistorialReservas']);
Route::get('reservas/empresa/{nit}', [App\Http\Controllers\Api\ReservaController::class, 'obtenerReservasPorEmpresa']);
Route::get('canchas/empresa/{nit}', [App\Http\Controllers\Api\CanchaController::class, 'mostrarCanchasEmpresa']);

// Then define the resource routes
Route::apiResource('usuarios', UsuarioController::class);
Route::apiResource('propietarios', PropietarioController::class);
Route::apiResource('administradores', AdministradorController::class);
Route::apiResource('empresas', EmpresaController::class);
Route::apiResource('canchas', CanchaController::class);
Route::apiResource('reservas', ReservaController::class);
Route::apiResource('resenas', ResenaController::class);
Route::apiResource('tipocanchas', TipoCanchaController::class);
Route::apiResource('estadocanchas', EstadoCanchaController::class);
