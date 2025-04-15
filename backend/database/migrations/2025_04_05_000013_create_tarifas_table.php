<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


// Migration para la tabla tarifas
class CreateTarifasTable extends Migration
{
    public function up()
    {
        Schema::create('tarifas', function (Blueprint $table) {
            $table->id('id_tarifa')->primary();
            $table->unsignedBigInteger('NIT');
            $table->string("id_tipo_cancha");
            $table->float('precio');
            $table->timestamps();
            $table->foreign('NIT')->references('NIT')->on('empresa');
            $table->foreign('id_tipo_cancha')->references('id_tipo_cancha')->on('tipo_cancha');
        });
    }

    public function down()
    {
        Schema::dropIfExists('tarifas');
    }
}
