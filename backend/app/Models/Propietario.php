<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Propietario extends Model
{
    protected $table = 'propietario';

    protected $fillable = [
        'user_id',
        'nombre',
        'apellido',
        'telefono',
        'imagen',
        'tipo_documento_id',
        'numero_documento'
    ];

    protected $casts = [
        'imagen' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tipoDocumento()
    {
        return $this->belongsTo(TipoDocumento::class, 'tipo_documento_id', 'tipo_documento_id');
    }

    public function empresas()
    {
        return $this->hasMany(Empresa::class, 'propietario_id', 'id');
    }

    // Nueva relación con Wompi
    public function wompiCredentials()
    {
        return $this->hasOne(WompiCredential::class);
    }

    // Verificar si tiene Wompi configurado
    public function tieneWompiConfigurado(): bool
    {
        return $this->wompiCredentials && $this->wompiCredentials->isConfigured();
    }
}
