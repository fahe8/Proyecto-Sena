<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\EstadoCancha;
use App\Models\TipoCancha;
use Illuminate\Http\Request;

class CanchasAdicionalController extends ApiController
{
    public function index()
    {
        $tiposCanchas = TipoCancha::all();
        return $this->sendResponse(
            $tiposCanchas,
            'Lista de tipos de canchas obtenida correctamente',
            200
        );
    }

    public function estadosCanchas() {
        $estadosCanchas = EstadoCancha::all();
        return $this->sendResponse(
            $estadosCanchas,
            'Lista de estados de canchas obtenida correctamente',
            200
        );
    }
}