<?php
namespace App\Http\Controllers\Api;
use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends ApiController
{
    public function index()
    {
        try {
            $usuarios = Usuario::get();
            return $this->sendResponse($usuarios, 'Usuarios encontrados exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo usuarios', $e->getMessage());
        }
    }
    public function store(Request $request)
    {
        try {
            $request->validate([
                "id_usuario" => 'required|unique:usuario',
                'email' => 'email|unique:usuario',

            ]);

            $usuario = Usuario::create($request->all());
            return $this->sendResponse($usuario, 'Usuario created successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Validation Error', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error creating usuario', $e->getMessage());
        }
    }
    public function update(Request $request, $id_usuario)
    {
        try {
            $usuario = Usuario::find($id_usuario);
            if(is_null($usuario)) {
                return $this->sendError('Usuario no encontrado');
            }

            $request->validate([
                'nombre' => 'sometimes|string',
                'apellido' => 'sometimes|string',
                'telefono' => 'sometimes|string',
                'email' => 'sometimes|email|unique:usuario,email,' . $usuario->id_usuario . ',id_usuario',
                'bloqueado' => 'sometimes|boolean'
            ]);

            $usuario->update($request->all());
            return $this->sendResponse($usuario, 'Usuario updated successfully');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Validation Error', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error updating usuario', $e->getMessage());
        }
    }
    
    public function show($id)
    {
        try {
            $usuario = Usuario::find($id);
            if(is_null($usuario)) {
                return $this->sendError('Usuario no encontrado');
            }
            return $this->sendResponse($usuario, 'Usuario encontrado exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo usuario', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $usuario = Usuario::find($id);
            if(is_null($usuario)) {
                return $this->sendError('Usuario no encontrado');
            }
            $usuario->delete();
            return $this->sendResponse(null, 'Usuario eliminado exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error eliminando usuario', $e->getMessage());
        }
    }

   
}