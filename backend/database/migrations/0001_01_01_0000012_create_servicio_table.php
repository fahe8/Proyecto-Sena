<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        
        Schema::create('servicio', function (Blueprint $table) {
            $table->id();
            $table->string('tipo');
        });
    }

    public function down()
    {
        Schema::dropIfExists('servicio');
    }
};

