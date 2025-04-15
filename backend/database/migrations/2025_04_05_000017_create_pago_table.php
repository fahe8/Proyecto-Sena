<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla pago
class CreatePagoTable extends Migration
{
    public function up()
    {
        Schema::create("pago", function (Blueprint $table) {
            $table->id("id_pago");
        
            $table->string("monto");
            $table->date("fecha_pago");
        
            $table->string("id_metodo_pago");
            $table->string("id_estado_pago");
            $table->unsignedBigInteger("id_reserva");
        
            // Relaciones foráneas
            $table->foreign("id_metodo_pago")->references("id_metodo_pago")->on("metodo_pago")->onDelete("cascade");
            $table->foreign("id_estado_pago")->references("id_estado_pago")->on("estado_pago")->onDelete("cascade");
            $table->foreign("id_reserva")->references("id_reserva")->on("reserva")->onDelete("cascade");
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('pago');
    }
}
