<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoDocumentoSeeder extends Seeder
{
    public function run()
    {
        DB::table('tipo_documento')->insertOrIgnore([
            ['tipo_documento_id' => 'CC'],
            ['tipo_documento_id' => 'TI'],
            ['tipo_documento_id' => 'CE']
        ]);
    }
}
