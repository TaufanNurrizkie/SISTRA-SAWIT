import type { ReactNode } from "react";
import { LayoutGridIcon, TruckIcon, UsersIcon, SproutIcon, HelpCircleIcon, ActivityIcon, FileTextIcon, HistoryIcon, BarChart3Icon, ListChecksIcon } from "lucide-react";

export type SidebarNavItem = {
	title: string;
	path?: string;
	icon?: ReactNode;
	isActive?: boolean;
	subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
	label?: string;
	items: SidebarNavItem[];
};

const pemilikNavGroups: SidebarNavGroup[] = [
	{
		label: "Utama",
		items: [
			{
				title: "Dashboard",
				path: "/dashboard-pemilik",
				icon: <LayoutGridIcon />,
				isActive: true,
			},
		],
	},

	{
		label: "Logistik",
		items: [
			{
				title: "Pengiriman TBS",
				path: "/pengiriman",
				icon: <TruckIcon />,
			},
			{
				title: "Data Mobil",
				path: "/mobil",
				icon: <UsersIcon />,
			},
			{
				title: "Blok Kebun",
				path: "/lahan",
				icon: <SproutIcon />,
			},
		],
	},
	{
		label: "Analitik",
		items: [
			{
				title: "Laporan Panen",
				path: "/laporan",
				icon: <BarChart3Icon />,
			},
		],
	},
];

const pekerjaNavGroups: SidebarNavGroup[] = [
	{
		label: "Utama",
		items: [
			{
				title: "Dashboard",
				path: "/dashboard-pekerja",
				icon: <LayoutGridIcon />,
				isActive: true,
			},
		],
	},
	{
		label: "Tugas",
		items: [
			{
				title: "Lapor Keberangkatan",
				path: "/pengiriman/create",
				icon: <TruckIcon />,
			},
			{
				title: "Riwayat Perjalanan",
				path: "/pengiriman",
				icon: <HistoryIcon />,
			},
		],
	},
];

const petugasRamNavGroups: SidebarNavGroup[] = [
	{
		label: "Utama",
		items: [
			{
				title: "Dashboard",
				path: "/dashboard-ram",
				icon: <LayoutGridIcon />,
				isActive: true,
			},
		],
	},
	{
		label: "Operasional",
		items: [
			{
				title: "Antrean Truk",
				path: "/pengiriman",
				icon: <ListChecksIcon />,
			},
			{
				title: "Upload Foto Nota",
				path: "/nota",
				icon: <FileTextIcon />,
			},
		],
	},
];

export const footerNavLinks: SidebarNavItem[] = [
	{
		title: "Pusat Bantuan",
		path: "#/help",
		icon: <HelpCircleIcon />,
	},
	{
		title: "Status Sistem",
		path: "#/status",
		icon: <ActivityIcon />,
	},
];

export function getNavGroups(role?: string): SidebarNavGroup[] {
	switch (role) {
		case 'pemilik':
			return pemilikNavGroups;
		case 'pekerja':
			return pekerjaNavGroups;
		case 'petugas_ram':
			return petugasRamNavGroups;
		default:
			return pemilikNavGroups; // Fallback
	}
}

export function getNavLinks(role?: string): SidebarNavItem[] {
	const groups = getNavGroups(role);
	return [
		...groups.flatMap((group) =>
			group.items.flatMap((item) =>
				item.subItems?.length ? [item, ...item.subItems] : [item]
			)
		),
		...footerNavLinks,
	];
}
