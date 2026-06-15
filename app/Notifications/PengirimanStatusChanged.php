<?php

namespace App\Notifications;

use App\Models\Pengiriman;
use Illuminate\Notifications\Notification;

class PengirimanStatusChanged extends Notification
{
    public function __construct(public Pengiriman $pengiriman) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        $statusLabel = match ($this->pengiriman->status) {
            'menunggu_nota' => 'Menunggu Nota',
            'selesai'       => 'Selesai',
            default         => $this->pengiriman->status,
        };

        return [
            'pengiriman_id' => $this->pengiriman->id,
            'plat_nomor'    => $this->pengiriman->mobil->plat_nomor,
            'status'        => $this->pengiriman->status,
            'message'       => "Pengiriman {$this->pengiriman->mobil->plat_nomor} sekarang berstatus {$statusLabel}.",
            'icon'          => 'truck',
        ];
    }
}
