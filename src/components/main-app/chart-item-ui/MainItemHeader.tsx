import { PropsWithChildren } from "react";

export default function MainItemHeader({ children }: PropsWithChildren) {
	return (
		<div aria-label="header" className="flex gap-6 lg:gap-9 h-[200px]">
			{children}
		</div>
	);
}
