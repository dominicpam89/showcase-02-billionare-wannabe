import { PropsWithChildren } from "react";

export default function MainItemHeader({ children }: PropsWithChildren) {
	return (
		<div
			aria-label="header"
			className="flex flex-col gap-6 lg:flex-row lg:gap-9 min-h-[200px]"
		>
			{children}
		</div>
	);
}
