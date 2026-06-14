<?php

namespace App\Http\Controllers;

use App\Models\Lahan;
use App\Models\Mobil;
use App\Models\Nota;
use App\Models\Pengiriman;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // Dashboard Pemilik
    public function pemilik()
    {
        $today = Carbon::today();

        $totalPengirimanHariIni = Pengiriman::whereDate('waktu_berangkat', $today)->count();
        $totalPengirimanKemarin = Pengiriman::whereDate('waktu_berangkat', $today->copy()->subDay())->count();
        $deltatruk = $totalPengirimanKemarin > 0
            ? (($totalPengirimanHariIni - $totalPengirimanKemarin) / $totalPengirimanKemarin) * 100
            : 0;

        $beratHariIni = Pengiriman::whereDate('waktu_berangkat', $today)
            ->whereNotNull('berat_netto_kg')->sum('berat_netto_kg');
        $beratKemarin = Pengiriman::whereDate('waktu_berangkat', $today->copy()->subDay())
            ->whereNotNull('berat_netto_kg')->sum('berat_netto_kg');
        $deltaBerat = $beratKemarin > 0
            ? (($beratHariIni - $beratKemarin) / $beratKemarin) * 100
            : 0;

        $menungguNota = Pengiriman::where('status', 'menunggu_nota')->count();
        $menungguNotaKemarin = Pengiriman::where('status', 'menunggu_nota')
            ->whereDate('updated_at', $today->copy()->subDay())->count();
        $deltaMenunggu = $menungguNotaKemarin > 0
            ? (($menungguNota - $menungguNotaKemarin) / $menungguNotaKemarin) * 100
            : 0;

        // Pie chart — distribusi status semua pengiriman
        $totalAll = Pengiriman::count() ?: 1;
        $pieChart = [
            ['status' => 'selesai',       'label' => 'Selesai',           'jumlah' => Pengiriman::where('status', 'selesai')->count()],
            ['status' => 'menunggu_nota', 'label' => 'Menunggu Nota',     'jumlah' => Pengiriman::where('status', 'menunggu_nota')->count()],
            ['status' => 'perjalanan',    'label' => 'Dalam Perjalanan',  'jumlah' => Pengiriman::where('status', 'perjalanan')->count()],
        ];

        // Produksi harian 30 hari terakhir untuk chart
        $produksiChart = collect(range(29, 0))->map(function ($daysAgo) {
            $date = Carbon::today()->subDays($daysAgo);
            $totalKg = Pengiriman::whereDate('waktu_berangkat', $date)
                ->whereNotNull('berat_netto_kg')->sum('berat_netto_kg');
            return [
                'date' => $date->format('Y-m-d'),
                'ton' => round($totalKg / 1000, 2),
            ];
        })->values();

        // Pengiriman terbaru
        $pengirimanTerbaru = Pengiriman::with(['mobil', 'lahan', 'pekerja'])
            ->latest('waktu_berangkat')
            ->take(5)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'noTruk' => $p->mobil?->plat_nomor ?? '-',
                'supir' => $p->pekerja?->name ?? '-',
                'blok' => $p->lahan?->nama_blok ?? '-',
                'waktu' => $p->waktu_berangkat?->diffForHumans() ?? '-',
                'status' => $p->status,
            ]);

        return Inertia::render('Pemilik/Dashboard', [
            'stats' => [
                'beratHariIni'             => $beratHariIni,
                'deltaBerat'               => round($deltaBerat, 1),
                'totalPengirimanHariIni'   => $totalPengirimanHariIni,
                'deltaTruk'                => round($deltatruk, 1),
                'menungguNota'             => $menungguNota,
                'deltaMenunggu'            => round($deltaMenunggu, 1),
                'totalMobil'               => Mobil::count(),
                'totalLahan'               => Lahan::count(),
            ],
            'statusChart'        => [],
            'pieChart'           => $pieChart,
            'produksiChart'      => $produksiChart,
            'pengirimanTerbaru'  => $pengirimanTerbaru,
        ]);
    }

    // Dashboard Pekerja (supir)
    public function pekerja()
    {
        $user = Auth::user();
        $today = Carbon::today();

        $pengirimanAktif = Pengiriman::with(['mobil', 'lahan'])
            ->where('pekerja_id', $user->id)
            ->whereIn('status', ['perjalanan', 'menunggu_nota'])
            ->latest('waktu_berangkat')
            ->first();

        $ritaseHariIni = Pengiriman::where('pekerja_id', $user->id)
            ->whereDate('waktu_berangkat', $today)->count();

        $totalBeratHariIni = Pengiriman::where('pekerja_id', $user->id)
            ->whereDate('waktu_berangkat', $today)
            ->whereNotNull('berat_netto_kg')->sum('berat_netto_kg');

        $riwayat = Pengiriman::with(['mobil', 'lahan'])
            ->where('pekerja_id', $user->id)
            ->latest('waktu_berangkat')
            ->take(5)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'waktu' => $p->waktu_berangkat?->diffForHumans() ?? '-',
                'noTruk' => $p->mobil?->plat_nomor ?? '-',
                'blok' => $p->lahan?->nama_blok ?? '-',
                'status' => $p->status,
            ]);

        // Status chart 10 hari terakhir (milik pekerja ini)
        $statusChart = collect(range(9, 0))->map(function ($daysAgo) use ($user) {
            $date = Carbon::today()->subDays($daysAgo);
            return [
                'day'     => $date->format('d M'),
                'selesai' => Pengiriman::where('pekerja_id', $user->id)
                    ->where('status', 'selesai')
                    ->whereDate('waktu_berangkat', $date)->count(),
                'nota'    => Pengiriman::where('pekerja_id', $user->id)
                    ->where('status', 'menunggu_nota')
                    ->whereDate('waktu_berangkat', $date)->count(),
                'jalan'   => Pengiriman::where('pekerja_id', $user->id)
                    ->where('status', 'perjalanan')
                    ->whereDate('waktu_berangkat', $date)->count(),
            ];
        })->values();

        return Inertia::render('Pekerja/Dashboard', [
            'pengirimanAktif' => $pengirimanAktif ? [
                'id'     => $pengirimanAktif->id,
                'noTruk' => $pengirimanAktif->mobil?->plat_nomor ?? '-',
                'blok'   => $pengirimanAktif->lahan?->nama_blok ?? '-',
                'status' => $pengirimanAktif->status,
                'waktu'  => $pengirimanAktif->waktu_berangkat?->diffForHumans() ?? '-',
                'berat'  => $pengirimanAktif->berat_netto_kg,
            ] : null,
            'ritaseHariIni' => $ritaseHariIni,
            'totalBeratHariIni' => $totalBeratHariIni,
            'riwayat' => $riwayat,
            'statusChart' => $statusChart,
        ]);
    }

    // Dashboard Petugas RAM
    public function ram()
    {
        $user = Auth::user();
        $today = Carbon::today();

        $menungguNota = Pengiriman::with(['mobil'])
            ->where('status', 'menunggu_nota')
            ->latest('updated_at')
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'noTruk' => $p->mobil?->plat_nomor ?? '-',
                'waktu' => $p->updated_at?->diffForHumans() ?? '-',
            ]);

        $notaHariIni = Nota::where('petugas_id', $user->id)
            ->whereDate('waktu_upload', $today)->count();

        // Queue chart 7 hari terakhir
        $queueChart = collect(range(6, 0))->map(function ($daysAgo) {
            $date = Carbon::today()->subDays($daysAgo);
            $count = Pengiriman::whereDate('updated_at', $date)
                ->where('status', 'menunggu_nota')->count();
            return [
                'day' => $date->format('D'),
                'jumlah' => $count,
            ];
        })->values();

        return Inertia::render('PetugasRam/Dashboard', [
            'menungguNota' => $menungguNota,
            'notaHariIni' => $notaHariIni,
            'totalMenunggu' => $menungguNota->count(),
            'queueChart' => $queueChart,
        ]);
    }
}
