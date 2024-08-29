import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
	monthlyChart: React.ReactNode;
	dailyChart: React.ReactNode;
	hourlyChart: React.ReactNode;
}
export default function BodyContent({
	monthlyChart,
	dailyChart,
	hourlyChart,
}: Props) {
	return (
		<Tabs aria-label="tabs" defaultValue="monthly" className="w-full">
			<TabsList
				aria-label="tab-list"
				className="w-full grid grid-cols-3 h-12 px-2 bg-emerald-200/80 text-gray-800 dark:bg-emerald-800/30 dark:text-gray-100"
			>
				<TabsTrigger value="monthly">Monthly</TabsTrigger>
				<TabsTrigger value="daily">Daily</TabsTrigger>
				<TabsTrigger value="hourly">Hourly</TabsTrigger>
			</TabsList>
			<TabsContent value="monthly">{monthlyChart}</TabsContent>
			<TabsContent value="daily">{dailyChart}</TabsContent>
			<TabsContent value="hourly">{hourlyChart}</TabsContent>
		</Tabs>
	);
}
