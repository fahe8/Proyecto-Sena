<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Migration para la tabla empresa_servicio
class CreateEmpresaServicioTable extends Migration
{
    public function up()
    {
        Schema::create('empresa_servicio', function (Blueprint $table) {
            $table->unsignedBigInteger('NIT');
            $table->string('id_servicio');
            
            // Clave primaria compuesta
            $table->primary(['NIT', 'id_servicio']);
    
            // Relaciones foráneas
            $table->foreign('NIT')->references('NIT')->on('empresa')->onDelete('cascade');
            $table->foreign('id_servicio')->references('id_servicio')->on('servicio')->onDelete('cascade');
    
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('empresa_servicio');
    }
}

?>