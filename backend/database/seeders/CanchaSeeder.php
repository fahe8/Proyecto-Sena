<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CanchaSeeder extends Seeder
{
    public function run()
    {
        // Get the NITs from the empresas table
        $empresas = DB::table('empresa')->pluck('NIT')->toArray();
        
        // Make sure we have at least one empresa
        if (empty($empresas)) {
            $this->command->error('No empresas found. Please run EmpresaSeeder first.');
            return;
        }
        
        // Get the first empresa NIT
        $nit1 = $empresas[0];
        $nit2 = $empresas[1] ?? $empresas[0];
        
        DB::table('cancha')->insertOrIgnore([
            [
                'nombre' => 'Cancha Futbol',
                'precio' => 110000,
                'NIT' => $nit1,
                'id_tipo_cancha' => 'Futbol 11',
                'id_estado_cancha' => 'disponible'
            ],
            [
                'nombre' => 'Cancha Futbol 5',
                'precio' => 70000,
                'NIT' => $nit1,
                'id_tipo_cancha' => 'Futbol 5',
                'id_estado_cancha' => 'disponible'
            ],
            [
                'nombre' => 'Cancha Principal',
                'precio' => 120000,
                'NIT' => $nit2,
                'id_tipo_cancha' => 'Futbol 11',
                'id_estado_cancha' => 'disponible'
            ],
            [
                'nombre' => 'Cancha Secundaria',
                'precio' => 80000,
                'NIT' => $nit2,
                'id_tipo_cancha' => 'Futbol 7',
                'id_estado_cancha' => 'disponible'
            ]
        ]);
    }
}