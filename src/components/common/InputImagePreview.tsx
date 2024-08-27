interface Props {
	displayImageLoading: boolean;
	displayImage: ArrayBuffer | string | null;
}
export default function InputImagePreview({
	displayImage,
	displayImageLoading,
}: Props) {
	if (displayImageLoading) {
		return <p>Image loading...</p>;
	}
	if (!displayImageLoading && displayImage) {
		return (
			<div className="relative mx-auto w-[120px] h-[120px]">
				<img
					src={displayImage as string}
					alt="image uploaded by user"
					className="object-contain"
				/>
			</div>
		);
	} else return null;
}
