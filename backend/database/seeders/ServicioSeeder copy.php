<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicioSeeder extends Seeder
{
    public function run()
    {
        DB::table('servicio')->insertOrIgnore([
            ['id_servicio' => '1', 'tipo' => 'Cafetería'],
            ['id_servicio' => '2', 'tipo' => 'Baños'],
            ['id_servicio' => '3', 'tipo' => 'Parqueadero'],
            ['id_servicio' => '4', 'tipo' => 'PetFriendly'],
            ['id_servicio' => '5', 'tipo' => 'Iluminación'],
            ['id_servicio' => '6', 'tipo' => 'Wifi'],
            ['id_servicio' => '7', 'tipo' => 'Vestidores'],
            ['id_servicio' => '8', 'tipo' => 'Seguridad']
        ]);
    }
}
