<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = 'reserva';
    protected $primaryKey = 'id_reserva';

    // Agregar a los campos fillable:
    protected $fillable = [
        'fecha',
        'hora_inicio',
        'hora_final',
        'usuario_id',
        'cancha_id',
        'NIT',
        'wompi_transaction_id',
        'wompi_reference',
        'monto_pagado',
        'estado_pago'
    ];

    protected $casts = [
        'fecha' => 'date',
        // 'hora_inicio' => 'datetime',
        // 'hora_final' => 'datetime',
    ];

    // Relación con Usuario (a través de users)
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    // Relación con Cancha
    public function cancha()
    {
        return $this->belongsTo(Cancha::class, 'cancha_id');
    }

    // Relación con Empresa
    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'NIT', 'NIT');
    }

    // Relación con Reseñas
    public function resena()
    {
        return $this->hasMany(Resena::class, 'id_resena', 'id_resena');
    }
}