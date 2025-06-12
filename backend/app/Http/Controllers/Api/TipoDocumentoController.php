<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\TiposDocumentosResource;
use App\Models\TipoDocumento;
use Illuminate\Http\Request;

class TipoDocumentoController extends ApiController
{
    public function index()
    {
        $tiposDocumento = TipoDocumento::pluck('tipo_documento_id');
        return $this->sendResponse(
            $tiposDocumento,
            'Lista de tipos de documento obtenida correctamente',
            200
        );
    }
}