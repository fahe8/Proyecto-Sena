<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Administrador extends Model
{
    protected $table = 'administrador';

    protected $fillable = [
        'user_id',
        'nombre',
        'apellido',
        'telefono'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
