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
            $reservas = Reserva::with(['cancha', 'usuario'])->get();
            return $this->sendResponse($reservas, 'Reservas obtenidas con éxito');
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo reservas', $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        try {

            // Log completo de todo lo que llega en la request
            Log::info('=== INICIO STORE RESERVA ===');
            Log::info('Request completa recibida:', [
                'all_data' => $request->all(),
                'headers' => $request->headers->all(),
                'method' => $request->method(),
                'url' => $request->fullUrl(),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'timestamp' => now()->toDateTimeString()
            ]);
            
            // Log de validación
            Log::info('Iniciando validación de datos');
            $request->validate([
                'fecha' => 'required|date',
                'hora_inicio' => 'required|date_format:H:i:s',
                'hora_final' => 'required|date_format:H:i:s|after:hora_inicio',
                'cancha_id' => 'required|exists:cancha,id',
                'usuario_id' => 'required|exists:usuario,id',
                'crearReserva' => 'required|boolean'
            ]);
            Log::info('Validación exitosa');
    
            // Log de obtención de cancha y empresa
            Log::info('Obteniendo cancha con ID:', ['cancha_id' => $request->cancha_id]);
            $cancha = Cancha::with('empresa')->findOrFail($request->cancha_id);
            Log::info('Cancha obtenida:', ['cancha' => $cancha->toArray()]);
            
            $empresa = $cancha->empresa;
            Log::info('Empresa asociada:', ['empresa' => $empresa->toArray()]);
    
            // Log de validaciones de horario
            Log::info('Validando horarios de empresa:', [
                'hora_inicio_request' => $request->hora_inicio,
                'hora_apertura_empresa' => $empresa->hora_apertura,
                'hora_final_request' => $request->hora_final,
                'hora_cierre_empresa' => $empresa->hora_cierre
            ]);
    
            // Validar que hora_inicio sea mayor o igual a hora_apertura
            if ($request->hora_inicio < $empresa->hora_apertura) {
                Log::warning('Error: Hora de inicio antes de apertura', [
                    'hora_inicio' => $request->hora_inicio,
                    'hora_apertura' => $empresa->hora_apertura
                ]);
                return $this->sendError('Error de validación', ['error' => 'La hora de inicio debe ser igual o después de la apertura de la empresa: ' . $empresa->hora_apertura]);
            }
    
            // Validar que hora_final no sea después del cierre
            // Validar que hora_final no sea después del cierre
            // Si hora_cierre es 00:00:00, significa medianoche (final del día)
            if ($empresa->hora_cierre === '00:00:00') {
            // Si cierra a medianoche, cualquier hora del día es válida
            Log::info('Empresa cierra a medianoche - horario válido');
            } else {
            if ($request->hora_final > $empresa->hora_cierre) {
            Log::warning('Error: Hora final después del cierre', [
            'hora_final' => $request->hora_final,
            'hora_cierre' => $empresa->hora_cierre
            ]);
            return $this->sendError('Error de validación', ['error' => 'La hora de finalización debe ser igual o antes del cierre de la empresa: ' . $empresa->hora_cierre]);
            }
            }
    
            Log::info('Validaciones de horario exitosas');
    
            // Verificar que la cancha existe
            $cancha = Cancha::find($request->cancha_id);
            if (!$cancha) {
                Log::error('Error: Cancha no encontrada', ['cancha_id' => $request->cancha_id]);
                return $this->sendError('Error de validación', ['error' => 'La cancha no existe']);
            }
    
            // Log de búsqueda de reservas existentes
            Log::info('Buscando reservas existentes que se crucen:', [
                'cancha_id' => $request->cancha_id,
                'fecha' => $request->fecha,
                'hora_inicio' => $request->hora_inicio,
                'hora_final' => $request->hora_final
            ]);
    
            // Buscar reservas existentes que se crucen
            $existingReservation = Reserva::where('cancha_id', $request->cancha_id)
                ->where('fecha', $request->fecha)
                ->where('hora_inicio', '<', $request->hora_final)
                ->where('hora_final', '>', $request->hora_inicio)
                ->first();
    
            if ($existingReservation) {
                Log::warning('Conflicto: Reserva existente encontrada', [
                    'reserva_existente' => $existingReservation->toArray()
                ]);
                return $this->sendError('Error de validación', ['error' => 'La cancha ya está reservada en ese horario']);
            }
            
            Log::info('No se encontraron conflictos de reservas');
    
            // Log del campo crearReserva
            Log::info('Verificando campo crearReserva:', ['crearReserva' => $request->crearReserva]);
    
            // Si crearReserva es false, solo verificar disponibilidad
            if (!$request->crearReserva) {
                Log::info('Solo verificación de disponibilidad - no se creará reserva');
                return $this->sendResponse([
                    'disponible' => true,
                    'mensaje' => 'La cancha está disponible en el horario solicitado'
                ], 'Verificación de disponibilidad exitosa');
            }
    
            // Si crearReserva es true, proceder a crear la reserva
            Log::info('Procediendo a crear la reserva');
            
            // Add NIT to the request data
            $data = $request->all();
            $data['NIT'] = $empresa->NIT;
            // Remover el campo crearReserva antes de crear la reserva
            unset($data['crearReserva']);
            
            Log::info('Datos finales para crear reserva:', ['data' => $data]);
    
            $reserva = Reserva::create($data);
            Log::info('Reserva creada exitosamente:', ['reserva' => $reserva->toArray()]);
            
            $reservaCompleta = $reserva->load(['cancha', 'usuario']);
            Log::info('Reserva con relaciones cargadas:', ['reserva_completa' => $reservaCompleta->toArray()]);
            
            Log::info('=== FIN STORE RESERVA EXITOSO ===');
            return $this->sendResponse($reservaCompleta, 'Reserva creada con éxito');
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Error de validación en store:', [
                'errors' => $e->errors(),
                'request_data' => $request->all()
            ]);
            return $this->sendError('Error de validación', $e->errors());
        } catch (\Exception $e) {
            Log::error('Error general en store:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            return $this->sendError('Error creando reserva', $e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $reserva = Reserva::with(['cancha', 'usuario'])->find($id);
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
               'cancha_id' => 'required|exists:cancha,id',
                'usuario_id' => 'sometimes|exists:usuario,id'
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

            
            $activeReservations = Reserva::with(['cancha', 'usuario', 'empresa'])
                ->where('usuario_id', $id)
                ->where(function ($query) use ($currentDate, $currentHour) {
                    $query->where('fecha', '>', $currentDate)
                        ->orWhere(function ($q) use ($currentDate, $currentHour) {
                            $q->where('fecha', '=', $currentDate)
                            ->where('hora_final', '>', $currentHour);
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

            $reservationHistory = Reserva::with(['cancha', 'usuario', 'empresa', 'resena'])
                ->where('usuario_id', $id)
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

            // Agregar información de reseña a cada reserva
            $reservationHistory = $reservationHistory->map(function ($reserva) {
                $reserva->tiene_resena = $reserva->resena !== null;
                return $reserva;
            });

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
            $reservas = Reserva::with(['cancha', 'usuario'])
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
    }
    public function obtenerHorasOcupadasPorCancha(Request $request)
    {
        try {
            $request->validate([
                'fecha' => 'required|date',
                'nit' => 'required|string'
            ]);
    
            // Validar que la empresa existe
            $empresa = Empresa::find($request->nit);
            if (is_null($empresa)) {
                return $this->sendError('Empresa no encontrada');
            }
    
            // Obtener reservas para la fecha específica
            $reservas = Reserva::with('cancha')
                ->where('NIT', $request->nit)
                ->where('fecha', $request->fecha)
                ->where('estado', 'confirmada') // Solo reservas confirmadas
                ->get();
    
            $horasOcupadasPorCancha = [];
    
            foreach ($reservas as $reserva) {
                $canchaId = $reserva->cancha_id;
                
                // Inicializar array para esta cancha si no existe
                if (!isset($horasOcupadasPorCancha[$canchaId])) {
                    $horasOcupadasPorCancha[$canchaId] = [];
                }
    
                // Convertir horas a objetos Carbon para facilitar el manejo
                $horaInicio = Carbon::createFromFormat('H:i:s', $reserva->hora_inicio);
                $horaFinal = Carbon::createFromFormat('H:i:s', $reserva->hora_final);
    
                // Generar todas las horas entre hora_inicio y hora_final (inclusive)
                $horaActual = $horaInicio->copy();
                while ($horaActual->lte($horaFinal)) {
                    $horaFormateada = $horaActual->format('H:i:s');
                    
                    // Agregar la hora si no está ya en el array
                    if (!in_array($horaFormateada, $horasOcupadasPorCancha[$canchaId])) {
                        $horasOcupadasPorCancha[$canchaId][] = $horaFormateada;
                    }
                    
                    // Avanzar una hora
                    $horaActual->addHour();
                }
    
                // Ordenar las horas para cada cancha
                sort($horasOcupadasPorCancha[$canchaId]);
            }
    
            return $this->sendResponse($horasOcupadasPorCancha, 'Horas ocupadas obtenidas con éxito');
            
        } catch (\Exception $e) {
            return $this->sendError('Error obteniendo horas ocupadas', $e->getMessage());
        }
    }

}
