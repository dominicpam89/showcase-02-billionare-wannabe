import { PropsWithChildren } from "react";

export default function MainItemBody({ children }: PropsWithChildren) {
	return (
		<div aria-label="body" className="w-full flex flex-col gap-6">
			{children}
		</div>
	);
}
