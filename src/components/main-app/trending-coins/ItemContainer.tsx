import { HTMLMotionProps, motion } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
	children: React.ReactNode;
	isLastIndex?: boolean;
	label?: string;
}
export default function ItemContainer({
	children,
	isLastIndex = false,
	label = "item-container",
	...props
}: Props) {
	const border = isLastIndex
		? "border-0"
		: "border border-l-0 border-r-0 border-t-0";
	return (
		<motion.div
			aria-label={label}
			className={`p-4 cursor-pointer border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 ${border}`}
			whileHover={{ x: 15 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}
