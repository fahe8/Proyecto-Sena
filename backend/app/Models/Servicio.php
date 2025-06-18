<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    protected $table = 'servicio';
    public $timestamps = false;

    protected $fillable = [
        'tipo'
    ];

    public function empresas()
    {
        return $this->belongsToMany(Empresa::class, 'empresa_servicio', 'servicio_id', 'NIT');
    }
}