<?php

namespace App\Http\Controllers\Api;

use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EmpresaController extends ApiController
{
    public function index()
    {
        try {
            $empresa = Empresa::with(['propietario', 'estado', 'servicios', 'canchas.tipoCancha'])->get()
                ->map(function ($empresa) {
                    $empresa->servicios->makeHidden('pivot');
                    $empresa->tiposCanchas = $empresa->canchas->pluck('tipoCancha.id_tipo_cancha')->unique()->values();
                    if ($empresa->imagenes && is_string($empresa->imagenes)) {
                        $empresa->imagenes = json_decode($empresa->imagenes, true);
                    }
                    // Generate slug from nombre
                    $empresa->slug = Str::slug($empresa->nombre);
                    return $empresa;
                });

            return $this->sendResponse($empresa, 'Empresas obtenidas con exito');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo empresas', $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'NIT' => 'required|integer|unique:empresa',
                'nombre' => 'required|string',
                'direccion' => 'required|string',
                'descripcion' => 'required|string',
                'hora_apertura' => 'required|date_format:H:i',
                'hora_cierre' => 'required|date_format:H:i',
                'id_propietario' => 'required|exists:propietario,id_propietario',
                'id_estado_empresa' => 'required|exists:estado_empresa,id_estado_empresa',
                'imagenes' => 'nullable|array',
                'imagenes.*' => 'required|url|regex:/^https?:\/\/.*\.cloudinary\.com\/.*/'
            ]);

            $data = $request->all();
            if ($request->has('imagenes')) {
                // Store raw URLs without encoding
                $data['imagenes'] = $request->imagenes;
            }

            $empresa = Empresa::create($data);

            if ($request->has('servicios')) {
                $empresa->servicios()->attach($request->servicios);
            }

            return $this->sendResponse($empresa, 'Empresa creada con exito');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Error de validacion', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error creando empresa', $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $empresa = Empresa::find($id);
            if (is_null($empresa)) {
                return $this->sendError('Empresa no encontrada');
            }

            $request->validate([
                'nombre' => 'sometimes|string',
                'direccion' => 'sometimes|string',
                'descripcion' => 'sometimes|string',
                'hora_apertura' => 'sometimes|date_format:H:i',
                'hora_cierre' => 'sometimes|date_format:H:i',
                'id_propietario' => 'sometimes|exists:propietario,id_propietario',
                'id_estado_empresa' => 'sometimes|exists:estado_empresa,id_estado_empresa',
                'servicios' => 'sometimes|array',
                'servicios.*' => 'exists:servicio,id_servicio',
                'imagenes' => 'nullable|array',
                'imagenes.*' => 'required|url|regex:/^https?:\/\/.*\.cloudinary\.com\/.*/'
            ]);

            $empresa->update($request->all());

            if ($request->has('servicios')) {
                $empresa->servicios()->sync($request->servicios);
            }

            return $this->sendResponse($empresa->load('servicios'), 'Company updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Error de validacion', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error actualizando la empresa', $e->getMessage());
        }
    }


    public function show($id)
    {
        try {
            $empresa = Empresa::with(['propietario', 'estado', 'servicios', 'canchas', 'tarifas'])->find($id);
            if (is_null($empresa)) {
                return $this->sendError('Empresa no encontrada');
            }
            $empresa->servicios->makeHidden('pivot');
            $empresa->tarifas->makeHidden('NIT');
            return $this->sendResponse($empresa, 'Empresa obtenida con exito');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo empresa', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $empresa = Empresa::find($id);
            if (is_null($empresa)) {
                return $this->sendError('Empresa no encontrada');
            }
            $empresa->delete();
            return $this->sendResponse(null, 'Empresa eliminada con exito');
        } catch (\Exception $e) {
            return $this->sendError('Error eliminando empresa', $e->getMessage());
        }
    }
}
