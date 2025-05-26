<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cancha extends Model
{
    public $timestamps = false; 
    protected $table = 'cancha';
    protected $primaryKey = 'id_cancha';
    protected $fillable = [
        'nombre',
        'precio',
        'NIT',
        'id_estado_cancha',
        'id_tipo_cancha',
        'imagen'
    ];
    
    protected $casts = [
        'precio' => 'integer'
    ];
    

    public function estadoCancha()
    {
        return $this->belongsTo(EstadoCancha::class, 'id_estado_cancha');
    }

    public function estado()
    {
        return $this->estadoCancha();
    }
    
    public function tipoCancha()
    {
        return $this->belongsTo(TipoCancha::class, 'id_tipo_cancha');
    }

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'NIT');
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'id_cancha');
    }
}
