import { QualityBreakdownChart } from "@/components/channel-breakdown-chart";
import { ProductionVolumeChart } from "@/components/conversation-volume-chart";
import { DeliveryStatusChart } from "@/components/csat-responses-chart";
import { TruckQueueChart } from "@/components/first-reply-time-chart";
import { RecentDeliveries } from "@/components/recent-conversations";
import { DashboardStats } from "@/components/stats";
import { FactoryActivity } from "@/components/support-activity";

export function Dashboard() {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<DashboardStats />
			<ProductionVolumeChart />
			<QualityBreakdownChart />
			<DeliveryStatusChart className="md:col-span-2 lg:col-span-2" />
			<TruckQueueChart className="md:col-span-2 lg:col-span-2" />
			<RecentDeliveries />
			<FactoryActivity />
		</div>
	);
}
