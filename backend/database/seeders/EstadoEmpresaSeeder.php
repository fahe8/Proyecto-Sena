<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstadoEmpresaSeeder extends Seeder
{
    public function run()
    {
        DB::table('estado_empresa')->insertOrIgnore([
            ['id_estado_empresa' => 'activo'],
            ['id_estado_empresa' => 'inactivo'],
            ['id_estado_empresa' => 'pendiente'],
        ]);
    }
}
