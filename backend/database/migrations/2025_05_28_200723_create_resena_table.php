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
        Schema::create('resena', function (Blueprint $table) {
            $table->id('id_resena');
            $table->text('comentario');
            $table->integer('calificacion')->unsigned();
            $table->foreignId('usuario_id')->constrained('usuario', 'id')->onDelete('cascade');
            $table->foreignId('id_reserva')->constrained('reserva', 'id_reserva')->onDelete('cascade');
            $table->unsignedBigInteger('NIT');
            $table->foreign('NIT')->references('NIT')->on('empresa')->onDelete('cascade'); // ✅ Y esta
            $table->timestamps();
            
            // Constraint para que un usuario solo pueda reseñar una vez por reserva
            $table->unique(['id_reserva', 'usuario_id'], 'unique_resena_usuario_reserva');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resena');
    }
};