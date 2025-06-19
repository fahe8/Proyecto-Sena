<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RolePermissionSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call([
           
            ServicioSeeder::class,
            TipoCanchaSeeder::class,
            EstadoEmpresaSeeder::class,
            EstadoCanchaSeeder::class,
            TipoDocumentoSeeder::class,
            ResenaSeeder::class,
            
        ]);
    }
}
