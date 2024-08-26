import { Button } from "@/components/ui/button";
import { AuthSchema, registerSchema } from "@/lib/definition/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import InputGroup from "../common/InputGroup";
import { KeyIcon, MailIcon } from "lucide-react";
import FormRow from "../common/FormRow";
import { authIconClass } from "@/lib/utils";

export default function Register() {
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
		console.log(data);
	};
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onValid)}
				className="w-full flex flex-col gap-4"
			>
				<h1>Register Form</h1>
				<FormRow>
					<InputGroup<Schema> name="firstName" placeholder="First Name" />
					<InputGroup<Schema> name="lastName" placeholder="Last Name" />
				</FormRow>
				<InputGroup<Schema>
					icon={<MailIcon className={authIconClass} />}
					name="email"
					label="Email"
					placeholder="Email"
				/>
				<InputGroup<Schema>
					icon={<KeyIcon className={authIconClass} />}
					name="password"
					label="Password"
					placeholder="Password"
					inputType="password"
				/>
				<InputGroup<Schema>
					name="confirmationPassword"
					label="Confirmation Password"
					placeholder="Confirmation Password"
					inputType="password"
				/>
				<FormRow>
					<Button type="reset" variant="secondary" className="w-full">
						Reset
					</Button>
					<Button type="submit" className="w-full">
						Submit
					</Button>
				</FormRow>
			</form>
		</FormProvider>
	);
}
