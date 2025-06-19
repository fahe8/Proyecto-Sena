<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Resena;
use App\Models\Reserva;
use App\Models\Usuario;
use App\Models\Empresa;
use Illuminate\Support\Facades\DB;

class ResenaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Verificar si la empresa Canchota existe
        $empresa = Empresa::where('NIT', '87654323456')->first();
        
        if (!$empresa) {
            echo "La empresa Canchota no existe en la base de datos.\n";
            return;
        }
        
        // Verificar si hay usuarios en la base de datos
        $usuario = Usuario::first();
        
        if (!$usuario) {
            echo "No hay usuarios en la base de datos.\n";
            return;
        }
        
        // Crear reservas para la empresa Canchota si no existen
        $reservas = [];
        
        // Obtener una cancha de la empresa
        $cancha = DB::table('cancha')->where('NIT', '87654323456')->first();
        
        if (!$cancha) {
            echo "No hay canchas para la empresa Canchota.\n";
            return;
        }
        
        // Crear dos reservas para poder asociar las reseñas
        for ($i = 1; $i <= 2; $i++) {
            $reserva = Reserva::create([
                'fecha' => now()->addDays($i),
                'hora_inicio' => '10:00:00',
                'hora_final' => '11:00:00',
                'usuario_id' => $usuario->id,
                'cancha_id' => $cancha->id,
                'NIT' => '87654323456',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            
            $reservas[] = $reserva;
        }
        
        // Crear reseñas para las reservas creadas
        $comentarios = [
            'Excelente servicio, las canchas están en muy buen estado.',
            'Buena atención, pero las instalaciones podrían mejorar.'
        ];
        
        $calificaciones = [5, 4];
        
        foreach ($reservas as $index => $reserva) {
            Resena::create([
                'comentario' => $comentarios[$index],
                'calificacion' => $calificaciones[$index],
                'usuario_id' => $usuario->id,
                'id_reserva' => $reserva->id_reserva,
                'NIT' => '87654323456',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        
        echo "Reseñas creadas exitosamente para la empresa Canchota.\n";
    }
}
