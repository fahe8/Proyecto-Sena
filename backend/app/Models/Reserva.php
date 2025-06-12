<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = 'reserva';
    protected $primaryKey = 'id_reserva';
    public $timestamps = false;

    protected $fillable = [
        'fecha',
        'hora_inicio',
        'hora_final',
        'id_cancha',
        'id_usuario',
        'NIT'
    ];

    protected $casts = [
        'fecha' => 'date',
        'hora_inicio' => 'datetime',
        'hora_final' => 'datetime'
    ];

    public function cancha()
    {
        return $this->belongsTo(Cancha::class, 'id_cancha');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'NIT');
    }

    public function pago()
    {
        return $this->hasOne(Pago::class, 'id_reserva');
    }
    
    public function resena()
    {
        // Cambiar la relación para usar id_reserva en lugar de NIT
        return $this->hasOne(Resena::class, 'id_reserva', 'id_reserva');
    }
}
