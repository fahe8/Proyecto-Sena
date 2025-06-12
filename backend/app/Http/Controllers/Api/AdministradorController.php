<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Administrador;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\AdministradorResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdministradorController extends ApiController
{
    // public function __construct()
    // {
    //     $this->middleware(['auth:sanctum']);
    //     $this->middleware(['permission:ver administradores'])->only(['index', 'show']);
    //     $this->middleware(['permission:crear administradores'])->only(['store']);
    //     $this->middleware(['permission:editar administradores'])->only(['update']);
    //     $this->middleware(['permission:eliminar administradores'])->only(['destroy']);
    // }

    public function index()
    {
        return $this->sendResponse(
            AdministradorResource::collection(Administrador::with('user')->get()),
            'Lista de administradores obtenida correctamente',
            200
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required_if:user_id,null|min:6',
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'telefono' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validación fallida', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            // Check if user exists
            $user = User::where('email', $request->email)->first();
            
            if (!$user) {
                // Create new user if doesn't exist
                $user = User::create([
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'roles' => ['admin'],
                ]);
            } else {
                // Add 'admin' role if user exists
                $roles = $user->roles;
                if (!in_array('admin', $roles)) {
                    $roles[] = 'admin';
                    $user->update(['roles' => $roles]);
                }
            }
    
            // Check if administrador profile exists
            $administrador = Administrador::where('user_id', $user->id)->first();
            if (!$administrador) {
                $administrador = Administrador::create([
                    'user_id' => $user->id,
                    'nombre' => $request->nombre,
                    'apellido' => $request->apellido,
                    'telefono' => $request->telefono
                ]);
            }
    
            DB::commit();
            if (!$user->hasVerifiedEmail()) {
                $user->sendEmailVerificationNotification();
            }
            $token = $user->createToken('auth-token', ['admin'])->plainTextToken;
    
            return $this->sendResponse(
                [
                    'administrador' => new AdministradorResource($administrador),
                    'token' => $token
                ],
                'Administrador creado/actualizado correctamente',
                201
            );
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('Error al crear/actualizar administrador', $e->getMessage(), 500);
        }
    }

    public function update(Request $request, Administrador $administrador)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'sometimes|string|max:255',
            'apellido' => 'sometimes|string|max:255',
            'telefono' => 'sometimes|string|max:20'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validación fallida', $validator->errors(), 422);
        }

        try {
            $administrador->update($request->only(['nombre', 'apellido', 'telefono']));

            return $this->sendResponse(
                new AdministradorResource($administrador->load('user')),
                'Administrador actualizado correctamente',
                200
            );
        } catch (\Exception $e) {
            return $this->sendError('Error al actualizar administrador', $e->getMessage(), 500);
        }
    }

    public function destroy(Administrador $administrador)
    {
        try {
            $user = $administrador->user;
            $administrador->delete();
            $user->delete();

            return $this->sendResponse(
                [],
                'Administrador eliminado correctamente',
                200
            );
        } catch (\Exception $e) {
            return $this->sendError('Error al eliminar administrador', $e->getMessage(), 500);
        }
    }
}
