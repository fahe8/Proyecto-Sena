<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoEmpresa extends Model
{
    protected $table = 'estado_empresa';
    protected $primaryKey = 'id_estado_empresa';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id_estado_empresa'
    ];

    public function empresas()
    {
        return $this->hasMany(Empresa::class, 'id_estado_empresa');
    }
}
