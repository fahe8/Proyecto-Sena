<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resena extends Model
{
    protected $table = 'resena';
    protected $primaryKey = 'id_resena';

    protected $fillable = [
        'comentario',
        'calificacion',
        'usuario_id',
        'id_reserva',
        'NIT',
    ];

    protected $casts = [
        'calificacion' => 'integer'
    ];

    // Relación con Usuario (a través de users)
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    // Relación con Reserva
    public function reserva()
    {
        return $this->belongsTo(Reserva::class, 'id_reserva', 'id_reserva');
    }

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'NIT');
    }
}