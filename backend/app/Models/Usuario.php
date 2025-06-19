<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuario';

    protected $fillable = [
        'user_id',
        'nombre',
        'apellido',
        'telefono',
        'imagen',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con Reservas
    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'usuario_id', 'id');
    }

    // Relación con Reseñas
    public function resenas()
    {
        return $this->hasMany(Resena::class, 'usuario_id', 'id');
    }
}
