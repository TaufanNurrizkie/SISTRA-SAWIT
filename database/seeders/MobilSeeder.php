<?php

namespace Database\Seeders;

use App\Models\Mobil;
use Illuminate\Database\Seeder;

class MobilSeeder extends Seeder
{
    public function run(): void
    {
        $mobils = [
            ['plat_nomor' => 'BM 1234 XY', 'nama_mobil' => 'Mitsubishi Colt Diesel', 'kapasitas_kg' => 8000],
            ['plat_nomor' => 'BM 5678 AB', 'nama_mobil' => 'Hino Dutro 130 HD', 'kapasitas_kg' => 10000],
            ['plat_nomor' => 'BM 8899 ZA', 'nama_mobil' => 'Isuzu Elf NMR', 'kapasitas_kg' => 7500],
        ];

        foreach ($mobils as $m) {
            Mobil::create(array_merge($m, ['foto_mobil' => null]));
        }
    }
}
