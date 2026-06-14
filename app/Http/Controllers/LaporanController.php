<?php

namespace App\Http\Controllers;

use App\Models\Lahan;
use App\Models\Pengiriman;
use Carbon\Carbon;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function index()
    {
        $dari   = request('dari')   ? Carbon::parse(request('dari'))->startOfDay()   : Carbon::now()->startOfMonth();
        $sampai = request('sampai') ? Carbon::parse(request('sampai'))->endOfDay()   : Carbon::now()->endOfDay();
        $lahanId = request('lahan_id');

        $query = Pengiriman::with(['mobil', 'lahan', 'pekerja', 'nota.petugas'])
            ->where('status', 'selesai')
            ->whereBetween('waktu_berangkat', [$dari, $sampai]);

        if ($lahanId) {
            $query->where('lahan_id', $lahanId);
        }

        $pengiriman = $query->latest('waktu_berangkat')->get();

        // Summary stats
        $totalRitase    = $pengiriman->count();
        $totalBeratKg   = $pengiriman->sum('berat_netto_kg');
        $totalBeratRam  = $pengiriman->sum(fn($p) => $p->nota?->berat_ram_kg ?? 0);
        $kasusSelisih   = $pengiriman->filter(function ($p) {
            $beratPekerja = $p->berat_netto_kg ?? 0;
            $beratRam     = $p->nota?->berat_ram_kg ?? 0;
            return $beratPekerja > 0 && $beratRam > 0 && $beratPekerja !== $beratRam;
        })->count();

        return Inertia::render('laporan/Index', [
            'pengiriman'   => $pengiriman->map(fn($p) => [
                'id'              => $p->id,
                'waktu'           => $p->waktu_berangkat->format('d/m/Y H:i'),
                'plat_nomor'      => $p->mobil?->plat_nomor ?? '-',
                'nama_mobil'      => $p->mobil?->nama_mobil ?? '-',
                'blok'            => $p->lahan?->nama_blok ?? '-',
                'supir'           => $p->pekerja?->name ?? '-',
                'berat_pekerja'   => $p->berat_netto_kg,
                'berat_ram'       => $p->nota?->berat_ram_kg,
                'selisih'         => ($p->nota?->berat_ram_kg && $p->berat_netto_kg)
                    ? $p->nota->berat_ram_kg - $p->berat_netto_kg
                    : null,
                'petugas'         => $p->nota?->petugas?->name ?? '-',
                'foto_nota'       => $p->nota?->foto_nota,
            ]),
            'summary' => [
                'totalRitase'  => $totalRitase,
                'totalBeratKg' => $totalBeratKg,
                'totalBeratRam'=> $totalBeratRam,
                'selisihTotal' => $totalBeratRam - $totalBeratKg,
                'kasusSelisih' => $kasusSelisih,
            ],
            'lahans' => Lahan::orderBy('nama_blok')->get(['id', 'nama_blok']),
            'filters' => [
                'dari'     => $dari->format('Y-m-d'),
                'sampai'   => $sampai->format('Y-m-d'),
                'lahan_id' => $lahanId,
            ],
        ]);
    }
}
