import { PropsWithChildren } from "react";

export default function BodyHeader({ children }: PropsWithChildren) {
	return (
		<div
			aria-label="main-header"
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
		>
			{children}
		</div>
	);
}
