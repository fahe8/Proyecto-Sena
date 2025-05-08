<?php

namespace App\Http\Controllers\Api;

use App\Models\Cancha;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CanchaController extends ApiController
{
    public function index()
    {
        try {
            $canchas = Cancha::with(['empresa', 'tipoCancha', 'estado'])->get();
            return $this->sendResponse($canchas, 'Canchas encontradas exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo canchas', $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
              Log::info('Datos del request:', $request->all());
            $request->validate([
                'nombre' => 'required|string',
                'NIT' => 'required|exists:empresa,NIT',
                'precio' => 'required|integer|min:0',
                'imagen'=>'required|url',
                'id_tipo_cancha' => 'required|exists:tipo_cancha,id_tipo_cancha',
                'id_estado_cancha' => 'required|exists:estado_cancha,id_estado_cancha',

            ]);

            $cancha = Cancha::create($request->all());
            return $this->sendResponse($cancha->load(['empresa', 'tipoCancha', 'estado']), 'Cancha creada exitosamente');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Error de validacion', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error creando cancha', $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $cancha = Cancha::with(['empresa', 'tipoCancha', 'estadoCancha'])->find($id);
            if (is_null($cancha)) {
                return $this->sendError('Cancha no encontrada');
            }
            return $this->sendResponse($cancha, 'Cancha encontrada exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo cancha', $e->getMessage());
        }
    }

    public function mostrarCanchasEmpresa($NIT){
        try {
           $cancha = Cancha::with(['empresa', 'estado'])->where('NIT',$NIT)->get();
           if ($cancha->isEmpty()) {
            return $this->sendError('Cancha no encontrada');
        }
        return $this->sendResponse($cancha,'Se encontro las canchas de la empresa');

        } catch (\Throwable $e) {
            return $this->sendError('Error obteniendo cancha', $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $cancha = Cancha::find($id);
            if (is_null($cancha)) {
                return $this->sendError('Cancha no encontrada');
            }

            $request->validate([
                'nombre' => 'required|string',
                'NIT' => 'sometimes|exists:empresa,NIT',
                'imagen' => 'sometimes|url',
                'precio' => 'required|integer|min:0',
                'id_tipo_cancha' => 'required|exists:tipo_cancha,id_tipo_cancha',
                'id_estado_cancha' => 'required|exists:estado_cancha,id_estado_cancha'
            ]);

            $cancha->update($request->all());
            return $this->sendResponse($cancha, 'Cancha actualizada exitosamente');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Error de validación', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error actualizando cancha', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $cancha = Cancha::find($id);
            if (is_null($cancha)) {
                return $this->sendError('Cancha no encontrada');
            }
            $cancha->delete();
            return $this->sendResponse(null, 'Cancha eliminada exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error eliminando cancha', $e->getMessage());
        }
    }
}