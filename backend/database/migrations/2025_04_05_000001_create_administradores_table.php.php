<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdministradoresTable extends Migration
{
    public function up()
    {
        Schema::create('administrador', function (Blueprint $table) {
            $table->string('id_administrador')->primary();
            $table->string('email');
            // Removed timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('administrador');
    }
}

?>