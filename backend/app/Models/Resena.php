<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resena extends Model
{
    protected $table = 'resena';
    protected $primaryKey = 'id_resena';

    protected $fillable = [
        'NIT',
        'comentario',
        'calificacion',
        'id_usuario'
    ];

    protected $casts = [
        'calificacion' => 'float'
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'NIT');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
