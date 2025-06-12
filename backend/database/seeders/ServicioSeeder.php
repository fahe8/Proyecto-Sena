<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicioSeeder extends Seeder
{
    public function run()
    {
        DB::table('servicio')->insertOrIgnore([
            ['tipo' => 'Cafetería'],
            ['tipo' => 'Baños'],
            ['tipo' => 'Parqueadero'],
            ['tipo' => 'PetFriendly'],
            ['tipo' => 'Iluminación'],
            ['tipo' => 'Wifi'],
            ['tipo' => 'Vestidores'],
            ['tipo' => 'Seguridad']
        ]);
    }
}
