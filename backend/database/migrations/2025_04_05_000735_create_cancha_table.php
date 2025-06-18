<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla cancha
class CreateCanchaTable extends Migration
{
    public function up()
    {
        Schema::create("cancha", function (Blueprint $table) {
            $table->id("id");
            $table->string("nombre");
            $table->integer("precio")->unsigned();
            $table->unsignedBigInteger('NIT');
            $table->string("id_estado_cancha")->default('disponible');
            $table->string('imagen');

            $table->foreign('id_estado_cancha')->references('id_estado_cancha')->on('estado_cancha');
            $table->foreign('NIT')->references('NIT')->on('empresa');
            $table->foreigniD('tipo_cancha_id')->constrained('tipo_cancha')->onDelete('cascade');     
        });
    }
    public function down()
    {
        Schema::dropIfExists('cancha');
    }
}


?>