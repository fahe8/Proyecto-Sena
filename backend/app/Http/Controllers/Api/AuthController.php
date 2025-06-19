<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\AdministradorResource;
use App\Http\Resources\PropietarioResource;
use App\Http\Resources\UsuarioResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends ApiController
{

    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'role' => 'required|in:usuario,propietario,admin'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validación fallida', $validator->errors(), 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->sendError(
                'Credenciales inválidas',
                ['error' => 'Las credenciales proporcionadas no son correctas'],
                401
            );
        }

        $user = User::where('email', $request->email)->firstOrFail();
        // Verify if user has the requested role
        if (!$user->hasRole($request->role)) {
            return $this->sendError(
                'Rol no autorizado',
                ['error' => 'El usuario no tiene permiso para acceder con este rol'],
                403
            );
        }

        // Create role-specific token
        $token = $user->createToken('auth-token', [$request->role])->plainTextToken;

        // Get profile based on role
        $perfil = null;
        switch ($request->role) {
            case 'usuario':
                if ($user->usuario) {
                    $perfil = new UsuarioResource($user->usuario, $request->role);
                }
                break;
            case 'propietario':
                if ($user->propietario) {
                    $perfil = new PropietarioResource($user->propietario, $request->role);
                }
                break;
            case 'admin':
                if ($user->administrador) {
                    $perfil = new AdministradorResource($user->administrador, $request->role);
                }
                break;
        }

        if (!$perfil) {
            return $this->sendError(
                'Perfil no encontrado',
                ['error' => 'No se encontró el perfil para el rol seleccionado'],
                404
            );
        }

        return $this->sendResponse(
            [
                'usuario' => $perfil,
                'token' => $token
            ],
            'Inicio de sesión exitoso',
            200
        );
    }



    public function logout()
    {
        $token = auth()->user()->currentAccessToken();
        $token->delete();

        // Verificar si aún existe el token
        $tokenStillExists = auth()->user()
            ->tokens()
            ->where('id', $token->id)
            ->exists();

        return $this->sendResponse(
            ['token_eliminado' => !$tokenStillExists],
            'Sesión cerrada correctamente',
            200
        );
    }

    public function resendVerificationEmail(Request $request)
    {
        $request->user()->sendEmailVerificationNotification();

        return $this->sendResponse([], 'Correo de verificación reenviado correctamente.');
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user(); // Usuario autenticado

        // En el método changePassword
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed|regex:/^(?=.*[A-Z])(?=.*\d).*$/',
        ]);
        
        // En el método resetPassword
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed|regex:/^(?=.*[A-Z])(?=.*\d).*$/',
            'password_confirmation' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validación fallida', $validator->errors(), 422);
        }

        // Verifica que la contraseña actual sea correcta
        if (!Hash::check($request->current_password, $user->password)) {
            return $this->sendError('La contraseña actual no es correcta', [], 401);
        }

        // Actualiza la contraseña
        $user->password = Hash::make($request->new_password);
        $user->save();

        return $this->sendResponse([], 'Contraseña actualizada correctamente.');
    }



    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validación fallida', $validator->errors(), 422);
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return $this->sendResponse([], 'Enlace de restablecimiento de contraseña enviado al correo.');
        } else {
            return $this->sendError('Error', ['email' => __($status)], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validación fallida', $validator->errors(), 422);
        }
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->setRememberToken(Str::random(60));
                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return $this->sendResponse([], 'Contraseña restablecida correctamente.');
        } else {
            return $this->sendError('Error', ['email' => [__($status)]], 500);
        }
    }

    public function getAuthenticatedUser()
    {
        $user = Auth::user();
    
        if (!$user) {
            return $this->sendError('No autenticado', [], 401);
        }
    
        // Obtener perfil según el rol del token
        $tokenAbilities = $user->currentAccessToken()->abilities ?? [];
        $perfil = null;
        $rolActual = null;
    
        // Determinar el rol basado en las habilidades del token
        if (in_array('usuario', $tokenAbilities) && $user->usuario) {
            $perfil = new UsuarioResource($user->usuario);
            $rolActual = 'usuario';
        } elseif (in_array('propietario', $tokenAbilities) && $user->propietario) {
            // Cargar las empresas del propietario
            $propietario = $user->propietario->load('empresas');
            $perfil = new PropietarioResource($propietario);
            $rolActual = 'propietario';
        } elseif (in_array('admin', $tokenAbilities) && $user->administrador) {
            $perfil = new AdministradorResource($user->administrador);
            $rolActual = 'admin';
        }
    
        if (!$perfil) {
            return $this->sendError(
                'Perfil no encontrado',
                ['error' => 'No se encontró el perfil para el rol del token'],
                404
            );
        }
    
        return $this->sendResponse(
            [
                'usuario' => $perfil,
                'rol_actual' => $rolActual
            ],
            'Usuario autenticado correctamente',
            200
        );
    }

    public function verifyToken(Request $request)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return $this->sendError('Token no proporcionado', [], 401);
        }

        $user = Auth::guard('sanctum')->user();

        if (!$user) {
            return $this->sendError('Token inválido o expirado', [], 401);
        }

        return $this->sendResponse(
            'Token valido',
            'Token verificado correctamente',
            200
        );
    }
}
