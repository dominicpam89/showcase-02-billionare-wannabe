import { Button } from "@/components/ui/button";
import { AuthSchema, loginSchema } from "@/lib/definition/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import InputGroup from "../../common/InputGroup";
import { DiscIcon, KeyIcon } from "lucide-react";
import FormRow from "../../common/FormRow";
import { authIconClass } from "@/lib/utils";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";

export default function Login() {
	const { loginWithEmail, loginWithEmailState } = useContextGlobal();
	const disabled = loginWithEmailState.isPending;
	type Schema = AuthSchema<"login">;
	const methods = useForm<Schema>({
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "example@email.com",
			password: "example",
		},
	});
	const onValid: SubmitHandler<Schema> = (data) => {
		loginWithEmail(data);
	};
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onValid)}
				className="w-full flex flex-col gap-4"
			>
				<InputGroup<Schema>
					icon={<DiscIcon className={authIconClass} />}
					name="email"
					label="Email"
					placeholder="Email"
					disabled={disabled}
				/>
				<InputGroup<Schema>
					icon={<KeyIcon className={authIconClass} />}
					name="password"
					label="Password"
					placeholder="Password"
					inputType="password"
					disabled={disabled}
				/>
				<FormRow>
					<Button
						type="reset"
						variant="secondary"
						className="w-full"
						disabled={disabled}
					>
						Reset
					</Button>
					<Button type="submit" className="w-full" disabled={disabled}>
						Submit
					</Button>
				</FormRow>
			</form>
		</FormProvider>
	);
}
