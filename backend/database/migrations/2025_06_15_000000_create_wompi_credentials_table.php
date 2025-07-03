<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('wompi_credentials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('propietario_id');
            $table->text('public_key'); // Llave pública de Wompi
            $table->text('private_key'); // Llave privada de Wompi (encriptada)
            $table->string('environment')->default('test'); // test o production
            $table->boolean('active')->default(true);
            $table->timestamp('configured_at')->nullable();
            $table->timestamps();

            $table->foreign('propietario_id')->references('id')->on('propietario')->onDelete('cascade');
            $table->unique('propietario_id'); // Un propietario solo puede tener una configuración activa
        });
    }

    public function down()
    {
        Schema::dropIfExists('wompi_credentials');
    }
};