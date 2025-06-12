<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('propietario', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nombre');
            $table->string('apellido');
            $table->string('telefono');
            $table->json('imagen');
            $table->string('tipo_documento_id');
            $table->string('numero_documento');
            $table->foreign('tipo_documento_id')
                ->references('tipo_documento_id')
                ->on('tipo_documento');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('propietario');
    }
};
