<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CanchaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'precio' => $this->precio,
            'imagen' => $this->imagen,
            'estado' => $this->estadoCancha->id_estado_cancha ?? null,
            'tipo_cancha' => [
                'id' => $this->tipoCancha->id ?? null,
                'tipo' => $this->tipoCancha->tipo ?? null,
            ],
        ];
    }
}
