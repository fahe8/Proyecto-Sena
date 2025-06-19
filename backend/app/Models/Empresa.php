<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $table = 'empresa';
    protected $primaryKey = 'NIT';
    public $incrementing = false;

    protected $fillable = [
        'NIT',
        'nombre',
        'direccion',
        'descripcion',
        'logo',
        'imagenes',
        'hora_apertura',
        'hora_cierre',
        'id_estado_empresa',
        'propietario_id'
    ];

    protected $casts = [
        'logo' => 'array',
        'imagenes' => 'array',
    ];

    public function propietario()
    {
        return $this->belongsTo(Propietario::class);
    }

    public function estadoEmpresa()
    {
        return $this->belongsTo(EstadoEmpresa::class, 'id_estado_empresa', 'id_estado_empresa');
    }

    public function servicios()
    {
        return $this->belongsToMany(Servicio::class, 'empresa_servicio', 'NIT', 'servicio_id');
    }

    public function canchas()
    {
        return $this->hasMany(Cancha::class, 'NIT', 'NIT');
    }

    // Relación con Reservas
    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'NIT', 'NIT');
    }

    // Relación con Reseñas
    public function resenas()
    {
        return $this->hasMany(Resena::class, 'NIT', 'NIT');
    }
}
