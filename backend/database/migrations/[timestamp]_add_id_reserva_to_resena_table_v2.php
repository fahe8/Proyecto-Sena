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
        Schema::table('resena', function (Blueprint $table) {
            // Solo agregar si la columna no existe
            if (!Schema::hasColumn('resena', 'id_reserva')) {
                $table->unsignedBigInteger('id_reserva')->after('id_usuario');
                $table->foreign('id_reserva')->references('id_reserva')->on('reserva')->onDelete('cascade');
                $table->unique(['id_reserva', 'id_usuario'], 'unique_resena_usuario_reserva');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resena', function (Blueprint $table) {
            if (Schema::hasColumn('resena', 'id_reserva')) {
                $table->dropForeign(['id_reserva']);
                $table->dropUnique('unique_resena_usuario_reserva');
                $table->dropColumn('id_reserva');
            }
        });
    }
};