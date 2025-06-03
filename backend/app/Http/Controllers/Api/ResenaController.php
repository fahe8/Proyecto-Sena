<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Resena;
use App\Models\Reserva;


class ResenaController extends ApiController
{
    public function index() {
    }
    public function store(Request $request)
    {
        try {
            // Validar los datos de entrada
            $request->validate([
                'id_reserva' => 'required|exists:reserva,id_reserva',
                'comentario' => 'required|string|min:10',
                'calificacion' => 'required|numeric|min:1|max:5',
                'id_usuario' => 'required|exists:usuario,id_usuario'
            ]);

            // Obtener el NIT de la empresa a partir del id_reserva
            $reserva = Reserva::findOrFail($request->id_reserva);
            $NIT = $reserva->NIT;

            // Crear la reseña
            $resena = Resena::create([
                'NIT' => $NIT,
                'comentario' => $request->comentario,
                'calificacion' => $request->calificacion,
                'id_usuario' => $request->id_usuario
            ]);

            // Cargar las relaciones
            $resena->load(['empresa', 'usuario']);

            return response()->json([
                'success' => true,
                'message' => 'Reseña creada exitosamente',
                'data' => $resena
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
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
    public function show($id) {}
    public function update(Request $request, $id) {}
    public function destroy($id) {}
    public function obtenerReseñaEmpresa($nit)
{
    try {
        // Obtener todas las reseñas asociadas a la empresa con el NIT proporcionado
        // usando la relación directa entre resena y empresa
        $resenas = Resena::where('NIT', $nit)
            ->select(
                'id_resena as id',
                'calificacion',
                'comentario',
                'created_at as fecha_resena',
                'id_usuario'
            )
            ->with(['usuario:id_usuario,nombre,apellido'])
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
}
