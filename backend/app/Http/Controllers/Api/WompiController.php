<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cancha;
use App\Models\Reserva;
use App\Models\WompiCredential;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class WompiController extends ApiController
{
    /**
     * Crear datos para el widget de Wompi
     */
    public function crearTransaccion(Request $request)
    {
        try {
            $request->validate([
                'cancha_id' => 'required|exists:cancha,id',
                'fecha' => 'required|date',
                'hora_inicio' => 'required|date_format:H:i:s',
                'hora_final' => 'required|date_format:H:i:s|after:hora_inicio',
                'usuario_id' => 'required|exists:usuario,id',
                'customer_email' => 'required|email',
                'customer_phone' => 'required|string',
                'customer_name' => 'required|string'
            ]);

            // Obtener la cancha y empresa
            $cancha = Cancha::with('empresa.propietario.wompiCredentials')->findOrFail($request->cancha_id);
            $empresa = $cancha->empresa;
            $propietario = $empresa->propietario;

            // Verificar que el propietario tenga Wompi configurado
            if (!$propietario->tieneWompiConfigurado()) {
                return $this->sendError('Error de configuración', [
                    'error' => 'El propietario no tiene configurado Wompi para procesar pagos'
                ]);
            }

            $wompiCredentials = $propietario->wompiCredentials;

            // Verificar que tenga el secreto de integridad
            if (!$wompiCredentials->integrity_secret) {
                return $this->sendError('Error de configuración', [
                    'error' => 'Falta el secreto de integridad de Wompi. Contacte al administrador.'
                ]);
            }

            // Calcular el monto total
            $horaInicio = \Carbon\Carbon::createFromFormat('H:i:s', $request->hora_inicio);
            $horaFinal = \Carbon\Carbon::createFromFormat('H:i:s', $request->hora_final);
            $duracionHoras = abs($horaFinal->diffInRealHours($horaInicio));

            // Validaciones
            if ($duracionHoras <= 0) {
                return $this->sendError('Error de horario', [
                    'error' => 'La hora final debe ser posterior a la hora de inicio'
                ]);
            }
            
            if ($cancha->precio <= 0) {
                return $this->sendError('Error de precio', [
                    'error' => 'El precio de la cancha debe ser mayor a cero'
                ]);
            }
            
            $montoTotal = $cancha->precio * $duracionHoras;
            $montoCentavos = (int)($montoTotal * 100); // Wompi maneja centavos
            
            // Generar referencia única
            $referencia = 'RESERVA_' . Str::upper(Str::random(10)) . '_' . time();
            
            // Generar firma de integridad según documentación Wompi
            // Formato: "<Referencia><Monto><Moneda><SecretoIntegridad>"
            $cadenaIntegridad = $referencia . $montoCentavos . 'COP' . $wompiCredentials->integrity_secret;
            $firmaIntegridad = hash('sha256', $cadenaIntegridad);
            
            Log::info('Generando firma de integridad:', [
                'referencia' => $referencia,
                'monto_centavos' => $montoCentavos,
                'cadena_integridad' => $referencia . $montoCentavos . 'COP' . '[SECRETO_OCULTO]',
                'firma_generada' => $firmaIntegridad
            ]);
            
            // Guardar información temporal de la reserva
            $reservaData = [
                'cancha_id' => $request->cancha_id,
                'fecha' => $request->fecha,
                'hora_inicio' => $request->hora_inicio,
                'hora_final' => $request->hora_final,
                'usuario_id' => $request->usuario_id,
                'NIT' => $empresa->NIT,
                'wompi_reference' => $referencia,
                'monto_total' => $montoTotal,
                'estado_pago' => 'PENDING',
                'propietario_id' => $propietario->id
            ];

            // Guardar en cache temporal (30 minutos)
            cache()->put('reserva_temp_' . $referencia, $reservaData, now()->addMinutes(30));

            return $this->sendResponse([
                'public_key' => $wompiCredentials->public_key,
                'reference' => $referencia,
                'amount_in_cents' => $montoCentavos,
                'currency' => 'COP',
                'integrity_signature' => $firmaIntegridad,
                'customer_email' => $request->customer_email,
                'customer_data' => [
                    'phone_number' => $request->customer_phone,
                    'full_name' => $request->customer_name
                ],
                'shipping_address' => [
                    'address_line_1' => $empresa->direccion ?? 'Dirección no disponible',
                    'country' => 'CO',
                    'region' => 'Cundinamarca', 
                    'city' => 'Bogotá',
                    'name' => $request->customer_name,
                    'phone_number' => $request->customer_phone
                ],
                'redirect_url' => config('app.frontend_url', 'http://localhost:5173') . '/reserva-confirmada'
            ], 'Datos para widget de Wompi generados exitosamente');

        } catch (\Exception $e) {
            Log::error('Error creando transacción Wompi: ' . $e->getMessage());
            return $this->sendError('Error interno', [
                'error' => 'Error interno del servidor'
            ]);
        }
    }

    /**
     * Confirmar pago desde el widget de Wompi
     */
    public function confirmarPago(Request $request)
    {
        try {
            $request->validate([
                'reference' => 'required|string',
                'transaction_id' => 'required|string'
            ]);

            // Obtener datos temporales de la reserva
            $reservaData = cache()->get('reserva_temp_' . $request->reference);
            
            if (!$reservaData) {
                return $this->sendError('Error', [
                    'error' => 'Transacción no encontrada o expirada'
                ]);
            }

            // Obtener credenciales de Wompi
            $cancha = Cancha::with('empresa.propietario.wompiCredentials')->findOrFail($reservaData['cancha_id']);
            $wompiCredentials = $cancha->empresa->propietario->wompiCredentials;

            $baseUrl = $wompiCredentials->environment === 'production' 
                ? config('services.wompi.production_url', 'https://production.wompi.co/v1')
                : config('services.wompi.test_url', 'https://sandbox.wompi.co/v1');

            // Verificar estado de la transacción en Wompi
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $wompiCredentials->private_key
            ])->get($baseUrl . '/transactions/' . $request->transaction_id);

            if (!$response->successful()) {
                Log::error('Error verificando transacción Wompi:', [
                    'transaction_id' => $request->transaction_id,
                    'response' => $response->json()
                ]);
                return $this->sendError('Error', [
                    'error' => 'No se pudo verificar el estado del pago'
                ]);
            }

            $transaction = $response->json()['data'];

            Log::info('Estado de transacción Wompi:', [
                'transaction_id' => $request->transaction_id,
                'status' => $transaction['status'],
                'reference' => $transaction['reference']
            ]);

            // Verificar que el pago fue exitoso
            if ($transaction['status'] !== 'APPROVED') {
                return $this->sendError('Pago no aprobado', [
                    'error' => 'El pago no fue aprobado. Estado: ' . $transaction['status']
                ]);
            }

            // Verificar que la referencia coincida
            if ($transaction['reference'] !== $request->reference) {
                return $this->sendError('Error de validación', [
                    'error' => 'La referencia de la transacción no coincide'
                ]);
            }

            // Verificar que no exista conflicto de horarios
            $existingReservation = Reserva::where('cancha_id', $reservaData['cancha_id'])
                ->where('fecha', $reservaData['fecha'])
                ->where('hora_inicio', '<', $reservaData['hora_final'])
                ->where('hora_final', '>', $reservaData['hora_inicio'])
                ->first();

            if ($existingReservation) {
                Log::warning('Conflicto de horario detectado:', [
                    'nueva_reserva' => $reservaData,
                    'reserva_existente' => $existingReservation->toArray()
                ]);
                return $this->sendError('Conflicto de horario', [
                    'error' => 'La cancha ya fue reservada por otro usuario en ese horario'
                ]);
            }

            // Crear la reserva
            $reserva = Reserva::create([
                'fecha' => $reservaData['fecha'],
                'hora_inicio' => $reservaData['hora_inicio'],
                'hora_final' => $reservaData['hora_final'],
                'cancha_id' => $reservaData['cancha_id'],
                'usuario_id' => $reservaData['usuario_id'],
                'NIT' => $reservaData['NIT'],
                'wompi_transaction_id' => $request->transaction_id,
                'wompi_reference' => $request->reference,
                'monto_pagado' => $reservaData['monto_total'],
                'estado_pago' => 'PAID'
            ]);

            // Limpiar cache temporal
            cache()->forget('reserva_temp_' . $request->reference);

            Log::info('Reserva creada exitosamente:', [
                'reserva_id' => $reserva->id,
                'transaction_id' => $request->transaction_id,
                'reference' => $request->reference
            ]);

            return $this->sendResponse(
                $reserva->load(['cancha', 'usuario']), 
                'Reserva creada exitosamente con pago confirmado'
            );

        } catch (\Exception $e) {
            Log::error('Error confirmando pago: ' . $e->getMessage(), [
                'reference' => $request->reference ?? 'N/A',
                'transaction_id' => $request->transaction_id ?? 'N/A'
            ]);
            return $this->sendError('Error interno', [
                'error' => 'Error interno del servidor'
            ]);
        }
    }

    /**
     * Webhook para recibir notificaciones de Wompi
     */
    public function webhook(Request $request)
    {
        try {
            $event = $request->all();
            Log::info('Wompi Webhook recibido:', $event);

            if ($event['event'] === 'transaction.updated') {
                $transactionId = $event['data']['transaction']['id'];
                $status = $event['data']['transaction']['status'];

                // Buscar reserva por transaction_id
                $reserva = Reserva::where('wompi_transaction_id', $transactionId)->first();
                
                if ($reserva) {
                    $reserva->update([
                        'estado_pago' => $status === 'APPROVED' ? 'PAID' : 'FAILED'
                    ]);
                    
                    Log::info('Reserva actualizada via webhook:', [
                        'reserva_id' => $reserva->id,
                        'transaction_id' => $transactionId,
                        'nuevo_estado' => $status
                    ]);
                }
            }

            return response()->json(['status' => 'ok']);
        } catch (\Exception $e) {
            Log::error('Error en webhook Wompi: ' . $e->getMessage());
            return response()->json(['error' => 'Error procesando webhook'], 500);
        }
    }
}
