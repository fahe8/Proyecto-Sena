<?php
namespace App\Http\Controllers\Api;
use App\Models\Propietario;
use Illuminate\Http\Request;

class PropietarioController extends ApiController
{
    public function index()
    {
        try {
            $propietarios = Propietario::get();
            return $this->sendResponse($propietarios, 'Propietarios encontrados exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo propietarios', $e->getMessage());
        }
    }
    public function store(Request $request) {
        try {
            request()->validate([
                'nombre' => 'required|string',
                'apellido' => 'required|string',
                'telefono' => 'required|string',
                'email' => 'required|email|unique:propietario',
                'num_documento' => 'required|string|unique:propietario',
                'bloqueado' => 'required|boolean',
                'id_tipoDocumento' => 'required|exists:tipodocumento,id_tipoDocumento'
            ]);

            $propietario = Propietario::create($request->all());
            return $this->sendResponse($propietario, "Propietario creado");
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Error de validación', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error al crear el propietario', $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $propietario = Propietario::find($id);
            if(is_null($propietario)) {
                return $this->sendError('Propietario no encontrado');
            }
            return $this->sendResponse($propietario, 'Propietario encontrado exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo propietario', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $propietario = Propietario::find($id);
            if(is_null($propietario)) {
                return $this->sendError('Propietario no encontrado');
            }
            $propietario->delete();
            return $this->sendResponse(null, 'Propietario eliminado exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error eliminando propietario', $e->getMessage());
        }
    }

    public function update(Request $request, $id) {
        $propietario = Propietario::find($id);
        if(is_null($propietario)) {
            return $this->sendError("Propietario no encontrado");
        }

        $request->validate([
            'nombre' => 'required|string',
            'apellido' => 'required|string',
            'telefono' => 'required|string',
            'email' => 'required|email|unique:propietario',
            'num_documento' => 'required|string|unique:propietario',
            'bloqueado' => 'required|boolean',
            'id_tipoDocumento' => 'required|exists:tipodocumento,id_tipoDocumento'
        ]);

        $propietario->update($request->all());
        return $this->sendResponse($propietario, "Propietario actualizado");
    }
}