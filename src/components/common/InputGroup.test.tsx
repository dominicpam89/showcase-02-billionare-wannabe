import { Wrapper } from "@/lib/vitest.util";
import { it, expect, beforeEach } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputGroup from "./InputGroup";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormRow from "./FormRow";

type MockFormSchema = {
	username: string;
	password: string;
};

const MockComponent = () => {
	const methods = useForm<MockFormSchema>({
		mode: "onBlur",
		reValidateMode: "onChange",
	});
	return (
		<Wrapper contextValue={{}}>
			<FormProvider {...methods}>
				<InputGroup<MockFormSchema>
					name="username"
					placeholder="Username Placeholder"
					label="Username Label"
					icon={<ActivityIcon />}
				/>
				<InputGroup<MockFormSchema>
					name="password"
					placeholder="Password Placeholder"
					label="Password Label"
					icon={<ActivityIcon />}
					inputType="password"
				/>
				<FormRow>
					<Button type="reset">Reset</Button>
					<Button type="submit">Submit</Button>
				</FormRow>
			</FormProvider>
		</Wrapper>
	);
};

beforeEach(() => {
	render(<MockComponent />);
});

it("should render the input groups with correct placeholders and labels", () => {
	// Check for the username input
	expect(screen.getByLabelText("Username Label")).toBeInTheDocument();
	expect(
		screen.getByPlaceholderText("Username Placeholder")
	).toBeInTheDocument();

	// Check for the password input
	expect(screen.getByLabelText("Password Label")).toBeInTheDocument();
	expect(
		screen.getByPlaceholderText("Password Placeholder")
	).toBeInTheDocument();
});

it("should toggle password visibility when the button is clicked", async () => {
	const passwordInput = screen.getByPlaceholderText("Password Placeholder");
	const toggleButton = screen.getByLabelText("password-toggle");

	// Initially, the password should be of type "password"
	expect(passwordInput).toHaveAttribute("type", "password");

	// Click the toggle button to show the password
	await userEvent.click(toggleButton);
	expect(passwordInput).toHaveAttribute("type", "text");

	// Click the toggle button again to hide the password
	await userEvent.click(toggleButton);
	expect(passwordInput).toHaveAttribute("type", "password");
});
