import { ApiResponseTrendingCoins } from "@/lib/definition/trending-coins.type";

interface Props {
	data: ApiResponseTrendingCoins["categories"];
}
export default function Categories({ data }: Props) {
	console.log("from Categories component", data);
	return <>TrendingCategories</>;
}
