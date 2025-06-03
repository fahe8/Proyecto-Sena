<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoDocumentoSeeder extends Seeder
{
    public function run()
    {
        DB::table('tipoDocumento')->insertOrIgnore([
            ['id_tipoDocumento' => 'CC'],
            ['id_tipoDocumento' => 'TI'],
            ['id_tipoDocumento' => 'CE']
        ]);
    }
}
