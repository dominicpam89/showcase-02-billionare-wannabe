import { Input } from "@/components/ui/input";
import {
	FieldError,
	FieldValues,
	Path,
	RegisterOptions,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputImagePreview from "./InputImagePreview";
import { useImageUpload } from "@/lib/hooks/useImageUpload";

interface Props<T extends FieldValues> {
	icon: React.ReactNode;
	name: Path<T>;
	rules: RegisterOptions<T, Path<T>>;
	buttonText: string;
	buttonVariant?:
		| "link"
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| null
		| undefined;
	disabled?: boolean;
	withPreview?: boolean;
}
export default function InputGroupFile<T extends FieldValues>({
	icon,
	rules,
	name,
	buttonText,
	buttonVariant = "secondary",
	disabled = false,
	withPreview = false,
}: Props<T>) {
	const { formControl, nativeControl } = useImageUpload<T>(name);
	const { register, errors, imageValue, onImageChange, trigger } = formControl;
	const { displayImage, displayImageLoading, inputImageRef } = nativeControl;

	return (
		<div aria-label="input-group" className="flex flex-col gap-2">
			<Input
				aria-label="real-input"
				{...register(name, rules)}
				ref={inputImageRef}
				className="hidden"
				type="file"
				onChange={onImageChange}
			/>
			<Button
				onClick={() => inputImageRef.current?.click()}
				onBlur={() => trigger(name)}
				variant={buttonVariant}
				type="button"
				disabled={disabled}
			>
				<span className="size-4 mr-2">{icon}</span>
				{imageValue ? imageValue.name : buttonText}
			</Button>
			{errors[name] && (
				<p
					aria-label="input-error-message"
					className="text-sm text-destructive text-center"
				>
					{(errors[name] as FieldError).message}
				</p>
			)}
			{withPreview && (
				<InputImagePreview
					displayImage={displayImage}
					displayImageLoading={displayImageLoading}
				/>
			)}
		</div>
	);
}
