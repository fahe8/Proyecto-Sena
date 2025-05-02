<?php
namespace App\Http\Controllers\Api;
use App\Models\EstadoCancha;
use Illuminate\Http\Request;

class EstadoCanchaController extends ApiController
{
    public function index() {
        try {
            $estados = EstadoCancha::all();
            $estadosCanchas = $estados->pluck('id_estado_cancha')->toArray(); 
            $data = [
                'estados' => $estadosCanchas
            ];
            return $this->sendResponse($data, 'Estados de la cancha encontrados exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo estados de la cancha', $e->getMessage());
        }
    }
    public function store(Request $request) {}
    public function show($id) {}
    public function update(Request $request, $id) {}
    public function destroy($id) {}
}