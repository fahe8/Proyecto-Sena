<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla estado cancha
class CreateEstadoCanchaTable  extends Migration
{
    public function up()
    {
        Schema::create("estado_cancha", function (Blueprint $table) {
            $table->string("id_estado_cancha")->primary();
        });
    }

    public function down()
    {
        Schema::dropIfExists('estado_cancha');
    }
}

?>