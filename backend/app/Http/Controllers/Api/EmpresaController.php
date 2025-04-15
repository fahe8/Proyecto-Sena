<?php
namespace App\Http\Controllers\Api;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends ApiController
{
    public function index() {
        try {
            $empresa = Empresa::all();
            return $this->sendResponse($empresa, 'Empresas encontradas exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo empresas', $e->getMessage());
        }
    }

    public function store(Request $request) {
        try {
            $request->validate([
                'NIT' => 'required|integer|unique:empresa',
                'nombre' => 'required|string',
                'direccion' => 'required|string',
                'descripcion' => 'required|string',
                'hora_apertura' => 'required|date_format:H:i',
                'hora_cierre' => 'required|date_format:H:i',
                'id_propietario' => 'required|exists:propietario,id_propietario',
                'id_estado_empresa' => 'required|exists:estado_empresa,id_estado_empresa'
            ]);
            
            $empresa = Empresa::create($request->all());
            return $this->sendResponse($empresa, 'Empresa created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Error de validacion', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error creando empresa', $e->getMessage());
        }
    }

    public function update(Request $request, $id) {
        try {
            $empresa = Empresa::find($id);
            if(is_null($empresa)) {
                return $this->sendError('Empresa no encontrada');
            }

            $request->validate([
                'nombre' => 'required|string',
                'direccion' => 'required|string',
                'descripcion' => 'required|string',
                'hora_apertura' => 'required|date_format:H:i',
                'hora_cierre' => 'required|date_format:H:i',
                'id_propietario' => 'required|exists:propietario,id_propietario',
                'id_estado_empresa' => 'required|exists:estado_empresa,id_estado_empresa'
            ]);

            $empresa->update($request->all());
            return $this->sendResponse($empresa, 'Empresa updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Validation Error', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error updating empresa', $e->getMessage());
        }
    }

    public function show($id) {
        try {
            $empresa = Empresa::find($id);
            if(is_null($empresa)) {
                return $this->sendError('Empresa no encontrada');
            }
            return $this->sendResponse($empresa, 'Empresa encontrada exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo empresa', $e->getMessage());
        }
    }

    public function destroy($id) {
        try {
            $empresa = Empresa::find($id);
            if(is_null($empresa)) {
                return $this->sendError('Empresa no encontrada');
            }
            $empresa->delete();
            return $this->sendResponse(null, 'Empresa eliminada exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error eliminando empresa', $e->getMessage());
        }
    }
}