<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    protected $table = 'servicio';
    protected $primaryKey = 'id_servicio';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id_servicio',
        'tipo'
    ];

    public function empresas()
    {
        return $this->belongsToMany(Empresa::class, 'empresa_servicio', 'id_servicio', 'NIT');
    }
}
