import { it, expect, beforeEach, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ForgetPassword, { Props } from "./ForgetPassword";
import { Wrapper } from "@/lib/vitest.util";

const mockOnResetPassword = vi.fn();
const mockSwitchForm = vi.fn();

beforeEach(() => {
	mockOnResetPassword.mockClear();
	mockSwitchForm.mockClear();
});

const MockComponent = ({ switchForm }: Props) => (
	<Wrapper
		contextValue={{
			onResetPassword: mockOnResetPassword,
			resetPasswordState: { isPending: false, data: null },
		}}
	>
		<ForgetPassword switchForm={switchForm} />
	</Wrapper>
);

it("should render the email input and submit button", () => {
	render(<MockComponent switchForm={mockSwitchForm} />);

	expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
	expect(
		screen.getByRole("button", { name: /reset my password/i })
	).toBeInTheDocument();
});

it("should call onResetPassword when the form is submitted with a valid email", async () => {
	render(<MockComponent switchForm={mockSwitchForm} />);

	const emailInput = screen.getByPlaceholderText("Email");
	await userEvent.type(emailInput, "test@example.com");

	await userEvent.click(
		screen.getByRole("button", { name: /reset my password/i })
	);

	await waitFor(() => {
		expect(mockOnResetPassword).toHaveBeenCalledTimes(1);
		expect(mockOnResetPassword).toHaveBeenCalledWith({
			email: "test@example.com",
		});
	});
});

it("should switch form to login when resetPasswordState.data.status is true", async () => {
	// Render the component with a mock resetPasswordState having data.status = true
	render(
		<Wrapper
			contextValue={{
				onResetPassword: mockOnResetPassword,
				resetPasswordState: { isPending: false, data: { status: true } },
			}}
		>
			<ForgetPassword switchForm={mockSwitchForm} />
		</Wrapper>
	);

	await waitFor(() => {
		expect(mockSwitchForm).toHaveBeenCalledTimes(1);
		expect(mockSwitchForm).toHaveBeenCalledWith("login");
	});
});

it("should disable the submit button when resetPasswordState.isPending is true", () => {
	render(
		<Wrapper
			contextValue={{
				onResetPassword: mockOnResetPassword,
				resetPasswordState: { isPending: true, data: null },
			}}
		>
			<ForgetPassword switchForm={mockSwitchForm} />
		</Wrapper>
	);

	const submitButton = screen.getByRole("button", {
		name: /reset my password/i,
	});
	expect(submitButton).toBeDisabled();
});
