import { PropsWithChildren } from "react";

export default function MainItemHeader({ children }: PropsWithChildren) {
	return (
		<div aria-label="header" className="flex gap-5 lg:gap-8 h-[200px]">
			{children}
		</div>
	);
}
