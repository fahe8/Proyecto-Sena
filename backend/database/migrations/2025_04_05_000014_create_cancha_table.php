<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla cancha
class CreateCanchaTable extends Migration
{
    public function up()
    {
        Schema::create("cancha", function (Blueprint $table) {
            $table->id("id_cancha")->primary();
            $table->string("nombre");
            $table->integer("precio")->unsigned();
            $table->unsignedBigInteger('NIT');
            $table->string("id_estado_cancha")->default('disponible');
            $table->string("id_tipo_cancha");
            $table->string('imagen');

            $table->foreign('id_estado_cancha')->references('id_estado_cancha')->on('estado_cancha');
            $table->foreign('NIT')->references('NIT')->on('empresa');
            $table->foreign('id_tipo_cancha')->references('id_tipo_cancha')->on('tipo_cancha');        
        });
    }
    public function down()
    {
        Schema::dropIfExists('cancha');
    }
}


?>