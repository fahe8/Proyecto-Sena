<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('reserva', function (Blueprint $table) {
            $table->string('wompi_transaction_id')->nullable();
            $table->string('wompi_reference')->nullable();
            $table->decimal('monto_pagado', 10, 2)->nullable();
            $table->enum('estado_pago', ['PENDING', 'PAID', 'FAILED', 'REFUNDED'])->default('PENDING');
        });
    }

    public function down()
    {
        Schema::table('reserva', function (Blueprint $table) {
            $table->dropColumn([
                'wompi_transaction_id',
                'wompi_reference', 
                'monto_pagado',
                'estado_pago'
            ]);
        });
    }
};