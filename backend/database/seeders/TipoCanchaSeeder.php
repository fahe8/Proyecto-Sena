<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoCanchaSeeder extends Seeder
{
    public function run()
    {
        DB::table('tipo_cancha')->insertOrIgnore([
            ['id_tipo_cancha' => 'Futbol 5'],
            ['id_tipo_cancha' => 'Futbol 6'],
            ['id_tipo_cancha' => 'Futbol 7'],
            ['id_tipo_cancha' => 'Futbol 8'],
            ['id_tipo_cancha' => 'Futbol 9'],
            ['id_tipo_cancha' => 'Futbol 11']
        ]);
    }
}
