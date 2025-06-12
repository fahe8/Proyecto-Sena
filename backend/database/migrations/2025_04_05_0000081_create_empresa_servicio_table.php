<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpresaServicioTable extends Migration
{
    public function up()
    {
        Schema::create('empresa_servicio', function (Blueprint $table) {
            $table->unsignedBigInteger('NIT');
            $table->unsignedBigInteger('servicio_id');

            // Clave primaria compuesta
            $table->primary(['NIT', 'servicio_id']);

            // Relaciones foráneas
            $table->foreign('NIT')->references('NIT')->on('empresa')->onDelete('cascade');
            $table->foreign('servicio_id')->references('id')->on('servicio')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('empresa_servicio');
    }
}
