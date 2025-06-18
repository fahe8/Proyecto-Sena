<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class WompiCredential extends Model
{
    use HasFactory;

    protected $fillable = [
        'propietario_id',
        'public_key',
        'private_key',
        'integrity_secret',
        'environment',
        'active',
        'configured_at'
    ];

    protected $casts = [
        'active' => 'boolean',
        'configured_at' => 'datetime'
    ];

    // Encriptar la llave privada antes de guardar
    public function setPrivateKeyAttribute($value)
    {
        $this->attributes['private_key'] = Crypt::encryptString($value);
    }

    // Desencriptar la llave privada al obtener
    public function getPrivateKeyAttribute($value)
    {
        return Crypt::decryptString($value);
    }

    // Encriptar el secreto de integridad antes de guardar
    public function setIntegritySecretAttribute($value)
    {
        $this->attributes['integrity_secret'] = Crypt::encryptString($value);
    }

    // Desencriptar el secreto de integridad al obtener
    public function getIntegritySecretAttribute($value)
    {
        return $value ? Crypt::decryptString($value) : null;
    }

    // Relación con Propietario
    public function propietario()
    {
        return $this->belongsTo(Propietario::class);
    }

    // Verificar si está configurado
    public function isConfigured()
    {
        return !empty($this->public_key) && !empty($this->private_key) && !empty($this->integrity_secret) && $this->active;
    }
}