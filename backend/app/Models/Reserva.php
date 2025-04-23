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
        'id_usuario'
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

    public function pago()
    {
        return $this->hasOne(Pago::class, 'id_reserva');
    }
}
