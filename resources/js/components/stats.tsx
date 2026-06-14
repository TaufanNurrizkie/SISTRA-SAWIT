import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Delta, DeltaIcon, DeltaValue } from "@/components/delta";
import { Trees, Truck, FileText, LayoutGrid } from "lucide-react";
import type { PemilikDashboardProps } from "@/pages/Pemilik/Dashboard";

export function DashboardStats({ stats }: { stats: PemilikDashboardProps['stats'] }) {
    const items = [
        {
            label: "Panen Hari Ini",
            value: `${(stats.beratHariIni / 1000).toFixed(1)} Ton`,
            delta: stats.deltaBerat,
            footnote: "vs kemarin",
            lowerIsBetter: false,
            icon: <Trees className="h-4 w-4 text-[#65A30D] dark:text-green-400" />,
            iconStyle: "bg-[#DCFCE7] dark:bg-green-500/20",
        },
        {
            label: "Pengiriman Hari Ini",
            value: `${stats.totalPengirimanHariIni} Truk`,
            delta: stats.deltaTruk,
            footnote: "vs kemarin",
            lowerIsBetter: false,
            icon: <Truck className="h-4 w-4 text-[#1D4ED8] dark:text-blue-400" />,
            iconStyle: "bg-[#DBEAFE] dark:bg-blue-500/20",
        },
        {
            label: "Menunggu Nota",
            value: `${stats.menungguNota} Antrean`,
            delta: stats.deltaMenunggu,
            footnote: "vs kemarin",
            lowerIsBetter: true,
            icon: <FileText className="h-4 w-4 text-[#B45309] dark:text-amber-400" />,
            iconStyle: "bg-[#FEF3C7] dark:bg-amber-500/20",
        },
        {
            label: "Total Lahan Aktif",
            value: `${stats.totalLahan} Blok`,
            delta: 0,
            footnote: `${stats.totalMobil} armada terdaftar`,
            lowerIsBetter: false,
            icon: <LayoutGrid className="h-4 w-4 text-[#7C3AED] dark:text-violet-400" />,
            iconStyle: "bg-[#EDE9FE] dark:bg-violet-500/20",
        },
    ];

    return (
        <>
            {items.map((s) => (
                <Card
                    className="shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border-border rounded-[20px] bg-card"
                    key={s.label}
                >
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="font-medium text-sm text-muted-foreground">
                            {s.label}
                        </CardTitle>
                        <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", s.iconStyle)}>
                            {s.icon}
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <p className="font-bold text-2xl tabular-nums text-card-foreground">{s.value}</p>
                        <div className="flex items-center gap-1 text-xs">
                            {s.delta !== 0 ? (
                                <>
                                    <Delta value={s.delta}>
                                        <DeltaIcon />
                                        <DeltaValue />
                                    </Delta>
                                    <span className="text-muted-foreground">{s.footnote}</span>
                                </>
                            ) : (
                                <span className="text-muted-foreground">{s.footnote}</span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
