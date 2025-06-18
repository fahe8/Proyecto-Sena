<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Propietario;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\PropietarioResource;
use App\Models\Usuario;
use App\Services\CloudinaryService;
use Cloudinary\Api\Admin\AdminApi;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;

class PropietarioController extends ApiController
{
    public function __construct()
    {
        // Configuración de Cloudinary
        \Cloudinary\Configuration\Configuration::instance([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key' => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
            'url' => [
                'secure' => true
            ]
        ]);
    }

    public function index()
    {
        return $this->sendResponse(
            PropietarioResource::collection(Propietario::with('user')->get()),
            'Lista de propietarios obtenida correctamente',
            200
        );
    }

    public function show(Propietario $propietario)
    {
        return $this->sendResponse(
            new PropietarioResource($propietario->load('user'), "propietario"),
            'Propietario obtenido correctamente',
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
            'imagen' => 'required|image|max:2048', // Cambiado para recibir archivo de imagen
            'telefono' => 'required|string',
            'tipo_documento_id' => 'required|exists:tipo_documento,tipo_documento_id',
            'numero_documento' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validación fallida', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            // Verificar si el usuario existe
            $user = User::where('email', $request->email)->first();

            if ($user) {
                DB::rollback();
                return $this->sendError(
                    'Usuario ya registrado',
                    [
                        'message' => 'Ya existe una cuenta con este correo electrónico. Por favor, inicie sesión primero.',
                    ],
                    409
                );
            }

            $imagenData = null;
            
            // Subir imagen a Cloudinary
            if ($request->hasFile('imagen')) {
                $uploadApi = new UploadApi();
                
                $result = $uploadApi->upload($request->file('imagen')->getRealPath(), [
                    'folder' => 'micanchaya/propietarios',
                    'resource_type' => 'image',
                    'transformation' => [
                        'quality' => 'auto',
                        'fetch_format' => 'auto'
                    ]
                ]);

                $imagenData = [
                    'url' => $result['secure_url'],
                    'public_id' => $result['public_id']
                ];
            }

            // Crear nuevo usuario
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'roles' => ['usuario','propietario'],
            ]);

            // Crear perfil de propietario
            $propietario = Propietario::create([
                'user_id' => $user->id,
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'telefono' => $request->telefono,
                'imagen' => $imagenData,
                'tipo_documento_id' => $request->tipo_documento_id,
                'numero_documento' => $request->numero_documento
            ]);

            $usuario = Usuario::create([
            'user_id' => $user->id,
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'telefono' => $request->telefono,
        ]);
            DB::commit();

            if (!$user->hasVerifiedEmail()) {
                $user->sendEmailVerificationNotification();
            }

            $token = $user->createToken('auth-token', ['propietario'])->plainTextToken;

            return $this->sendResponse(
                [
                    'propietario' => new PropietarioResource($propietario, ['propietario']),
                    'token' => $token
                ],
                'Propietario creado correctamente',
                201
            );
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('Error al crear propietario', $e->getMessage(), 500);
        }
    }

    public function update(Request $request, Propietario $propietario)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'sometimes|string|max:255',
            'apellido' => 'sometimes|string|max:255',
            'telefono' => 'sometimes|string|max:20',
            'tipo_documento_id' => 'sometimes|exists:tipo_documento,tipo_documento_id',
            'numero_documento' => 'sometimes|string',
            'imagen' => 'sometimes|image|max:2048'
        ]);
    
        if ($validator->fails()) {
            return $this->sendError('Validación fallida', $validator->errors(), 422);
        }
    
        try {
            if ($request->hasFile('imagen')) {
                // Subir la nueva imagen a Cloudinary
                $cloudinary = new UploadApi();
                $result = $cloudinary->upload($request->file('imagen')->getRealPath(), [
                    'folder' => 'micanchaya/propietarios'
                ]);
    
                // Eliminar la imagen anterior de Cloudinary si existe
                if ($propietario->imagen) {
                    $adminApi = new AdminApi();
                    $adminApi->deleteAssets([$propietario->imagen['public_id']]);
                }
    
                // Actualizar con la nueva imagen
                $request->merge([
                    'imagen' => [
                        'url' => $result['secure_url'],
                        'public_id' => $result['public_id']
                    ]
                ]);
            }
    
            $propietario->update($request->only([
                'nombre',
                'apellido',
                'telefono',
                'tipo_documento_id',
                'numero_documento',
                'imagen'
            ]));
    
            return $this->sendResponse(
                new PropietarioResource($propietario->load('user')),
                'Propietario actualizado correctamente',
                200
            );
        } catch (\Exception $e) {
            return $this->sendError('Error al actualizar propietario', $e->getMessage(), 500);
        }
    }

    public function destroy(Propietario $propietario)
    {
        try {
            $user = $propietario->user;
    
            // Eliminar la imagen de Cloudinary
            if ($propietario->imagen) {
                $adminApi = new AdminApi();
                $adminApi->deleteAssets([$propietario->imagen['public_id']]);
            }
    
            $propietario->delete();
            $user->delete();
    
            return $this->sendResponse(
                [],
                'Propietario eliminado correctamente',
                200
            );
        } catch (\Exception $e) {
            return $this->sendError('Error al eliminar propietario', $e->getMessage(), 500);
        }
    }

    public function createProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'telefono' => 'required|string',
            'imagen' => 'required|array',
            'imagen.url' => 'required|string',
            'imagen.public_id' => 'required|string',
            'tipo_documento_id' => 'required|exists:tipo_documento,tipo_documento_id',
            'numero_documento' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validación fallida', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            $user = auth()->user();

            // Verificar si ya existe un perfil de propietario
            $propietario = Propietario::where('user_id', $user->id)->first();
            if ($propietario) {
                return $this->sendError('El usuario ya tiene un perfil de propietario', [], 422);
            }

            // Añadir rol de propietario
            $roles = $user->roles;
            if (!in_array('propietario', $roles)) {
                $roles[] = 'propietario';
                $user->update(['roles' => $roles]);
            }

            // Crear perfil de propietario
            $propietario = Propietario::create([
                'user_id' => $user->id,
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'telefono' => $request->telefono,
                'imagen' => $request->imagen,
                'tipo_documento_id' => $request->tipo_documento_id,
                'numero_documento' => $request->numero_documento
            ]);

            DB::commit();
            return $this->sendResponse(
                new PropietarioResource($propietario),
                'Perfil de propietario creado correctamente',
                201
            );
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('Error al crear perfil de propietario', $e->getMessage(), 500);
        }
    }
}
