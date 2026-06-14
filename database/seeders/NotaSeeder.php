<?php

namespace Database\Seeders;

use App\Models\Nota;
use App\Models\Pengiriman;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class NotaSeeder extends Seeder
{
    public function run(): void
    {
        // Buat nota untuk semua pengiriman yang statusnya 'selesai'
        $selesai = Pengiriman::where('status', 'selesai')->get();

        foreach ($selesai as $pengiriman) {
            Nota::create([
                'pengiriman_id' => $pengiriman->id,
                'petugas_id'    => 4, // Petugas RAM (user ke-4)
                'foto_nota'     => 'nota/contoh.jpg',
                'waktu_upload'  => Carbon::parse($pengiriman->waktu_berangkat)->addHours(2),
            ]);
        }
    }
}
