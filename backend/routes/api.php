<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\PropietarioController;
use App\Http\Controllers\Api\AdministradorController;
use App\Http\Controllers\Api\CanchaController;
use App\Http\Controllers\Api\CanchasAdicionalController;
use App\Http\Controllers\Api\CloudinaryController;
use App\Http\Controllers\Api\EmpresaController;
use App\Http\Controllers\Api\ResenaController;
use App\Http\Controllers\Api\ReservaController;
use App\Http\Controllers\Api\ServicioController;
use App\Http\Controllers\Api\TipoDocumentoController;
use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\URL;

//Rutas Empresas
// Route::apiResource('empresas', EmpresaController::class);
Route::post('/empresas', [EmpresaController::class, 'store']);
Route::get('/empresas', [EmpresaController::class, 'index']);
Route::get('/empresas/{nit}', [EmpresaController::class, 'show']);
Route::put('/empresas/{nit}', [EmpresaController::class, 'update']);

Route::get('tipos-canchas', [CanchasAdicionalController::class, 'index']);
Route::get('estados-canchas', [CanchasAdicionalController::class, 'estadosCanchas']);


// Rutas públicas de autenticación
Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::get('/propietarios', [PropietarioController::class, 'index']);

Route::post('/propietarios', [PropietarioController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/tipos-documentos', [TipoDocumentoController::class, 'index']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/password/reset/{token}', function ($token) {
    return redirect()->away("http://localhost:5173/recuperar-contrasena/{$token}");
})->name('password.reset');
Route::get('/servicios', [ServicioController::class, 'index']);

// Rutas protegidas por autenticación y roles
Route::middleware(['auth:sanctum'])->group(function () {
    // Rutas comunes autenticadas
    Route::get('/user', [AuthController::class, 'getAuthenticatedUser']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/verificar-token', [AuthController::class, 'verifyToken']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::post(
        '/email/verification-notification',
        [AuthController::class, 'resendVerificationEmail']
    )->middleware(['throttle:6,1'])->name('verification.send');

    // Rutas de Usuarios (requiere rol 'usuario')
    Route::middleware(['ability:usuario'])->prefix('usuarios')->group(function () {
        Route::get('/', [UsuarioController::class, 'index']);
        Route::get('/{usuario}', [UsuarioController::class, 'show']);
        Route::put('/{usuario}', [UsuarioController::class, 'update']);
        Route::match(['POST', 'PUT'], '/{usuario}/imagen', [UsuarioController::class, 'updateImage']);
        Route::delete('/{usuario}', [UsuarioController::class, 'destroy']);
    });

    // Rutas de Propietarios (requiere rol 'propietario')
    Route::middleware(['ability:propietario'])->prefix('propietarios')->group(function () {
        Route::get('/{propietario}', [PropietarioController::class, 'show']);
        Route::put('/{propietario}', [PropietarioController::class, 'update']);
        Route::delete('/{propietario}', [PropietarioController::class, 'destroy']);
        Route::get('/empresa/{propietario}', [EmpresaController::class, 'findByPropietarioId']);
    });

    // Rutas de Administradores (requiere rol 'admin')
    Route::middleware(['ability:admin'])->prefix('administradores')->group(function () {
        Route::post('/', [AdministradorController::class, 'store']);
        Route::get('/', [AdministradorController::class, 'index']);
        Route::get('/{administrador}', [AdministradorController::class, 'show']);
        Route::put('/{administrador}', [AdministradorController::class, 'update']);
        Route::delete('/{administrador}', [AdministradorController::class, 'destroy']);
    });

    // Nueva ruta para crear perfil de propietario para usuario autenticado
    Route::post('/create-propietario-profile', [PropietarioController::class, 'createProfile'])
        ->middleware(['ability:usuario']);
});

// Ruta de verificación de email
Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    $user = User::findOrFail($id);

    if (!URL::hasValidSignature($request)) {
        return response()->json(['message' => 'URL no válida o expirada'], 401);
    }

    if (!hash_equals(sha1($user->getEmailForVerification()), $hash)) {
        return response()->json(['message' => 'Hash inválido'], 401);
    }

    if ($user->hasVerifiedEmail()) {
        return response()->json(['message' => 'Correo ya verificado']);
    }

    $user->markEmailAsVerified();

    return response()->json(['message' => 'Correo verificado correctamente']);
})->name('verification.verify');


// Rutas para Cloudinary
Route::post('/upload-image', [CloudinaryController::class, 'uploadImage']);
Route::post('/upload-multiple-images', [CloudinaryController::class, 'uploadMultipleImages']);
Route::delete('/delete-images', [CloudinaryController::class, 'deleteImages']);

// Rutas para Canchas
Route::apiResource('canchas', CanchaController::class);
Route::get('canchas/empresa/{nit}', [CanchaController::class, 'getCanchasByEmpresa']);
Route::get('canchas/estado/{estado}', [CanchaController::class, 'getCanchasByEstado']);
Route::get('canchas/tipo/{tipo}', [CanchaController::class, 'getCanchasByTipo']);


// Rutas específicas de reseñas (ANTES de apiResource)
Route::get('reservas/active/{id}', [ReservaController::class, 'obtenerReservasActivas']);
Route::get('reservas/history/{id}', [ReservaController::class, 'obtenerHistorialReservas']);
Route::get('reservas/empresa/{nit}', [ReservaController::class, 'obtenerReservasPorEmpresa']);
Route::get('/resenas/verificar/{idReserva}/{idUsuario}', [ResenaController::class, 'verificarResenaUsuario']);
Route::get('/resenas/empresa/{nit}', [ResenaController::class, 'obtenerReseñaEmpresa']);
Route::apiResource('resenas', ResenaController::class);

Route::apiResource('reservas', ReservaController::class);
