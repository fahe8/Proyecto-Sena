<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstadoCanchaSeeder extends Seeder
{
    public function run()
    {
        DB::table('estado_cancha')->insertOrIgnore([
            ['id_estado_cancha' => 'disponible'],
            ['id_estado_cancha' => 'mantenimiento']
        ]);
    }
}
