<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoPago extends Model
{
    protected $table = 'estado_pago';
    protected $primaryKey = 'id_estado_pago';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id_estado_pago'
    ];

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'id_estado_pago');
    }
}
