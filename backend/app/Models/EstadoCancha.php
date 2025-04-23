<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoCancha extends Model
{
    
    protected $table = 'estado_cancha';
    protected $primaryKey = 'id_estado_cancha';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id_estado_cancha'
    ];

    public function canchas()
    {
        return $this->hasMany(Cancha::class, 'id_estado_cancha');
    }
}

