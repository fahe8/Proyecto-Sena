<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla tipo_documento
class CreateTipoDocumentoTable extends Migration
{
    public function up()
    {
        Schema::create('tipoDocumento', function (Blueprint $table) {
            $table->string('id_tipoDocumento')->primary();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tipoDocumento');
    }
}

?>