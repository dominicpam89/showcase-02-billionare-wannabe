import { FaPiggyBank } from "react-icons/fa";
import { motion, AnimationProps, HoverHandlers } from "framer-motion";
import { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const animateRun: AnimationProps["animate"] = {
	rotate: -15,
	y: 5,
	transition: {
		repeat: Infinity,
		repeatType: "reverse",
		type: "spring",
	},
};

const animateStop: AnimationProps["animate"] = {
	rotate: 0,
	y: 0,
};

const onHover: HoverHandlers["whileHover"] = {
	scale: 1.2,
	transition: {
		duration: 0.3,
		bounce: 1,
	},
};

export default function Logo() {
	const [animationRun, setAnimationRun] = useState(true);
	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<TooltipTrigger>
					<motion.div
						className="relative size-8 text-primary cursor-pointer"
						animate={animationRun ? animateRun : animateStop}
						whileHover={onHover}
						whileTap={{ scale: 1 }}
						onClick={() => setAnimationRun(!animationRun)}
					>
						<FaPiggyBank
							aria-label="mock-logo"
							className="w-full h-full"
						/>
					</motion.div>
				</TooltipTrigger>
				<TooltipContent className="p-4">
					{animationRun && (
						<p>Please click to make me stop bouncing! I'm tired!</p>
					)}
					{!animationRun && (
						<p>Torture me by making me bouncing endlessly!</p>
					)}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
