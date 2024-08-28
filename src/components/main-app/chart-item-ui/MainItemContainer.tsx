import { PropsWithChildren } from "react";

export default function MainItemContainer({ children }: PropsWithChildren) {
	return (
		<div aria-label="coin-detail" className="flex flex-col gap-6">
			{children}
		</div>
	);
}
