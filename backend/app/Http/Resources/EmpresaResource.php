<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmpresaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Calcular el promedio de calificaciones
        $promedio = $this->resenas()->avg('calificacion') ?? 0;

        return [
            'NIT' => $this->NIT,
            'nombre' => $this->nombre,
            'direccion' => $this->direccion,
            'descripcion' => $this->descripcion,
            'logo' => $this->logo,
            'imagenes' => $this->imagenes,
            'horario' => [
                'apertura' => $this->hora_apertura,
                'cierre' => $this->hora_cierre,
            ],
            'estado' => $this->estadoEmpresa->id_estado_empresa ?? null,
            'propietario' => [
                'nombre' => $this->propietario->nombre ?? null,
                'apellido' => $this->propietario->apellido ?? null,
                'telefono' => $this->propietario->telefono ?? null,
                'tipo_documento' => $this->propietario->tipo_documento_id ?? null,
                'numero_documento' => $this->propietario->numero_documento ?? null,
                'imagen' => $this->propietario->imagen ?? null,
            ],
            'servicios' => $this->servicios->pluck('tipo')->toArray(),
            'canchas' => CanchaResource::collection($this->canchas),
            'promedio_calificacion' => round($promedio, 1)
        ];
    }
}
