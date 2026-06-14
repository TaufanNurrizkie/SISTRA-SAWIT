import { Head, Link, router, usePage } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusIcon, EditIcon, TrashIcon, CameraIcon, ScaleIcon, EyeIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Pengiriman {
    id: number;
    waktu_berangkat: string;
    berat_netto_kg: number | null;
    status: string;
    mobil: { nama_mobil: string; plat_nomor: string };
    lahan: { nama_blok: string };
    pekerja: { name: string };
    nota: { id: number; foto_nota: string } | null;
}

export default function PengirimanIndex({ pengiriman }: { pengiriman: Pengiriman[] }) {
    const { auth } = usePage<any>().props;
    const isPekerja = auth.user.role === 'pekerja';
    const isPemilik = auth.user.role === 'pemilik';

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin membatalkan pengiriman ini?')) {
            router.delete(`/pengiriman/${id}`);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'perjalanan':    return <Badge className="rounded-full border-none shadow-none bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#DBEAFE] dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/20">Perjalanan</Badge>;
            case 'menunggu_nota': return <Badge className="rounded-full border-none shadow-none whitespace-nowrap bg-[#FEF3C7] text-[#B45309] hover:bg-[#FEF3C7] dark:bg-amber-500/20 dark:text-amber-400 dark:hover:bg-amber-500/20">Nota</Badge>;
            case 'selesai':       return <Badge className="rounded-full border-none shadow-none bg-[#DCFCE7] text-[#15803D] hover:bg-[#DCFCE7] dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/20">Selesai</Badge>;
            default:              return <Badge className="rounded-full border-none shadow-none">{status || '-'}</Badge>;
        }
    };

    return (
        <AppHeaderLayout>
            <Head title="Pengiriman TBS" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{isPekerja ? 'Riwayat Perjalanan' : 'Pengiriman TBS'}</h1>
                        <p className="text-sm text-muted-foreground">
                            {isPekerja ? 'Daftar perjalanan pengiriman Anda.' : 'Pantau pergerakan truk dan hasil panen ke RAM.'}
                        </p>
                    </div>
                    {isPekerja && (
                        <Button asChild className="bg-[#65A30D] hover:bg-[#84CC16]">
                            <Link href="/pengiriman/create">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Lapor Keberangkatan
                            </Link>
                        </Button>
                    )}
                </div>

                <Card className="rounded-[20px] shadow-sm">
                    <CardHeader>
                        <CardTitle>Daftar Pengiriman</CardTitle>
                        <CardDescription>Menampilkan log perjalanan armada.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Waktu</TableHead>
                                    <TableHead>Armada</TableHead>
                                    <TableHead>Asal Kebun</TableHead>
                                    {!isPekerja && <TableHead>Supir</TableHead>}
                                    <TableHead>Status</TableHead>
                                    <TableHead>Netto (Kg)</TableHead>
                                    <TableHead className="w-[100px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pengiriman.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={isPekerja ? 6 : 7} className="h-24 text-center">
                                            Belum ada data pengiriman.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    pengiriman.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="whitespace-nowrap">
                                                {new Date(item.waktu_berangkat).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{item.mobil?.nama_mobil}</div>
                                                <div className="text-xs text-muted-foreground">{item.mobil?.plat_nomor}</div>
                                            </TableCell>
                                            <TableCell>{item.lahan?.nama_blok}</TableCell>
                                            {!isPekerja && <TableCell>{item.pekerja?.name}</TableCell>}
                                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                                            <TableCell>
                                                {item.berat_netto_kg ? (
                                                    <span className="font-bold text-green-700">{item.berat_netto_kg.toLocaleString('id-ID')}</span>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {/* Tombol detail — semua role bisa lihat kalau sudah selesai */}
                                                    {item.status === 'selesai' && (
                                                        <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Lihat Detail">
                                                            <Link href={`/pengiriman/${item.id}`}>
                                                                <EyeIcon className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    {!isPekerja && (
                                                        <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700" title="Edit Pengiriman">
                                                            <Link href={`/pengiriman/${item.id}/edit`}>
                                                                <EditIcon className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    )}

                                                    {/* Tombol input berat untuk pekerja, hanya saat status perjalanan */}
                                                    {isPekerja && item.status === 'perjalanan' && (
                                                        <Button asChild variant="outline" size="sm" className="h-8 border-[#65A30D]/40 text-[#65A30D] hover:bg-[#DCFCE7] hover:text-[#4D7C0F]" title="Input Berat Timbangan">
                                                            <Link href={`/pengiriman/${item.id}/timbang`}>
                                                                <ScaleIcon className="mr-1 h-3 w-3" />
                                                                Input Berat
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    
                                                    {!isPemilik && !isPekerja && !item.nota && (
                                                        <Button asChild variant="outline" size="sm" className="h-8 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700" title="Upload Nota">
                                                            <Link href={`/nota/${item.id}/upload`}>
                                                                <CameraIcon className="mr-1 h-3 w-3" />
                                                                Nota
                                                            </Link>
                                                        </Button>
                                                    )}

                                                    {(isPemilik || isPekerja) && (
                                                        <Button 
                                                            variant="ghost" 
                                                            size="icon" 
                                                            className="h-8 w-8 text-red-600 hover:text-red-700"
                                                            onClick={() => handleDelete(item.id)}
                                                            disabled={item.status === 'selesai'}
                                                            title="Batalkan Pengiriman"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppHeaderLayout>
    );
}
