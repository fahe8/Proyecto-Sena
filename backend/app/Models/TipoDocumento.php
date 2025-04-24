<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoDocumento extends Model
{
    protected $table = 'tipoDocumento';
    protected $primaryKey = 'id_tipoDocumento';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id_tipoDocumento'
    ];

    public function propietarios()
    {
        return $this->hasMany(Propietario::class, 'id_tipoDocumento');
    }
}
