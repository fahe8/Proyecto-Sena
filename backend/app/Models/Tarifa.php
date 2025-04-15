<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarifa extends Model
{
    protected $table = 'tarifas';
    protected $primaryKey = 'id_tarifa';

    protected $fillable = [
        'NIT',
        'id_tipo_cancha',
        'precio'
    ];

    protected $casts = [
        'precio' => 'float'
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'NIT');
    }

    public function tipoCancha()
    {
        return $this->belongsTo(TipoCancha::class, 'id_tipo_cancha');
    }
}
