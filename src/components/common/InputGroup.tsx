import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HTMLInputTypeAttribute, useState } from "react";
import {
	FieldValues,
	FieldError,
	Path,
	RegisterOptions,
	useFormContext,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface InputGroupProps<T extends FieldValues> {
	placeholder: string;
	inputType?: HTMLInputTypeAttribute;
	name: Path<T>;
	icon?: React.ReactNode;
	rules?: RegisterOptions<T, Path<T>>;
	label?: string;
	disabled?: boolean;
}

export default function InputGroup<T extends FieldValues>({
	placeholder,
	icon,
	name,
	rules,
	label,
	disabled = false,
	inputType = "text",
}: InputGroupProps<T>) {
	const {
		register,
		formState: { errors },
	} = useFormContext<T>();
	const [showPass, setShowPass] = useState(false);
	const togglePass = () => setShowPass(!showPass);
	return (
		<div aria-label="input-group" className="flex flex-col gap-2 w-full">
			{label && (
				<Label htmlFor={name} className="text-gray-500">
					{label}
				</Label>
			)}
			<div className="w-full flex gap-2 items-center">
				{icon && <span className="size-4 relative">{icon}</span>}
				{inputType !== "password" && (
					<Input
						id={name}
						type={inputType}
						placeholder={placeholder}
						{...register(name, rules)}
						disabled={disabled}
					/>
				)}
				{inputType == "password" && (
					<Input
						id={name}
						type={showPass ? "text" : "password"}
						placeholder={placeholder}
						{...register(name, rules)}
						disabled={disabled}
					/>
				)}
				{inputType == "password" && (
					<Button
						aria-label="password-toggle"
						onClick={togglePass}
						variant="outline"
						size="icon"
						type="button"
						disabled={disabled}
					>
						{showPass ? (
							<EyeOffIcon className="size-5" />
						) : (
							<EyeIcon className="size-5" />
						)}
					</Button>
				)}
			</div>
			{errors[name] && (
				<p className="text-sm text-destructive">
					{(errors[name] as FieldError)?.message}
				</p>
			)}
		</div>
	);
}
