import { PropsWithChildren } from "react";

interface Props {
	children: React.ReactNode;
	twClasses?: string;
}
export default function FormRow({ children, twClasses = "" }: Props) {
	return (
		<div aria-label="form-row" className={`w-full flex gap-3 ${twClasses}`}>
			{children}
		</div>
	);
}
