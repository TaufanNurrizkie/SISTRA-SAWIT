<?php

namespace App\Http\Controllers;

use App\Models\Lahan;
use App\Models\Mobil;
use App\Models\Pengiriman;
use Inertia\Inertia;

use App\Http\Requests\Pengiriman\StorePengirimanRequest;
use App\Http\Requests\Pengiriman\UpdatePengirimanRequest;

class PengirimanController extends Controller
{
    public function index()
    {
        return Inertia::render('pengiriman/Index', [
            'pengiriman' => Pengiriman::with([
                'mobil',
                'lahan',
                'pekerja',
                'nota'
            ])
                ->latest()
                ->get()
        ]);
    }

    public function show(Pengiriman $pengiriman)
    {
        $pengiriman->load(['mobil', 'lahan', 'pekerja', 'nota.petugas']);

        return Inertia::render('pengiriman/Show', [
            'pengiriman' => $pengiriman,
        ]);
    }

    public function create()
    {
        return Inertia::render('pengiriman/Create', [
            'mobils' => Mobil::orderBy('nama_mobil')->get(),
            'lahans' => Lahan::orderBy('nama_blok')->get(),
        ]);
    }

    public function store(StorePengirimanRequest $request)
    {
        Pengiriman::create([
            ...$request->validated(),
            'pekerja_id' => auth()->id(),
        ]);

        return redirect()
            ->route('pengiriman.index')
            ->with('success', 'Pengiriman berhasil dibuat');
    }

    public function edit(Pengiriman $pengiriman)
    {
        return Inertia::render('pengiriman/Edit', [
            'pengiriman' => $pengiriman,
            'mobils' => Mobil::orderBy('nama_mobil')->get(),
            'lahans' => Lahan::orderBy('nama_blok')->get(),
        ]);
    }

    public function update(
        UpdatePengirimanRequest $request,
        Pengiriman $pengiriman
    ) {

        $pengiriman->update(
            $request->validated()
        );

        return redirect()
            ->route('pengiriman.index')
            ->with('success', 'Pengiriman berhasil diperbarui');
    }

    public function destroy(Pengiriman $pengiriman)
    {
        $pengiriman->delete();

        return redirect()
            ->route('pengiriman.index')
            ->with('success', 'Pengiriman berhasil dihapus');
    }

    // Halaman input berat netto (khusus pekerja)
    public function timbang(Pengiriman $pengiriman)
    {
        // Hanya bisa input berat kalau status masih perjalanan
        if ($pengiriman->status !== 'perjalanan') {
            return redirect()->route('pengiriman.index')
                ->with('error', 'Berat sudah diinput atau pengiriman sudah selesai.');
        }

        return Inertia::render('pengiriman/Timbang', [
            'pengiriman' => $pengiriman->load(['mobil', 'lahan']),
        ]);
    }

    // Simpan berat netto dan ubah status ke menunggu_nota
    public function simpanBerat(Pengiriman $pengiriman)
    {
        request()->validate([
            'berat_netto_kg' => 'required|numeric|min:1|max:99999',
        ]);

        $pengiriman->update([
            'berat_netto_kg' => request('berat_netto_kg'),
            'status' => 'menunggu_nota',
        ]);

        return redirect()->route('pengiriman.index')
            ->with('success', 'Berat berhasil diinput. Status berubah ke Menunggu Nota.');
    }
}
