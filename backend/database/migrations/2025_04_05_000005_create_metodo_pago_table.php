<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla metodo de pago
class CreateMetodoPagoTable extends Migration
{
    public function up()
    {
        Schema::create("metodo_pago", function (Blueprint $table) {
            $table->string("id_metodo_pago")->primary();
        });
    }

    public function down()
    {
        Schema::dropIfExists('metodo_pago');
    }
}
?>