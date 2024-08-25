import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<main className="w-full min-w-[320px] p-4 sm:p-8 md:p-12 flex flex-col gap-8 relative">
			{children}
		</main>
	);
}
