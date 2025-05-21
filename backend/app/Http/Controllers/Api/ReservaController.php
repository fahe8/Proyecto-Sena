<?php

namespace App\Http\Controllers\Api;

use App\Models\Cancha;
use App\Models\Empresa;
use App\Models\Reserva;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

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
                'hora_inicio' => 'required|date_format:H:i:s',
                'hora_final' => 'required|date_format:H:i:s|after:hora_inicio',
                'id_cancha' => 'required|exists:cancha,id_cancha',
                'id_usuario' => 'required|exists:usuario,id_usuario'
            ]);

            // Obtener cancha y empresa associados a la reserva
            $cancha = Cancha::with('empresa')->findOrFail($request->id_cancha);
            $empresa = $cancha->empresa;

            // Validar que hora_inicio sea mayor o igual a hora_apertura
            if ($request->hora_inicio < $empresa->hora_apertura) {
                return $this->sendError('Error de validación', ['error' => 'La hora de inicio debe ser igual o después de la apertura de la empresa: ' . $empresa->hora_apertura]);
            }

            // Validar que hora_final no sea después del cierre
            if ($request->hora_final > $empresa->hora_cierre) {
                return $this->sendError('Error de validación', ['error' => 'La hora de finalización debe ser igual o antes del cierre de la empresa: ' . $empresa->hora_cierre]);
            }

            // Buscar reservas existentes que se crucen
            $existingReservation = Reserva::where('id_cancha', $request->id_cancha)
                ->where('fecha', $request->fecha)
                ->where('hora_inicio', '<', $request->hora_final)
                ->where('hora_final', '>', $request->hora_inicio)
                ->first();

            if ($existingReservation) {
                return $this->sendError('Error de validación', ['error' => 'La cancha ya está reservada en ese horario']);
            }

            // Add NIT to the request data
            $data = $request->all();
            $data['NIT'] = $empresa->NIT;

            $reserva = Reserva::create($data);
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

    /**
     * Get active reservations (upcoming reservations)
     */
    public function obtenerReservasActivas($id)
    {
        try {
            $now = Carbon::now('America/Bogota');
            $currentDate = $now->toDateString();
            $currentHour = $now->format('H:i:s');

            

            $activeReservations = Reserva::with(['cancha', 'usuario', 'pago'])
                ->where('id_usuario', $id->id_usuario)
                ->where(function ($query) use ($currentDate, $currentHour) {
                    $query->where('fecha', '>', $currentDate)
                        ->orWhere(function ($q) use ($currentDate, $currentHour) {
                            $q->where('fecha', '=', $currentDate)
                                ->where('hora_inicio', '>=', $currentHour);
                        });
                })
                ->orderBy('fecha')
                ->orderBy('hora_inicio')
                ->get();

            if ($activeReservations->isEmpty()) {
                return $this->sendResponse([], 'No hay reservas activas para este usuario');
            }

            return $this->sendResponse($activeReservations, 'Reservas activas obtenidas con éxito');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Error de validación', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo reservas activas', $e->getMessage());
        }
    }


    /**
     * Get reservation history (past reservations)
     */
    public function obtenerHistorialReservas($id)
    {
        try {
            $now = Carbon::now('America/Bogota');
            $currentDate = $now->toDateString();
            $currentHour = $now->format('H:i:s');
            echo($currentHour);



            $reservationHistory = Reserva::with(['cancha', 'usuario', 'pago'])
                ->where('id_usuario', $id)
                ->where(function ($query) use ($currentDate, $currentHour) {
                    $query->where('fecha', '<', $currentDate)
                        ->orWhere(function ($q) use ($currentDate, $currentHour) {
                            $q->where('fecha', '=', $currentDate)
                                ->where('hora_final', '<=', $currentHour);
                        });
                })
                ->orderBy('fecha', 'desc')
                ->orderBy('hora_inicio', 'desc')
                ->get();

            if ($reservationHistory->isEmpty()) {
                return $this->sendResponse([], 'No hay reservas en el historial para este usuario');
            }

            return $this->sendResponse($reservationHistory, 'Historial de reservas obtenido con éxito');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return $this->sendError('Error de validación', $e->errors());
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo historial de reservas', $e->getMessage());
        }
    }


    public function obtenerReservasPorEmpresa($nit)
    {
        try {
            // Validate that the company exists
            $empresa = Empresa::find($nit);
            if (is_null($empresa)) {
                return $this->sendError('Empresa no encontrada');
            }
            
            // Get reservations for this company
            $reservas = Reserva::with(['cancha', 'usuario', 'pago'])
                ->where('NIT', $nit)
                ->orderBy('fecha', 'desc')
                ->orderBy('hora_inicio', 'desc')
                ->get();
                
            if ($reservas->isEmpty()) {
                return $this->sendResponse([], 'No hay reservas para esta empresa');
            }
            
            return $this->sendResponse($reservas, 'Reservas obtenidas con éxito');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo reservas', $e->getMessage());
        }
    }}
