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
use App\Http\Controllers\Api\ServicioController;
use App\Http\Controllers\Api\TipoCanchaController;

// First define the specific routes
Route::get('reservas/active/{id}', [App\Http\Controllers\Api\ReservaController::class, 'obtenerReservasActivas']);
Route::get('reservas/history/{id}', [App\Http\Controllers\Api\ReservaController::class, 'obtenerHistorialReservas']);
Route::get('reservas/empresa/{nit}', [App\Http\Controllers\Api\ReservaController::class, 'obtenerReservasPorEmpresa']);
Route::get('canchas/empresa/{nit}', [App\Http\Controllers\Api\CanchaController::class, 'mostrarCanchasEmpresa']);
Route::get('propietarios/empresa/{nit}', [PropietarioController::class, 'obtenerPorEmpresa']);
Route::get('servicios/empresa/{nit}', [ServicioController::class, 'obtenerPorEmpresa']);
Route::post('empresas/{nit}/servicios', 'App\Http\Controllers\Api\EmpresaController@agregarServicios');
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
Route::apiResource('servicios', ServicioController::class);