<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla estado de pago
class CreateEstadoPagoTable extends Migration
{
    public function up()
    {
        Schema::create("estado_pago", function (Blueprint $table) {
            $table->string("id_estado_pago")->primary();
        });
    }

    public function down()
    {
        Schema::dropIfExists('estado_pago');
    }
}

?>