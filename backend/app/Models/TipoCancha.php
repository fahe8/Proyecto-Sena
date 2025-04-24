<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoCancha extends Model
{
    protected $table = 'tipo_cancha';
    protected $primaryKey = 'id_tipo_cancha';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id_tipo_cancha'
    ];

    public function canchas()
    {
        return $this->hasMany(Cancha::class, 'id_tipo_cancha');
    }

    public function tarifas()
    {
        return $this->hasMany(Tarifa::class, 'id_tipo_cancha');
    }
}
