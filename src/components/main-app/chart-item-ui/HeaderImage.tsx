import { ImgHTMLAttributes } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {}
export default function HeaderImage({ ...props }: Props) {
	return (
		<img aria-label="header-image" className="h-full w-full" {...props} />
	);
}
