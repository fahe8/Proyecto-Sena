<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla propietarios
class CreatePropietariosTable extends Migration
{
    public function up()
    {
        Schema::create('propietario', function (Blueprint $table) {
            $table->id('id_propietario')->primary();
            $table->string('nombre');
            $table->string('apellido');
            $table->string('telefono');
            $table->string('email');
            $table->bigInteger('num_documento');
            $table->boolean('bloqueado');
            $table->string('id_tipoDocumento');
            $table->foreign('id_tipoDocumento')->references('id_tipoDocumento')->on('tipoDocumento');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('propietario');
    }
}
?>