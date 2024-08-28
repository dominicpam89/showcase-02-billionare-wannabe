import { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
	return (
		<div
			aria-label="container"
			className="flex flex-col w-full overflow-hidden"
		>
			{children}
		</div>
	);
}
