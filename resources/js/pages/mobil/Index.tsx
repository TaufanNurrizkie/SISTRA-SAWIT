import { Head, Link, router } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusIcon, EditIcon, TrashIcon, TruckIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Mobil {
    id: number;
    plat_nomor: string;
    nama_mobil: string;
    foto_mobil?: string;
    kapasitas_kg: number;
}

export default function MobilIndex({ mobils }: { mobils: Mobil[] }) {
    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data mobil ini?')) {
            router.delete(`/mobil/${id}`);
        }
    };

    return (
        <AppHeaderLayout>
            <Head title="Manajemen Mobil" />
            <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Armada Mobil</h1>
                        <p className="text-sm text-muted-foreground">Kelola armada pengangkut TBS Anda.</p>
                    </div>
                    <Button asChild className="bg-[#65A30D] hover:bg-[#84CC16]">
                        <Link href="/mobil/create">
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Tambah Mobil
                        </Link>
                    </Button>
                </div>

                <Card className="rounded-[20px] shadow-sm">
                    <CardHeader>
                        <CardTitle>Daftar Mobil</CardTitle>
                        <CardDescription>Semua kendaraan operasional yang terdaftar di sistem.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kendaraan</TableHead>
                                    <TableHead>Plat Nomor</TableHead>
                                    <TableHead>Kapasitas (Kg)</TableHead>
                                    <TableHead className="w-[100px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mobils.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            Belum ada armada mobil.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    mobils.map((mobil) => (
                                        <TableRow key={mobil.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 rounded-md border">
                                                        <AvatarImage src={mobil.foto_mobil ? `/storage/${mobil.foto_mobil}` : ''} alt={mobil.nama_mobil} />
                                                        <AvatarFallback className="rounded-md bg-muted">
                                                            <TruckIcon className="h-5 w-5 text-muted-foreground" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{mobil.nama_mobil}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm dark:bg-gray-800">
                                                    {mobil.plat_nomor}
                                                </span>
                                            </TableCell>
                                            <TableCell>{mobil.kapasitas_kg.toLocaleString('id-ID')} kg</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700">
                                                        <Link href={`/mobil/${mobil.id}/edit`}>
                                                            <EditIcon className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 text-red-600 hover:text-red-700"
                                                        onClick={() => handleDelete(mobil.id)}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </Button>
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
