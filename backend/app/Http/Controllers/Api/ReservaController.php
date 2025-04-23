<?php
namespace App\Http\Controllers\Api;
use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends ApiController
{
    public function index()
    {
        try {
            $reservas = Reserva::with(['cancha', 'usuario', 'pago'])->get();
            return $this->sendResponse($reservas, 'Reservas obtenidas con éxito');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo reservas', $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'fecha' => 'required|date',
                'hora_inicio' => 'required|date_format:H:i',
                'hora_final' => 'required|date_format:H:i|after:hora_inicio',
                'id_cancha' => 'required|exists:cancha,id_cancha',
                'id_usuario' => 'required|exists:usuario,id_usuario'
            ]);

            $reserva = Reserva::create($request->all());
            return $this->sendResponse($reserva->load(['cancha', 'usuario']), 'Reserva creada con éxito');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Error de validación', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error creando reserva', $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $reserva = Reserva::with(['cancha', 'usuario', 'pago'])->find($id);
            if (is_null($reserva)) {
                return $this->sendError('Reserva no encontrada');
            }
            return $this->sendResponse($reserva, 'Reserva obtenida con éxito');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo reserva', $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $reserva = Reserva::find($id);
            if (is_null($reserva)) {
                return $this->sendError('Reserva no encontrada');
            }

            $request->validate([
                'fecha' => 'sometimes|date',
                'hora_inicio' => 'sometimes|date_format:H:i',
                'hora_final' => 'sometimes|date_format:H:i|after:hora_inicio',
                'id_cancha' => 'sometimes|exists:cancha,id_cancha',
                'id_usuario' => 'sometimes|exists:usuario,id_usuario'
            ]);

            $reserva->update($request->all());
            return $this->sendResponse($reserva->load(['cancha', 'usuario']), 'Reserva actualizada con éxito');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Error de validación', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error actualizando reserva', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $reserva = Reserva::find($id);
            if (is_null($reserva)) {
                return $this->sendError('Reserva no encontrada');
            }
            $reserva->delete();
            return $this->sendResponse(null, 'Reserva eliminada con éxito');
        } catch (\Exception $e) {
            return $this->sendError('Error eliminando reserva', $e->getMessage());
        }
    }
}