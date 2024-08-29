import { PropsWithChildren } from "react";

export default function HeaderText({ children }: PropsWithChildren) {
	return (
		<div
			aria-label="header-text"
			className="h-full flex flex-col gap-2 max-h-[200px]"
		>
			{children}
		</div>
	);
}
