<?php

namespace App\Http\Controllers\Api;

use App\Models\Propietario;
use Illuminate\Http\Request;
use Kreait\Firebase\Factory;

class PropietarioController extends ApiController
{
    protected $auth;

    public function __construct()
    {
        $firebase = (new Factory)
            ->withServiceAccount(config('firebase.credentials.file'));
        $this->auth = $firebase->createAuth();
    }

    public function index()
    {
        try {
            $propietarios = Propietario::get();
            return $this->sendResponse($propietarios, 'Propietarios encontrados exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo propietarios', $e->getMessage());
        }
    }
    public function store(Request $request)
    {
        try {
            $firebaseUser = $this->auth->getUser($request->firebase_uid);
            
            request()->validate([
                'nombre' => 'required|string',
                'apellido' => 'required|string',
                'telefono' => 'required|string',
                'email' => 'required|email|unique:propietario,email',
                'num_documento' => 'required|numeric|unique:propietario,num_documento',
                'bloqueado' => 'required|boolean',
                'id_tipoDocumento' => 'required|exists:tipodocumento,id_tipoDocumento'
            ]);

            $propietario = Propietario::create([
                'id_propietario' => $request->firebase_uid,
                'email' => $firebaseUser->email,
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'telefono' => $request->telefono,
                'num_documento' => $request->num_documento,
                'bloqueado' => $request->bloqueado,
                'id_tipoDocumento' => $request->id_tipoDocumento
            ]);

            return $this->sendResponse($propietario, 'Propietario creado exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error al crear propietario', $e->getMessage());
        }
    }


    public function show($id)
    {
        try {
            $propietario = Propietario::find($id);
            if (is_null($propietario)) {
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
            if (is_null($propietario)) {
                return $this->sendError('Propietario no encontrado');
            }
            $propietario->delete();
            return $this->sendResponse(null, 'Propietario eliminado exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error eliminando propietario', $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        $propietario = Propietario::find($id);
        if (is_null($propietario)) {
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

    public function obtenerPorEmpresa($nit)
    {
        try {
            $propietario = Propietario::whereHas('empresas', function ($query) use ($nit) {
                $query->where('NIT', $nit);
            })->first();

            if (is_null($propietario)) {
                return $this->sendError('No se encontró propietario para esta empresa');
            }

            return $this->sendResponse($propietario, 'Propietario encontrado exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo propietario', $e->getMessage());
        }
    }
}
