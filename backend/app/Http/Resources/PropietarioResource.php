<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropietarioResource extends JsonResource
{
    private $currentRole = null;

    public function __construct($resource, $role = null)
    {
        parent::__construct($resource);
        $this->currentRole = $role;
    }

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'apellido' => $this->apellido,
            'telefono' => $this->telefono,
            'tipo_documento_id' => $this->tipo_documento_id,
            'numero_documento' => $this->numero_documento,
            'imagen' => $this->imagen,
            'id_user' => $this->user->id,
            'empresas' => $this->empresas->pluck('NIT'), // Obtener todos los NITs de las empresas
            'NIT' => $this->empresas->first()?->NIT, // NIT de la primera empresa (si existe)
            'email' => $this->user->email,
            'roles' => $this->user->roles,
            'rol_actual' => 'propietario',
        ];
    }
}
