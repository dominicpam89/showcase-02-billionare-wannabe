import { it, expect, beforeEach, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthCardFooter from "./AuthCardFooter";
import { Wrapper } from "@/lib/vitest.util";

const mockLoginGoogle = vi.fn();
const mockSwitchForm = vi.fn();

beforeEach(() => {
	mockLoginGoogle.mockClear();
	mockSwitchForm.mockClear();
});

interface Props {
	formTypeText: string;
	formType: "login" | "register" | "reset-password";
}

const MockComponent = ({ formTypeText, formType }: Props) => (
	<Wrapper
		contextValue={{
			loginGoogle: mockLoginGoogle,
			loginState: { isPending: false },
		}}
	>
		<AuthCardFooter
			formTypeText={formTypeText}
			formType={formType}
			switchForm={mockSwitchForm}
		/>
	</Wrapper>
);

it("should render the Google login button with correct text when formType is not 'reset-password'", () => {
	render(<MockComponent formTypeText="Login" formType="login" />);

	expect(
		screen.getByRole("button", { name: /Login with Google/i })
	).toBeInTheDocument();
});

it("should call loginGoogle when the Google login button is clicked", async () => {
	render(<MockComponent formTypeText="Login" formType="login" />);

	const googleLoginButton = screen.getByRole("button", {
		name: /Login with Google/i,
	});

	await userEvent.click(googleLoginButton);

	expect(mockLoginGoogle).toHaveBeenCalledTimes(1);
});

it("should render with different formTypeText", () => {
	render(<MockComponent formTypeText="Register" formType="register" />);

	expect(
		screen.getByRole("button", { name: /Register with Google/i })
	).toBeInTheDocument();
});

it("should render the 'Forget password?' button and call switchForm when clicked", async () => {
	render(<MockComponent formTypeText="Login" formType="login" />);

	const forgetPasswordButton = screen.getByRole("button", {
		name: /Forget password\?/i,
	});

	expect(forgetPasswordButton).toBeInTheDocument();

	await userEvent.click(forgetPasswordButton);

	expect(mockSwitchForm).toHaveBeenCalledTimes(1);
	expect(mockSwitchForm).toHaveBeenCalledWith("reset-password");
});

it("should not render the Google login button or 'Forget password?' button when formType is 'reset-password'", () => {
	render(<MockComponent formTypeText="Reset" formType="reset-password" />);

	expect(
		screen.queryByRole("button", { name: /Reset with Google/i })
	).not.toBeInTheDocument();
	expect(
		screen.queryByRole("button", { name: /Forget password\?/i })
	).not.toBeInTheDocument();
});

it("should disable the buttons when loginState.isPending is true", () => {
	render(
		<Wrapper
			contextValue={{
				loginGoogle: mockLoginGoogle,
				loginState: { isPending: true },
			}}
		>
			<AuthCardFooter
				formTypeText="Login"
				formType="login"
				switchForm={mockSwitchForm}
			/>
		</Wrapper>
	);

	const googleLoginButton = screen.getByRole("button", {
		name: /Login with Google/i,
	});
	const forgetPasswordButton = screen.getByRole("button", {
		name: /Forget password\?/i,
	});

	expect(googleLoginButton).toBeDisabled();
	expect(forgetPasswordButton).toBeDisabled();
});
