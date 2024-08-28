import { motion } from "framer-motion";

interface Props {
	children: React.ReactNode;
	isLastIndex?: boolean;
	label?: string;
}
export default function ItemContainer({
	children,
	isLastIndex = false,
	label = "item-container",
}: Props) {
	const border = isLastIndex
		? "border-0"
		: "border border-l-0 border-r-0 border-t-0";
	return (
		<motion.div
			aria-label={label}
			className={`p-4 cursor-pointer border-gray-200 ${border}`}
			whileHover={{ x: 15 }}
		>
			{children}
		</motion.div>
	);
}
