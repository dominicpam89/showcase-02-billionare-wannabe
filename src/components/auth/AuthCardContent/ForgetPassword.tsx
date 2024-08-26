import InputGroup from "@/components/common/InputGroup";
import { Button } from "@/components/ui/button";
import {
	forgetPasswordSchema,
	ForgetPasswordSchema,
} from "@/lib/definition/auth";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

export interface Props {
	switchForm: (t: AuthFormType) => void;
}
export default function ForgetPassword({ switchForm }: Props) {
	const { onResetPassword, resetPasswordState } = useContextGlobal();
	const disabled = resetPasswordState.isPending;
	type Schema = ForgetPasswordSchema;
	const methods = useForm<Schema>({
		mode: "onBlur",
		reValidateMode: "onChange",
		resolver: zodResolver(forgetPasswordSchema),
		defaultValues: {
			email: "",
		},
	});
	const onValid: SubmitHandler<Schema> = (data) => {
		onResetPassword({ email: data.email });
	};
	useEffect(() => {
		if (resetPasswordState.data?.status) {
			switchForm("login");
		}
	}, [resetPasswordState]);
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onValid)}
				className="w-full flex flex-col gap-4"
			>
				<InputGroup<Schema> placeholder="Email" name="email" />
				<Button type="submit" className="w-full" disabled={disabled}>
					Reset my Password
				</Button>
			</form>
		</FormProvider>
	);
}
