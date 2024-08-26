import { Button } from "@/components/ui/button";
import { AuthSchema, registerSchema } from "@/lib/definition/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import InputGroup from "../../common/InputGroup";
import { KeyIcon, MailIcon } from "lucide-react";
import FormRow from "../../common/FormRow";
import { authIconClass } from "@/lib/utils";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";

export default function Register() {
	const {
		registerWithEmail,
		registerWithEmailState: { isPending },
	} = useContextGlobal();
	type Schema = AuthSchema<"register">;
	const methods = useForm<Schema>({
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: zodResolver(registerSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "example@email.com",
			password: "example",
			confirmationPassword: "example-test",
		},
	});
	const onValid: SubmitHandler<Schema> = (data) => {
		registerWithEmail({
			email: data.email,
			password: data.password,
			firstName: data.firstName,
			lastName: data.lastName || "",
		});
	};
	return (
		<FormProvider {...methods}>
			<form
				aria-label="form-register"
				onSubmit={methods.handleSubmit(onValid)}
				className="w-full flex flex-col gap-4"
			>
				<FormRow>
					<InputGroup<Schema>
						name="firstName"
						placeholder="First Name"
						disabled={isPending}
					/>
					<InputGroup<Schema>
						name="lastName"
						placeholder="Last Name"
						disabled={isPending}
					/>
				</FormRow>
				<InputGroup<Schema>
					icon={<MailIcon className={authIconClass} />}
					name="email"
					label="Email"
					placeholder="Email"
					disabled={isPending}
				/>
				<InputGroup<Schema>
					icon={<KeyIcon className={authIconClass} />}
					name="password"
					label="Password"
					placeholder="Password"
					inputType="password"
					disabled={isPending}
				/>
				<InputGroup<Schema>
					name="confirmationPassword"
					label="Confirmation Password"
					placeholder="Confirmation Password"
					inputType="password"
					disabled={isPending}
				/>
				<FormRow>
					<Button
						type="reset"
						variant="secondary"
						className="w-full"
						disabled={isPending}
					>
						Reset
					</Button>
					<Button type="submit" className="w-full" disabled={isPending}>
						Submit
					</Button>
				</FormRow>
			</form>
		</FormProvider>
	);
}
