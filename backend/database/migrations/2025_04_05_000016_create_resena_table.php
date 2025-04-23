<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


// Migration para la tabla reseña
class CreateResenaTable extends Migration
{
    public function up()
    {
        Schema::create("resena", function (Blueprint $table) {
            $table->id("id_resena")->primary();
            $table->unsignedBigInteger('NIT');
            $table->string("comentario");
            $table->float("calificacion");
            $table->string("id_usuario");
            $table->foreign('NIT')->references('NIT')->on('empresa');
            $table->foreign("id_usuario")->references("id_usuario")->on("usuario");
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('resena');
    }
}
