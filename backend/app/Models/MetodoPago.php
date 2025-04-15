<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetodoPago extends Model
{
    protected $table = 'metodo_pago';
    protected $primaryKey = 'id_metodo_pago';
    public $incrementing = false;
    protected $keyType = 'string';

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'id_metodo_pago');
    }
}
