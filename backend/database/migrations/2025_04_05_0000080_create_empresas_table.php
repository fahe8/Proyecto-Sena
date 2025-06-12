<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('empresa', function (Blueprint $table) {
            $table->unsignedBigInteger('NIT')->primary();
            $table->string('nombre');
            $table->string('direccion');
            $table->string('descripcion');
            $table->json('logo');
            $table->json('imagenes')->nullable();
            $table->time('hora_apertura');
            $table->time('hora_cierre');
            $table->string('id_estado_empresa');
            $table->foreignId('propietario_id')->constrained('propietario')->onDelete('cascade');
            $table->foreign('id_estado_empresa')->references('id_estado_empresa')->on('estado_empresa');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('empresa');
    }
};
