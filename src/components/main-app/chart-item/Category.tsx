import { Category } from "@/lib/context/select-asset.context.type";
import { useContextAssetSelect } from "@/lib/hooks/useAssetSelect";

export default function TableCategory() {
	const data = useContextAssetSelect().selected as Category;
	return (
		<>
			<h1>TableCategory</h1>
			<p>{data.name}</p>
		</>
	);
}
