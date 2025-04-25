<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmpresaServicioSeeder extends Seeder
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
        $nit1 = $empresas[0]; // 987654321
        $nit2 = $empresas[1] ?? $empresas[0]; // 123456789
        
        // Check if services exist
        $servicios = DB::table('servicio')->pluck('id_servicio')->toArray();
        if (empty($servicios)) {
            $this->command->error('No servicios found. Please run ServicioSeeder first.');
            return;
        }
        
        // Create empresa-servicio relationships
        $relationships = [];
        
        // First empresa has services 1, 3, 5, 7
        $relationships[] = ['NIT' => $nit1, 'id_servicio' => '1']; // Cafetería
        $relationships[] = ['NIT' => $nit1, 'id_servicio' => '3']; // Parqueadero
        $relationships[] = ['NIT' => $nit1, 'id_servicio' => '5']; // Iluminación
        $relationships[] = ['NIT' => $nit1, 'id_servicio' => '7']; // Vestidores
        
        // Second empresa has services 2, 4, 6, 8
        $relationships[] = ['NIT' => $nit2, 'id_servicio' => '2']; // Baños
        $relationships[] = ['NIT' => $nit2, 'id_servicio' => '4']; // PetFriendly
        $relationships[] = ['NIT' => $nit2, 'id_servicio' => '6']; // Wifi
        $relationships[] = ['NIT' => $nit2, 'id_servicio' => '8']; // Seguridad
        
        DB::table('empresa_servicio')->insertOrIgnore($relationships);
    }
}