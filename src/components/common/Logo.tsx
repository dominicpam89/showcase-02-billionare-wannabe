import { FaPiggyBank } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Logo() {
	return (
		<motion.div
			className="relative size-8 text-primary"
			animate={{
				rotate: -15,
				y: 5,
			}}
			transition={{
				repeat: Infinity,
				repeatType: "reverse",
				type: "spring",
			}}
		>
			<FaPiggyBank aria-label="mock-logo" className="w-full h-full" />
		</motion.div>
	);
}
