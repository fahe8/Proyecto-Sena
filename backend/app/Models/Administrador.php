<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Administrador extends Model
{
    protected $table = 'administrador';
    protected $primaryKey = 'id_administrador';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id_administrador', 'email'];
}
