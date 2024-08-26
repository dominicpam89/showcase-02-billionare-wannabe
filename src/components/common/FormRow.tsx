import { PropsWithChildren } from "react";

export default function FormRow({ children }: PropsWithChildren) {
	return (
		<div aria-label="form-row" className="w-full flex gap-3">
			{children}
		</div>
	);
}
