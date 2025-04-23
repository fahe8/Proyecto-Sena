<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla usuario
class CreateUsuariosTable extends Migration
{
    public function up()
    {
        Schema::create('usuario', function (Blueprint $table) {
            $table->string('id_usuario')->primary();
            $table->string('nombre')->default('');
            $table->string('apellido')->default('');
            $table->string('telefono')->default('');
            $table->string('email');
            $table->boolean('bloqueado')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('usuario');
    }
}

?>