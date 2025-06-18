<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TiposDocumentosResource extends JsonResource
{
   
    public function toArray(Request $request): array
    {
        return [
            'tipo_documento_id' => $this->tipo_documento_id,
        ];
    }
}