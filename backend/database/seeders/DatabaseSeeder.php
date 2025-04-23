<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            TipoDocumentoSeeder::class,
            ServicioSeeder::class,
            TipoCanchaSeeder::class,
            EstadoEmpresaSeeder::class,
            EstadoCanchaSeeder::class,
        ]);
    }
}
