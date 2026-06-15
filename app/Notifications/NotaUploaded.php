<?php

namespace App\Notifications;

use App\Models\Nota;
use Illuminate\Notifications\Notification;

class NotaUploaded extends Notification
{
    public function __construct(public Nota $nota) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        $plat = $this->nota->pengiriman->mobil->plat_nomor;

        return [
            'pengiriman_id' => $this->nota->pengiriman_id,
            'plat_nomor'    => $plat,
            'message'       => "Nota timbangan untuk {$plat} sudah diupload dan pengiriman selesai.",
            'icon'          => 'file-check',
        ];
    }
}
