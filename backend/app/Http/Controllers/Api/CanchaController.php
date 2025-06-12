<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cancha;
use Cloudinary\Api\Admin\AdminApi;
use Cloudinary\Api\Upload\UploadApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CanchaController extends ApiController
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
            Cancha::with(['empresa', 'estadoCancha', 'tipoCancha'])->get(),
            'Lista de canchas obtenida correctamente',
            200
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
            'NIT' => 'required|exists:empresa,NIT',
            'id_estado_cancha' => 'required|exists:estado_cancha,id_estado_cancha',
            'tipo_cancha_id' => 'required|exists:tipo_cancha,id',
            'imagen' => 'required|image|max:2048' // Cambiado para recibir archivo de imagen
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error de validación', $validator->errors(), 422);
        }

        try {
            DB::beginTransaction();

            $imagenData = null;
            
            // Subir imagen a Cloudinary
            if ($request->hasFile('imagen')) {
                $uploadApi = new UploadApi();
                
                // Crear carpeta organizada por empresa
                $folderPath = "micanchaya/canchas/{$request->NIT}";
                
                $result = $uploadApi->upload($request->file('imagen')->getRealPath(), [
                    'folder' => $folderPath,
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

            $cancha = Cancha::create([
                'nombre' => $request->nombre,
                'precio' => $request->precio,
                'NIT' => $request->NIT,
                'id_estado_cancha' => $request->id_estado_cancha,
                'tipo_cancha_id' => $request->tipo_cancha_id,
                'imagen' => $imagenData
            ]);

            DB::commit();

            return $this->sendResponse(
                $cancha->load(['empresa', 'estadoCancha', 'tipoCancha']),
                'Cancha creada correctamente',
                201
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Error al crear la cancha', ['error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        $cancha = Cancha::with(['empresa', 'estadoCancha', 'tipoCancha'])->find($id);

        if (!$cancha) {
            return $this->sendError('Cancha no encontrada', [], 404);
        }

        return $this->sendResponse(
            $cancha,
            'Cancha obtenida correctamente',
            200
        );
    }

    public function update(Request $request, $id)
    {
        $cancha = Cancha::find($id);

        if (!$cancha) {
            return $this->sendError('Cancha no encontrada', [], 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'string|max:255',
            'precio' => 'numeric|min:0',
            'NIT' => 'exists:empresa,NIT',
            'id_estado_cancha' => 'exists:estado_cancha,id_estado_cancha',
            'tipo_cancha_id' => 'exists:tipo_cancha,id',
            'imagen' => 'array',
            'imagen.url' => 'required_with:imagen|string',
            'imagen.public_id' => 'required_with:imagen|string'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Error de validación', $validator->errors(), 422);
        }

        try {
            DB::beginTransaction();

            // Si se proporciona una nueva imagen, eliminar la anterior de Cloudinary
            if ($request->has('imagen') && $cancha->imagen) {
                $adminApi = new AdminApi();
                $adminApi->deleteAssets([$cancha->imagen['public_id']]);
            }

            // Actualizar los campos proporcionados
            $data = $request->only(['nombre', 'precio', 'NIT', 'id_estado_cancha', 'tipo_cancha_id']);
            
            if ($request->has('imagen')) {
                $data['imagen'] = $request->imagen;
            }

            $cancha->update($data);

            DB::commit();

            return $this->sendResponse(
                $cancha->load(['empresa', 'estadoCancha', 'tipoCancha']),
                'Cancha actualizada correctamente',
                200
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Error al actualizar la cancha', ['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $cancha = Cancha::find($id);

        if (!$cancha) {
            return $this->sendError('Cancha no encontrada', [], 404);
        }

        try {
            DB::beginTransaction();

            // Eliminar imagen de Cloudinary si existe
            if ($cancha->imagen && isset($cancha->imagen['public_id'])) {
                $adminApi = new AdminApi();
                $adminApi->deleteAssets([$cancha->imagen['public_id']]);
            }

            $cancha->delete();

            DB::commit();

            return $this->sendResponse(
                [],
                'Cancha eliminada correctamente',
                200
            );
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Error al eliminar la cancha', ['error' => $e->getMessage()], 500);
        }
    }

    // Método adicional para obtener canchas por empresa
    public function getCanchasByEmpresa($nit)
    {
        $canchas = Cancha::with(['estadoCancha', 'tipoCancha'])
            ->where('NIT', $nit)
            ->get();

        return $this->sendResponse(
            $canchas,
            'Canchas de la empresa obtenidas correctamente',
            200
        );
    }

    // Método adicional para obtener canchas por estado
    public function getCanchasByEstado($estado)
    {
        $canchas = Cancha::with(['empresa', 'tipoCancha'])
            ->where('id_estado_cancha', $estado)
            ->get();

        return $this->sendResponse(
            $canchas,
            'Canchas por estado obtenidas correctamente',
            200
        );
    }

    // Método adicional para obtener canchas por tipo
    public function getCanchasByTipo($tipo)
    {
        $canchas = Cancha::with(['empresa', 'estadoCancha'])
            ->where('tipo_cancha_id', $tipo)
            ->get();

        return $this->sendResponse(
            $canchas,
            'Canchas por tipo obtenidas correctamente',
            200
        );
    }
}