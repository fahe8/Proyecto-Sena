<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmpresaSeeder extends Seeder
{
    public function run()
    {
        // Get the first two propietarios from the database
        $propietarios = DB::table('propietario')->take(2)->pluck('id_propietario')->toArray();
        
        // Make sure we have at least one propietario
        if (empty($propietarios)) {
            $this->command->error('No propietarios found. Please run PropietarioSeeder first.');
            return;
        }
        
        // Use the first propietario for the first empresa and the second for the second empresa (if available)
        $propietario1 = $propietarios[0];
        $propietario2 = $propietarios[1] ?? $propietarios[0]; // Use the second if available, otherwise use the first
        
        DB::table('empresa')->insertOrIgnore([
            [
                'NIT' => 987654321,
                'nombre' => 'Canchas La Jugada',
                'direccion' => 'Calle 123 #45-67',
                'descripcion' => 'Empresa dedicada al alquiler de canchas sintéticas',
                'imagenes' => json_encode([
                    'https://res.cloudinary.com/doce9wueq/image/upload/v1745262447/ryb10kty2fzqtnrg2aip.jpg',
                    'https://res.cloudinary.com/doce9wueq/image/upload/v1745262308/ojuyr4els9dggnq1afay.jpg'
                ]),
                'hora_apertura' => '08:00',
                'hora_cierre' => '22:00',
                'id_propietario' => $propietario1,
                'id_estado_empresa' => 'abierto'
            ],
            [
                'NIT' => 123456789,
                'nombre' => 'Canchas El Campín',
                'direccion' => 'Avenida 45 #12-34',
                'descripcion' => 'Las mejores canchas sintéticas de la ciudad',
                'imagenes' => json_encode([
                    'https://res.cloudinary.com/doce9wueq/image/upload/v1745262447/ryb10kty2fzqtnrg2aip.jpg',
                    'https://res.cloudinary.com/doce9wueq/image/upload/v1745262308/ojuyr4els9dggnq1afay.jpg'
                ]),
                'hora_apertura' => '09:00',
                'hora_cierre' => '23:00',
                'id_propietario' => $propietario2,
                'id_estado_empresa' => 'abierto'
            ]
        ]);
    }
}