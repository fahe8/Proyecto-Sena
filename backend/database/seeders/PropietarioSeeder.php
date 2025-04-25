<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PropietarioSeeder extends Seeder
{
    public function run()
    {
        DB::table('propietario')->insertOrIgnore([
            [
                'id_propietario' => Str::uuid()->toString(),
                'nombre' => 'James',
                'apellido' => 'Diaz',
                'telefono' => '12121212',
                'email' => 'james@example.com',
                'num_documento' => '00000000',
                'bloqueado' => false,
                'id_tipoDocumento' => 'CC'
            ],
            [
                'id_propietario' => Str::uuid()->toString(),
                'nombre' => 'Maria',
                'apellido' => 'Rodriguez',
                'telefono' => '34343434',
                'email' => 'maria@example.com',
                'num_documento' => '11111111',
                'bloqueado' => false,
                'id_tipoDocumento' => 'CC'
            ]
        ]);
    }
}