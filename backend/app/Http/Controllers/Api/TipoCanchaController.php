<?php
namespace App\Http\Controllers\Api;
use App\Models\TipoCancha;
use Illuminate\Http\Request;

class TipoCanchaController extends ApiController
{
    public function index() {
        try {
            $canchas = TipoCancha::all();
            
            // Extraer solo los tipos de cancha en un array
            $tiposCanchas = $canchas->pluck('id_tipo_cancha')->toArray();
            
            // Crear la estructura deseada
            $data = [
                'tipos' => $tiposCanchas
            ];
            
            return $this->sendResponse($data, 'Canchas encontradas exitosamente');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo canchas', $e->getMessage());
        }
    }
    public function store(Request $request) {}
    public function show($id) {}
    public function update(Request $request, $id) {}
    public function destroy($id) {}
}