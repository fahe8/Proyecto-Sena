<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resena extends Model
{
    protected $table = 'resena';
    protected $primaryKey = 'id_resena';

    protected $fillable = [
        'id_reserva',
        'NIT', 
        'comentario',
        'calificacion',
        'id_usuario'
    ];

    public function reserva()
    {
        return $this->belongsTo(Reserva::class, 'id_reserva');
    }

    protected $casts = [
        'calificacion' => 'float'
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'NIT');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario', 'id_usuario');
    }
}
