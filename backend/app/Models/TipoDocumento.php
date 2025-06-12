<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoDocumento extends Model
{
    protected $table = 'tipo_documento';
    protected $primaryKey = 'tipo_documento_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'tipo_documento_id'
    ];

    public function propietarios()
    {
        return $this->hasMany(Propietario::class, 'tipo_documento_id');
    }
}