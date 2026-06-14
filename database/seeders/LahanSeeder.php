<?php

namespace Database\Seeders;

use App\Models\Lahan;
use Illuminate\Database\Seeder;

class LahanSeeder extends Seeder
{
    public function run(): void
    {
        $lahans = [
            ['nama_blok' => 'Blok A1', 'luas_ha' => 5.5],
            ['nama_blok' => 'Blok A2', 'luas_ha' => 4.8],
            ['nama_blok' => 'Blok B1', 'luas_ha' => 8.2],
            ['nama_blok' => 'Blok C3', 'luas_ha' => 6.0],
        ];

        foreach ($lahans as $l) {
            Lahan::create($l);
        }
    }
}
