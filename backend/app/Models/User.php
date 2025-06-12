<?php

namespace App\Models;

use App\Notifications\CustomResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'email',
        'password',
        'roles',  // Changed from 'role' to 'roles' to store multiple roles
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'roles' => 'array',  // Cast roles as array
    ];

    public function admin()
    {
        return $this->hasOne(Administrador::class);
    }

    public function usuario()
    {
        return $this->hasOne(Usuario::class);
    }

    public function propietario()
    {
        return $this->hasOne(Propietario::class);
    }

    public function hasRole($role)
    {
        return in_array($role, $this->roles ?? []);
    }

    public function sendPasswordResetNotification($token)
{
    $this->notify(new CustomResetPassword($token));
}
}
