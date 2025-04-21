<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $table = 'empresa';
    protected $primaryKey = 'NIT';
    public $incrementing = false;
    protected $keyType = 'integer';

    protected $fillable = [
        'NIT',
        'nombre',
        'direccion',
        'descripcion',
        'hora_apertura',
        'hora_cierre',
        'id_propietario',
        'id_estado_empresa',
        'imagenes'
    ];

    protected $casts = [
        'imagenes' => 'array'
    ];

    public function propietario()
    {
        return $this->belongsTo(Propietario::class, 'id_propietario');
    }

    public function estado()
    {
        return $this->belongsTo(EstadoEmpresa::class, 'id_estado_empresa');
    }

    public function servicios()
    {
        return $this->belongsToMany(Servicio::class, 'empresa_servicio', 'NIT', 'id_servicio');
    }

    public function canchas()
    {
        return $this->hasMany(Cancha::class, 'NIT');
    }

    public function resenas()
    {
        return $this->hasMany(Resena::class, 'NIT');
    }
}
