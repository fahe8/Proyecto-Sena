<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cancha extends Model
{
    protected $table = 'cancha';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'precio',
        'NIT',
        'id_estado_cancha',
        'imagen',
        'tipo_cancha_id'
    ];

    protected $casts = [
        'imagen' => 'array'
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'NIT', 'NIT');
    }

    public function estadoCancha()
    {
        return $this->belongsTo(EstadoCancha::class, 'id_estado_cancha', 'id_estado_cancha');
    }

    public function tipoCancha()
    {
        return $this->belongsTo(TipoCancha::class);
    }

    // Relación con Reservas
    public function reservas()
    {
        return $this->hasMany(Reserva::class, 'cancha_id', 'id');
    }
}