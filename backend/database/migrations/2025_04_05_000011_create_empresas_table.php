<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla empresa
class CreateEmpresasTable extends Migration
{
    public function up()
    {
        Schema::create('empresa', function (Blueprint $table) {
            $table->unsignedBigInteger('NIT')->primary();
            $table->string('nombre');
            $table->string('direccion');
            $table->string('descripcion');
            $table->string('logo');
            $table->json('imagenes')->nullable();
            $table->time('hora_apertura');
            $table->time('hora_cierre');

            // Changed from unsignedBigInteger to string
            $table->string('id_propietario');
            $table->string('id_estado_empresa');

            // Relaciones foráneas
            $table->foreign('id_propietario')->references('id_propietario')->on('propietario');
            $table->foreign('id_estado_empresa')->references('id_estado_empresa')->on('estado_empresa');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('empresa');
    }
}
