<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CustomResetPassword extends Notification
{
    use Queueable;

    protected $token;

    /**
     * Crea una nueva instancia de notificación.
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Canales de entrega.
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Representación del correo.
     */
    public function toMail($notifiable)
    {
        $url = "http://localhost:5173/recuperar-contrasena/{$this->token}?email={$notifiable->getEmailForPasswordReset()}";


        return (new MailMessage)
            ->subject('Restablece tu contraseña')
            ->line('Recibiste este correo porque solicitaste restablecer tu contraseña.')
            ->action('Restablecer contraseña', $url)
            ->line('Este enlace expirará en 60 minutos.')
            ->line('Si no solicitaste este cambio, ignora este correo.');
    }

    /**
     * Representación en array (opcional).
     */
    public function toArray(object $notifiable): array
    {
        return [];
    }
}
