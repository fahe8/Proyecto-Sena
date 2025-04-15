<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla estado_empresa
class CreateEstadoEmpresaTable extends Migration
{
    public function up()
    {
        Schema::create('estado_empresa', function (Blueprint $table) {
            $table->string('id_estado_empresa')->primary();
        });
    }

    public function down()
    {
        Schema::dropIfExists('estado_empresa');
    }
}

?>