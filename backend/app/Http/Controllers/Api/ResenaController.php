<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Resena;
use Illuminate\Support\Facades\Validator;

class ResenaController extends ApiController
{
    public function index() 
    {
        // Implementar si es necesario
    }
    
    // Método para verificar si un usuario ya tiene reseña para una reserva
    public function verificarResenaUsuario($idReserva, $idUsuario)
    {
        try {
            $resena = Resena::where('id_reserva', $idReserva)
                           ->where('usuario_id', $idUsuario)
                           ->first();
    
            return response()->json([
                'success' => true,
                'tiene_resena' => $resena ? true : false,
                'resena' => $resena
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al verificar la reseña',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    // Método mejorado para crear reseñas con validación
    public function store(Request $request)
    {
        try {
            // Validar datos de entrada
            $request->validate([
                'id_reserva' => 'required|exists:reserva,id_reserva',
                'NIT' => 'required|exists:empresa,NIT',
                'comentario' => 'required|string|min:10|max:500',
                'calificacion' => 'required|numeric|min:1|max:5',
                'usuario_id' => 'required|exists:usuario,id'
            ]);
    
            // Verificar si ya existe una reseña para esta reserva y usuario
            $resenaExistente = Resena::where('id_reserva', $request->id_reserva)
                                   ->where('usuario_id', $request->usuario_id)
                                   ->first();
    
            if ($resenaExistente) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ya has creado una reseña para esta reserva'
                ], 409);
            }
    
            // Crear la nueva reseña
            $resena = Resena::create([
                'id_reserva' => $request->id_reserva,
                'NIT' => $request->NIT,
                'comentario' => $request->comentario,
                'calificacion' => $request->calificacion,
                'usuario_id' => $request->usuario_id
            ]);
    
            return response()->json([
                'success' => true,
                'message' => 'Reseña creada exitosamente',
                'data' => $resena
            ], 201);
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Datos de validación incorrectos',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear la reseña',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Método para obtener reseñas por empresa
    public function obtenerResenasPorEmpresa($nit)
    {
        try {
            $resenas = Resena::where('NIT', $nit)
                           ->with(['usuario', 'reserva.cancha'])
                           ->orderBy('created_at', 'desc')
                           ->get();

            // Calcular estadísticas
            $promedioCalificacion = $resenas->avg('calificacion') ?: 0;
            
            $distribucionCalificaciones = [];
            for ($i = 1; $i <= 5; $i++) {
                $distribucionCalificaciones[$i] = $resenas->where('calificacion', $i)->count();
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'resenas' => $resenas,
                    'promedio_calificacion' => round($promedioCalificacion, 1),
                    'total_resenas' => $resenas->count(),
                    'distribucion_calificaciones' => $distribucionCalificaciones
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener las reseñas de la empresa',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $resena = Resena::findOrFail($id);
            $resena->delete();

            return response()->json([
                'success' => true,
                'message' => 'Reseña eliminada exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar la reseña',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function obtenerReseñaEmpresa($nit)
    {
        try {
            // Obtener reseñas a través de la relación reserva->empresa
            $resenas = Resena::select(
                    'id_resena as id',
                    'calificacion',
                    'comentario',
                    'created_at as fecha_resena',
                    'usuario_id'
                )
                ->with(['usuario:id,nombre,apellido'])
                ->whereHas('reserva', function($query) use ($nit) {
                    $query->where('NIT', $nit);
                })
                ->orderBy('created_at', 'desc')
                ->get();

            // Calcular el promedio de calificaciones
            $promedioCalificacion = $resenas->avg('calificacion');

            // Contar el número de reseñas por cada calificación (1-5)
            $distribucionCalificaciones = $resenas->groupBy('calificacion')
                ->map(function ($grupo) {
                    return count($grupo);
                });

            return response()->json([
                'success' => true,
                'data' => [
                    'resenas' => $resenas,
                    'promedio_calificacion' => round($promedioCalificacion, 1),
                    'total_resenas' => $resenas->count(),
                    'distribucion_calificaciones' => $distribucionCalificaciones
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener las reseñas de la empresa',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    // Nuevo método para obtener historial de reseñas por usuario
    public function obtenerHistorialResenas($idUsuario)
    {
        try {
            $resenas = Resena::where('usuario_id', $idUsuario)
                       ->with(['reserva.cancha.empresa', 'reserva.cancha'])
                       ->orderBy('created_at', 'desc')
                       ->get();
    
            return response()->json([
                'success' => true,
                'data' => $resenas
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener el historial de reseñas',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    // Método para obtener reseña por ID de reserva
    public function obtenerPorReserva($idReserva)
    {
        try {
            $resena = Resena::where('id_reserva', $idReserva)
                      ->with(['usuario:id,nombre,apellido'])
                      ->first();
            
            if (!$resena) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se encontró reseña para esta reserva'
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $resena
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener la reseña de la reserva',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}