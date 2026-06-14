<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use App\Models\Pengiriman;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use App\Http\Requests\Nota\StoreNotaRequest;

class NotaController extends Controller
{
    public function index()
    {
        return Inertia::render('nota/Index', [
            'pengiriman' => Pengiriman::with([
                'mobil',
                'lahan',
                'pekerja'
            ])
                ->where('status', 'menunggu_nota')
                ->latest()
                ->get()
        ]);
    }

    public function create(Pengiriman $pengiriman)
    {
        return Inertia::render('nota/Upload', [
            'pengiriman' => $pengiriman->load(['mobil', 'lahan', 'pekerja']),
        ]);
    }

    public function store(StoreNotaRequest $request, Pengiriman $pengiriman)
    {
        $fotoPath = $request->file('foto_nota')->store('nota', 'public');

        Nota::create([
            'pengiriman_id' => $pengiriman->id,
            'petugas_id'    => auth()->id(),
            'foto_nota'     => $fotoPath,
            'berat_ram_kg'  => $request->berat_ram_kg,
            'waktu_upload'  => now(),
        ]);

        // Hanya ubah status ke selesai, TIDAK overwrite berat pekerja
        $pengiriman->update(['status' => 'selesai']);

        return redirect()
            ->route('nota.index')
            ->with('success', 'Nota berhasil diupload');
    }
}
