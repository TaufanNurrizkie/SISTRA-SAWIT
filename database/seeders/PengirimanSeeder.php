<?php

namespace Database\Seeders;

use App\Models\Pengiriman;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PengirimanSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // Hari ini
            ['mobil_id' => 1, 'lahan_id' => 1, 'pekerja_id' => 2, 'berat_netto_kg' => 7500, 'status' => 'selesai',        'hari' => 0],
            ['mobil_id' => 2, 'lahan_id' => 2, 'pekerja_id' => 3, 'berat_netto_kg' => 9200, 'status' => 'selesai',        'hari' => 0],
            ['mobil_id' => 3, 'lahan_id' => 3, 'pekerja_id' => 2, 'berat_netto_kg' => null, 'status' => 'menunggu_nota',  'hari' => 0],
            ['mobil_id' => 1, 'lahan_id' => 4, 'pekerja_id' => 3, 'berat_netto_kg' => null, 'status' => 'perjalanan',     'hari' => 0],

            // Kemarin
            ['mobil_id' => 2, 'lahan_id' => 1, 'pekerja_id' => 2, 'berat_netto_kg' => 8800, 'status' => 'selesai',        'hari' => 1],
            ['mobil_id' => 3, 'lahan_id' => 2, 'pekerja_id' => 3, 'berat_netto_kg' => 7100, 'status' => 'selesai',        'hari' => 1],
            ['mobil_id' => 1, 'lahan_id' => 3, 'pekerja_id' => 2, 'berat_netto_kg' => null, 'status' => 'menunggu_nota',  'hari' => 1],

            // 2 hari lalu
            ['mobil_id' => 2, 'lahan_id' => 4, 'pekerja_id' => 3, 'berat_netto_kg' => 9500, 'status' => 'selesai',        'hari' => 2],
            ['mobil_id' => 3, 'lahan_id' => 1, 'pekerja_id' => 2, 'berat_netto_kg' => 6800, 'status' => 'selesai',        'hari' => 2],

            // 3 hari lalu
            ['mobil_id' => 1, 'lahan_id' => 2, 'pekerja_id' => 3, 'berat_netto_kg' => 8200, 'status' => 'selesai',        'hari' => 3],
            ['mobil_id' => 2, 'lahan_id' => 3, 'pekerja_id' => 2, 'berat_netto_kg' => 7600, 'status' => 'selesai',        'hari' => 3],

            // 5 hari lalu
            ['mobil_id' => 3, 'lahan_id' => 4, 'pekerja_id' => 3, 'berat_netto_kg' => 9000, 'status' => 'selesai',        'hari' => 5],
            ['mobil_id' => 1, 'lahan_id' => 1, 'pekerja_id' => 2, 'berat_netto_kg' => 7300, 'status' => 'selesai',        'hari' => 5],

            // 7 hari lalu
            ['mobil_id' => 2, 'lahan_id' => 2, 'pekerja_id' => 3, 'berat_netto_kg' => 8400, 'status' => 'selesai',        'hari' => 7],
            ['mobil_id' => 3, 'lahan_id' => 3, 'pekerja_id' => 2, 'berat_netto_kg' => 6900, 'status' => 'selesai',        'hari' => 7],
        ];

        foreach ($data as $row) {
            $waktu = Carbon::today()->subDays($row['hari'])->setTime(7 + rand(0, 8), rand(0, 59));
            Pengiriman::create([
                'mobil_id'       => $row['mobil_id'],
                'lahan_id'       => $row['lahan_id'],
                'pekerja_id'     => $row['pekerja_id'],
                'berat_netto_kg' => $row['berat_netto_kg'],
                'status'         => $row['status'],
                'waktu_berangkat' => $waktu,
                'created_at'     => $waktu,
                'updated_at'     => $waktu,
            ]);
        }
    }
}
