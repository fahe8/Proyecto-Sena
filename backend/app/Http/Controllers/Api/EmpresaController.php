<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmpresaResource;
use App\Models\Empresa;
use Cloudinary\Api\Admin\AdminApi;
use Cloudinary\Api\Upload\UploadApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class EmpresaController extends ApiController
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
        $empresas = Empresa::with(['propietario', 'estadoEmpresa', 'servicios', 'canchas.tipoCancha'])
            ->withAvg('resenas as promedio_calificacion', 'calificacion')
            ->get();

        return $this->sendResponse(
            $empresas,
            'Lista de empresas obtenida correctamente',
            200
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'NIT' => 'required|unique:empresa,NIT',
            'nombre' => 'required|string',
            'direccion' => 'required|string',
            'descripcion' => 'required|string',
            'logo' => 'required|image|max:2048', // Cambiado para recibir archivo de imagen
            'imagenes' => 'nullable|array',
            'imagenes.*' => 'image|max:2048', // Cambiado para recibir archivos de imagen
            'hora_apertura' => 'required|date_format:H:i',
            'hora_cierre' => 'required|date_format:H:i',
            'propietario_id' => 'required|exists:propietario,id',
            'servicios' => 'nullable|array',
            'servicios.*' => 'exists:servicio,id'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error de validación', $validator->errors(), 422);
        }

        try {
            DB::beginTransaction();
            
            $uploadApi = new UploadApi();
            $data = $request->except(['servicios', 'logo', 'imagenes']);

            // Subir logo a Cloudinary
            if ($request->hasFile('logo')) {
                $result = $uploadApi->upload($request->file('logo')->getRealPath(), [
                    'folder' => 'micanchaya/empresas/logo',
                    'resource_type' => 'image',
                    'transformation' => [
                        'quality' => 'auto',
                        'fetch_format' => 'auto'
                    ]
                ]);

                $data['logo'] = [
                    'url' => $result['secure_url'],
                    'public_id' => $result['public_id']
                ];
            }

            // Subir imágenes adicionales a Cloudinary
            if ($request->hasFile('imagenes')) {
                $imagenesData = [];
                foreach ($request->file('imagenes') as $imagen) {
                    $result = $uploadApi->upload($imagen->getRealPath(), [
                        'folder' => 'micanchaya/empresas/imagenes',
                        'resource_type' => 'image',
                        'transformation' => [
                            'quality' => 'auto',
                            'fetch_format' => 'auto'
                        ]
                    ]);

                    $imagenesData[] = [
                        'url' => $result['secure_url'],
                        'public_id' => $result['public_id']
                    ];
                }
                $data['imagenes'] = $imagenesData;
            }

            $data['id_estado_empresa'] = 'pendiente';
            $empresa = Empresa::create($data);

            if ($request->has('servicios')) {
                $empresa->servicios()->attach($request->servicios);
            }

            DB::commit();

            return $this->sendResponse(
                new EmpresaResource($empresa->load(['propietario', 'estadoEmpresa', 'servicios'])),
                'Empresa creada correctamente',
                201
            );
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('Error al crear la empresa', $e->getMessage(), 500);
        }
    }

    public function show($nit)
    {
        $empresa = Empresa::with(['propietario', 'estadoEmpresa', 'servicios', 'canchas.tipoCancha', 'resenas'])
            ->findOrFail($nit);
            
        return $this->sendResponse(
            new EmpresaResource($empresa),
            'Empresa obtenida correctamente',
            200
        );
    }

    public function update(Request $request, $nit)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'string',
            'direccion' => 'string',
            'descripcion' => 'string',
            'logo' => 'image|max:2048',
            'imagenes.*' => 'image|max:2048',
            'hora_apertura' => 'date_format:H:i',
            'hora_cierre' => 'date_format:H:i',
            'id_estado_empresa' => 'exists:estado_empresa,id_estado_empresa',
            'propietario_id' => 'exists:propietario,id',
            'servicios' => 'nullable|array',
            'servicios.*' => 'exists:servicio,id'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error de validación', $validator->errors(), 422);
        }

        try {
            DB::beginTransaction();

            $empresa = Empresa::findOrFail($nit);
            $data = $request->except(['servicios', 'logo', 'imagenes']);
            $cloudinary = new UploadApi();

            // Manejar el logo
            if ($request->hasFile('logo')) {
                // Subir el nuevo logo
                $result = $cloudinary->upload($request->file('logo')->getRealPath(), [
                    'folder' => "micanchaya/empresas/logo"
                ]);

                // Eliminar el logo anterior
                if ($empresa->logo) {
                    $adminApi = new AdminApi();
                    $adminApi->deleteAssets([$empresa->logo['public_id']]);
                }

                $data['logo'] = [
                    'url' => $result['secure_url'],
                    'public_id' => $result['public_id']
                ];
            }

            // Manejar las imágenes múltiples
            if ($request->hasFile('imagenes')) {
                $nuevasImagenes = []; // Inicializar la variable aquí
                
                foreach ($request->file('imagenes') as $imagen) {
                    $result = $cloudinary->upload($imagen->getRealPath(), [
                        'folder' => "micanchaya/empresas/{$nit}"
                    ]);
                    
                    $nuevasImagenes[] = [
                        'url' => $result['secure_url'],
                        'public_id' => $result['public_id']
                    ];
                }

                // Eliminar las imágenes anteriores
                if ($empresa->imagenes) {
                    $adminApi = new AdminApi();
                    $oldPublicIds = array_column($empresa->imagenes, 'public_id');
                    if (!empty($oldPublicIds)) {
                        $adminApi->deleteAssets($oldPublicIds);
                    }
                }

                $data['imagenes'] = $nuevasImagenes;
            }

            $empresa->update($data);

            if ($request->has('servicios')) {
                $empresa->servicios()->sync($request->servicios);
            }

            DB::commit();

            return $this->sendResponse(
                $empresa->load(['propietario', 'estadoEmpresa', 'servicios']),
                'Empresa actualizada correctamente',
                200
            );
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('Error al actualizar la empresa', $e->getMessage(), 500);
        }
    }

    public function destroy($nit)
    {
        try {
            DB::beginTransaction();
            
            $empresa = Empresa::findOrFail($nit);
            
            // Eliminar imágenes de Cloudinary
            $adminApi = new AdminApi();
            
            if ($empresa->logo) {
                $adminApi->deleteAssets([$empresa->logo['public_id']]);
            }

            if ($empresa->imagenes) {
                $publicIds = array_column($empresa->imagenes, 'public_id');
                if (!empty($publicIds)) {
                    $adminApi->deleteAssets($publicIds);
                }
            }

            $empresa->delete();
            
            DB::commit();

            return $this->sendResponse(
                [],
                'Empresa eliminada correctamente',
                200
            );
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('Error al eliminar la empresa', $e->getMessage(), 500);
        }
    }

    public function findByPropietarioId($propietarioId)
    {
        $empresa = Empresa::where('propietario_id', $propietarioId)->first();

        if (!$empresa) {
            return $this->sendError('Empresa no encontrada', [], 404);
        }

        return $this->sendResponse(
            new EmpresaResource($empresa),
            'Empresa obtenida correctamente',
            200
        );
    }
}