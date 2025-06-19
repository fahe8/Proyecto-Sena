<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Propietario;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\PropietarioResource;
use App\Models\Usuario;
use App\Models\WompiCredential;
use App\Services\CloudinaryService;
use Cloudinary\Api\Admin\AdminApi;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Cloudinary\Api\Upload\UploadApi;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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

            // Crear nuevo user
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
        ]);
    
        if ($validator->fails()) {
            return $this->sendError('Validación fallida', $validator->errors(), 422);
        }
    
        try {
            $updateData = $request->only([
                'nombre',
                'apellido',
                'telefono',
                'tipo_documento_id',
                'numero_documento'
            ]);



            $propietario->update($updateData);
    
            return $this->sendResponse(
                new PropietarioResource($propietario->load('user')),
                'Propietario actualizado correctamente',
                200
            );
        } catch (\Exception $e) {
            return $this->sendError('Error al actualizar propietario', $e->getMessage(), 500);
        }
    }

    public function updateImage(Request $request, Propietario $propietario)
    {
        if ($request->isMethod('put') || $request->isMethod('patch')) {
            $request->request->add($request->all());
        }
        // Validar la imagen
        $validator = Validator::make($request->all(), [
            'imagen' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
    
        if ($validator->fails()) {
            return $this->sendError('Validación fallida', $validator->errors(), 422);
        }
       
        try {
            if (!$request->hasFile('imagen')) {
                return $this->sendError('No se proporcionó una imagen', [], 422);
            }
    
            $uploadApi = new UploadApi();
            $adminApi = new AdminApi();
    
            // Subir la nueva imagen a Cloudinary
            $result = $uploadApi->upload($request->file('imagen')->getRealPath(), [
                'folder' => 'micanchaya/propietarios',
                'resource_type' => 'image',
                'transformation' => [
                    'quality' => 'auto',
                    'fetch_format' => 'auto'
                ]
            ]);
    
            // Eliminar la imagen anterior de Cloudinary si existe
            if ($propietario->imagen && isset($propietario->imagen['public_id'])) {
                try {
                    $adminApi->deleteAssets([$propietario->imagen['public_id']]);
                } catch (\Exception $e) {
                    // Log del error pero continúa con la actualización
                    Log::warning('Error al eliminar imagen anterior: ' . $e->getMessage());
                }
            }
    
            // Actualizar el propietario con la nueva imagen
            $imagenData = [
                'url' => $result['secure_url'],
                'public_id' => $result['public_id']
            ];
            
            $propietario->update(['imagen' => $imagenData]);
    
            // Retornar respuesta exitosa
            return $this->sendResponse(
                new PropietarioResource($propietario->load('user')),
                'Imagen actualizada correctamente',
                200
            );
    
        } catch (\Exception $e) {
            Log::error('Error al actualizar imagen: ' . $e->getMessage());
            return $this->sendError('Error al procesar la imagen', $e->getMessage(), 500);
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


    /**
     * Configurar credenciales de Wompi
     */
    public function configurarWompi(Request $request)
    {
        try {
            $request->validate([
                'public_key' => 'required|string',
                'private_key' => 'required|string', 
                'integrity_secret' => 'required|string',
                'environment' => 'required|in:test,production'
            ]);
    
            $user = auth()->user();
            $propietario = $user->propietario;
            
            if (!$propietario) {
                return $this->sendError('No se encontró el perfil de propietario', [], 404);
            }
    
            // Actualizar o crear credenciales de Wompi
            $wompiCredentials = WompiCredential::updateOrCreate(
                ['propietario_id' => $propietario->id],
                [
                    'public_key' => $request->public_key,
                    'private_key' => $request->private_key,
                    'integrity_secret' => $request->integrity_secret,
                    'environment' => $request->environment,
                    'active' => true,
                    'configured_at' => now()
                ]
            );
    
            return $this->sendResponse(
                $wompiCredentials->only(['public_key', 'environment', 'active', 'configured_at']),
                'Credenciales de Wompi configuradas exitosamente'
            );
    
        } catch (\Exception $e) {
            Log::error('Error configurando Wompi: ' . $e->getMessage());
            return $this->sendError('Error interno', [
                'error' => 'Error interno del servidor'
            ]);
        }
    }
    
    /**
     * Obtener estado de configuración de Wompi
     */
    public function estadoWompi()
    {
        $propietario = auth()->user()->propietario;
        $credentials = $propietario->wompiCredentials;
    
        return response()->json([
            'success' => true,
            'data' => [
                'configurado' => $propietario->tieneWompiConfigurado(),
                'public_key' => $credentials?->public_key,
                'environment' => $credentials?->environment,
                'configured_at' => $credentials?->configured_at
            ]
        ]);
    }
    
    /**
     * Revocar credenciales de Wompi
     */
    public function revocarWompi()
    {
        $propietario = auth()->user()->propietario;
        
        if ($propietario->wompiCredentials) {
            $propietario->wompiCredentials->delete();
        }
    
        return response()->json([
            'success' => true,
            'message' => 'Credenciales de Wompi revocadas correctamente'
        ]);
    }
    
    /**
     * Validar credenciales de Wompi
     */
    private function validarCredencialesWompi($publicKey, $privateKey, $environment)
    {
        try {
            $baseUrl = $environment === 'production' 
                ? 'https://production.wompi.co/v1' 
                : 'https://sandbox.wompi.co/v1';
    
            // Hacer una petición de prueba para validar las credenciales
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $privateKey,
                'Content-Type' => 'application/json'
            ])->get($baseUrl . '/merchants/' . $publicKey);
    
            return $response->successful();
        } catch (Exception $e) {
            return false;
        }
    }

    
}
