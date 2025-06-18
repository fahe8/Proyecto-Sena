<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UsuarioResource;
use App\Models\User;
use App\Models\Usuario;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends ApiController
{
   
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return $this->sendResponse(
            UsuarioResource::collection(Usuario::with('user')->get()),
            'Lista de usuarios obtenida correctamente',
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required_if:user_id,null|min:6',
        ]);

        if ($validator->fails()) {
            return $this->sendError(
                'Validación fallida',
                $validator->errors(),
                422
            );
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
                    'roles' => ['usuario'],
                ]);
            } else {
                // Si el usuario ya existe, verificamos si se proporcionó una contraseña
                // if ($request->has('password')) {
                //     return $this->sendError(
                //         'Usuario existente',
                //         ['error' => 'No se puede cambiar la contraseña de un usuario existente. Por favor, inicie sesión con su cuenta actual.'],
                //         422
                //     );
                // }
                // Add 'usuario' role if user exists
                $roles = $user->roles;
                if (!in_array('usuario', $roles)) {
                    $roles[] = 'usuario';
                    $user->update(['roles' => $roles]);
                }
            }
    
            // Check if usuario profile exists
            $usuario = Usuario::where('user_id', $user->id)->first();
            if (!$usuario) {
                $usuario = Usuario::create([
                    'user_id' => $user->id,
                    'nombre' => $request->nombre,
                    'apellido' => $request->apellido,
                    'telefono' => $request->telefono,
                ]);
            }
    
            DB::commit();
            if (!$user->hasVerifiedEmail()) {
                $user->sendEmailVerificationNotification();
            }
            $token = $user->createToken('auth-token', ['usuario'])->plainTextToken;
    
            return $this->sendResponse(
                [
                    'usuario' => new UsuarioResource($usuario, "usuario"),
                    'token' => $token,
                ],
                'Usuario creado/actualizado correctamente',
                201
            );
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError(
                'Error al crear/actualizar usuario',
                $e->getMessage(),
                500
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuario $usuario)
    {
        $this->authorize('view', $usuario);

        return $this->sendResponse(
            new UsuarioResource($usuario->load('user'), 'usuario'),
            'Usuario obtenido correctamente',
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
 public function update(Request $request, Usuario $usuario)
{
    // $this->authorize('update', $usuario); // Asegura que el usuario tiene permiso para actualizar

    $validator = Validator::make($request->all(), [
        'nombre' => 'sometimes|string|max:255',
        'apellido' => 'sometimes|string|max:255',
        'telefono' => 'sometimes|string|max:20',
    ]);

    if ($validator->fails()) {
        return $this->sendError('Validación fallida', $validator->errors(), 422);
    }
    try {
        // Actualiza datos del modelo Usuario
        $usuario->update($request->only(['nombre', 'apellido', 'telefono']));

        return $this->sendResponse(
            new UsuarioResource($usuario->load('user'), 'usuario'),
            'Usuario actualizado correctamente',
            200
        );

    } catch (\Exception $e) {
        DB::rollBack();
        return $this->sendError('Error al actualizar usuario', $e->getMessage(), 500);
    }
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Usuario $usuario)
    {
        //
    }
}
