import { FormUpdateProfileSchema } from "@/lib/definition/profile";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

export default function FormUpdateProfile() {
	const methods = useForm<FormUpdateProfileSchema>({
		mode: "onBlur",
		reValidateMode: "onChange",
	});
	const onValid: SubmitHandler<FormUpdateProfileSchema> = (data) => {
		console.log(data);
	};
	return (
		<FormProvider {...methods}>
			<form></form>
		</FormProvider>
	);
}
