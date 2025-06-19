<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('wompi_credentials', function (Blueprint $table) {
            $table->text('integrity_secret')->nullable()->after('private_key'); // Secreto de integridad de Wompi (encriptado)
        });
    }

    public function down()
    {
        Schema::table('wompi_credentials', function (Blueprint $table) {
            $table->dropColumn('integrity_secret');
        });
    }
};