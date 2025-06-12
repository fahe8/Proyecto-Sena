<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoCanchaSeeder extends Seeder
{
    public function run()
    {
        DB::table('tipo_cancha')->insertOrIgnore([
            ['tipo' => 'Futbol 5'],
            ['tipo' => 'Futbol 6'],
            ['tipo' => 'Futbol 7'],
            ['tipo' => 'Futbol 8'],
            ['tipo' => 'Futbol 9'],
            ['tipo' => 'Futbol 11']
        ]);
    }
}
