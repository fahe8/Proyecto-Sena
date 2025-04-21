<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Propietario extends Model
{
    protected $table = 'propietario';
    protected $primaryKey = 'id_propietario';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'id_propietario',
        'nombre',
        'apellido',
        'telefono',
        'email',
        'num_documento',
        'bloqueado',
        'id_tipoDocumento'
    ];

    protected $casts = [
        'bloqueado' => 'boolean'
    ];

    public function tipoDocumento()
    {
        return $this->belongsTo(TipoDocumento::class, 'id_tipoDocumento');
    }

    public function empresas()
    {
        return $this->hasMany(Empresa::class, 'id_propietario');
    }
}
