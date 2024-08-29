interface Props {
	name: string;
	marketCapRank: number;
}
export default function HeaderTitle({ name, marketCapRank }: Props) {
	return (
		<div aria-label="title" className="min-h-1/5">
			<h2 className="text-xl font-bold">{name}</h2>
			<h5 className="text-primary font-medium">
				Market Cap Rank #{marketCapRank}
			</h5>
		</div>
	);
}
