<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
// Migration para la tabla servicio
class CreateServiciosTable extends Migration
{
    public function up()
    {
        
        Schema::create('servicio', function (Blueprint $table) {
            $table->string('id_servicio')->primary();
            $table->string('tipo');
        });
    }

    public function down()
    {
        Schema::dropIfExists('servicio');
    }
}

?>