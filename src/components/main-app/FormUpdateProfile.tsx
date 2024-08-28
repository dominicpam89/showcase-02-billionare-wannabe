import { FormUpdateProfileSchema } from "@/lib/definition/profile";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import InputGroup from "../common/InputGroup";
import { nameRules } from "./FormUpdateProfile.helper";
import InputGroupFile from "../common/InputGroupImage";
import { FileArchiveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormRow from "../common/FormRow";
import LogoutConfirmation from "@/components/common/LogoutConfirmation";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";

export default function FormUpdateProfile() {
	const { logoutState, currentUser, updateProfile, updateProfileState } =
		useContextGlobal();
	const disabled = logoutState.isPending || updateProfileState.isPending;
	const methods = useForm<FormUpdateProfileSchema>({
		mode: "onBlur",
		reValidateMode: "onChange",
		defaultValues: {
			name: currentUser?.displayName || "",
		},
	});

	const onValid: SubmitHandler<FormUpdateProfileSchema> = (data) => {
		updateProfile({
			displayName: data.name,
			photo: data.photo,
		});
		methods.resetField("photo");
	};
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onValid)}
				className="flex flex-col gap-6"
			>
				<InputGroup<FormUpdateProfileSchema>
					name="name"
					placeholder=""
					label="Your Name"
					rules={nameRules}
					disabled={disabled}
				/>
				<InputGroupFile<FormUpdateProfileSchema>
					name="photo"
					buttonText="Your Picture, your grace!"
					icon={<FileArchiveIcon className="size-5" />}
					rules={{}}
					disabled={disabled}
				/>
				<FormRow>
					{/* Custom component to confirm user of logging out */}
					<LogoutConfirmation disabled={disabled} />
					<Button type="submit" className="w-full" disabled={disabled}>
						Edit Profile!
					</Button>
				</FormRow>
			</form>
		</FormProvider>
	);
}
