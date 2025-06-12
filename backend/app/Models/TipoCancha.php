<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoCancha extends Model
{
    protected $table = 'tipo_cancha';
    public $timestamps = false;

    protected $fillable = [
        'tipo'
    ];

    public function canchas()
    {
        return $this->hasMany(Cancha::class);
    }
}