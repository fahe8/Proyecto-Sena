<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
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
            'email' => $this->user->email,
            'roles' => $this->user->roles,
            'rol_actual' => 'usuario',
            'verificado' => $this->user->email_verified_at,
        ];
    }
}
