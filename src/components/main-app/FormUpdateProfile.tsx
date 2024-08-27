import { FormUpdateProfileSchema } from "@/lib/definition/profile";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import InputGroup from "../common/InputGroup";
import {
	nameRules,
	emailRules,
	passRules,
	newPassRules,
} from "./FormUpdateProfile.helper";
import InputGroupFile from "../common/InputGroupImage";
import { FileArchiveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormRow from "../common/FormRow";
import LogoutConfirmation from "@/components/common/LogoutConfirmation";
import { useContextGlobal } from "@/lib/hooks/useContextGlobal";

export default function FormUpdateProfile() {
	const { logoutState } = useContextGlobal();
	const disabled = logoutState.isPending;
	const methods = useForm<FormUpdateProfileSchema>({
		mode: "onBlur",
		reValidateMode: "onChange",
	});
	const onValid: SubmitHandler<FormUpdateProfileSchema> = (data) => {
		console.log(data);
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
				<InputGroup<FormUpdateProfileSchema>
					name="email"
					placeholder=""
					label="Email"
					rules={emailRules}
					disabled={disabled}
				/>
				<InputGroup<FormUpdateProfileSchema>
					name="password.old"
					placeholder=""
					label="Old Password"
					rules={passRules}
					disabled={disabled}
				/>
				<InputGroup<FormUpdateProfileSchema>
					name="password.new"
					placeholder=""
					label="New Password"
					rules={newPassRules}
					disabled={disabled}
				/>
				<InputGroup<FormUpdateProfileSchema>
					name="password.confirm"
					placeholder=""
					label="Confirm Password"
					rules={passRules}
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
					<LogoutConfirmation />
					<Button type="submit" className="w-full" disabled={disabled}>
						Edit Profile!
					</Button>
				</FormRow>
			</form>
		</FormProvider>
	);
}
