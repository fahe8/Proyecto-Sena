<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $table = 'pago';
    protected $primaryKey = 'id_pago';
    public $timestamps = false;

    protected $fillable = [
        'monto',
        'fecha_pago',
        'id_metodo_pago',
        'id_estado_pago',
        'id_reserva'
    ];

    public function metodoPago()
    {
        return $this->belongsTo(MetodoPago::class, 'id_metodo_pago');
    }

    public function estadoPago()
    {
        return $this->belongsTo(EstadoPago::class, 'id_estado_pago');
    }

    public function reserva()
    {
        return $this->belongsTo(Reserva::class, 'id_reserva');
    }
}
