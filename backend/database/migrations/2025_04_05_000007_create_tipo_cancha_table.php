<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla tipo cancha
class CreateTipoCanchaTable extends Migration
{
    public function up()
    {
        Schema::create("tipo_cancha", function (Blueprint $table) {
            $table->id();
            $table->string("tipo");
        });
    }

    public function down()
    {
        Schema::dropIfExists('tipo_cancha');
    }
}

?>