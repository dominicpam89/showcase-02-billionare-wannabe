import { Button } from "@/components/ui/button";
import { CircleArrowUpIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollTop() {
	const ref = useRef<HTMLDivElement>(null);
	const screenHeight = typeof window !== "undefined" ? window.innerHeight : 0;
	const { scrollY } = useScroll();
	const opacity = useTransform(scrollY, [0, screenHeight], [0, 1]);
	const translateY = useTransform(scrollY, [0, screenHeight], [200, 0]);
	console.log(opacity);
	return (
		<motion.div
			style={{ opacity, translateY }}
			ref={ref}
			className="fixed bottom-10 right-10 z-[500]"
		>
			<Button
				size="icon"
				variant="destructive"
				onClick={() =>
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
				}
			>
				<CircleArrowUpIcon />
			</Button>
		</motion.div>
	);
}
