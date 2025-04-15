<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla reservas
class CreateReservaTable extends Migration
{
    public function up()
    {
        Schema::create("reserva", function (Blueprint $table) {
            $table->id("id_reserva")->primary();
            $table->date("fecha");
            $table->time("hora_inicio");
            $table->time("hora_final");
            $table->string("id_usuario");
            $table->foreignId("id_cancha")->constrained("cancha", "id_cancha");
            $table->foreign("id_usuario")->references("id_usuario")->on("usuario");
        });
    }

    public function down()
    {
        Schema::dropIfExists('reserva');
    }
}

?>