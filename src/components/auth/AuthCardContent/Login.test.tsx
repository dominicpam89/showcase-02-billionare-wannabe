import { it, expect, beforeEach, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { Wrapper } from "@/lib/vitest.util";

const mockLoginWithEmail = vi.fn();

beforeEach(() => {
	mockLoginWithEmail.mockClear(); // Clear mock before each test
});

interface Props {
	isPending: boolean;
}

const MockComponent = ({ isPending }: Props) => (
	<Wrapper
		contextValue={{
			loginWithEmailState: {
				isPending,
			},
			loginWithEmail: mockLoginWithEmail,
		}}
	>
		<Login />
	</Wrapper>
);

it("should render the login form with email and password fields", () => {
	render(<MockComponent isPending={false} />);

	expect(screen.getByLabelText("Email")).toBeInTheDocument();
	expect(screen.getByLabelText("Password")).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
});

it("should call loginWithEmail when the form is submitted with valid data", async () => {
	render(<MockComponent isPending={false} />);

	const emailInput = screen.getByPlaceholderText("Email");
	const passwordInput = screen.getByPlaceholderText("Password");

	await userEvent.clear(emailInput);
	await userEvent.clear(passwordInput);
	await userEvent.type(emailInput, "test@example.com");
	await userEvent.type(passwordInput, "Password12345!");

	await userEvent.click(screen.getByRole("button", { name: /submit/i }));

	await waitFor(() => {
		expect(mockLoginWithEmail).toHaveBeenCalledTimes(1);
		expect(mockLoginWithEmail).toHaveBeenCalledWith({
			email: "test@example.com",
			password: "Password12345!",
		});
	});
});

it("should disable the form controls when isPending is true", () => {
	render(<MockComponent isPending={true} />);

	const emailInput = screen.getByPlaceholderText("Email");
	const passwordInput = screen.getByPlaceholderText("Password");
	const submitButton = screen.getByRole("button", { name: /submit/i });
	const resetButton = screen.getByRole("button", { name: /reset/i });

	expect(emailInput).toBeDisabled();
	expect(passwordInput).toBeDisabled();
	expect(submitButton).toBeDisabled();
	expect(resetButton).toBeDisabled();
});

it("should enable the form controls when isPending is false", () => {
	render(<MockComponent isPending={false} />);

	const emailInput = screen.getByPlaceholderText("Email");
	const passwordInput = screen.getByPlaceholderText("Password");
	const submitButton = screen.getByRole("button", { name: /submit/i });
	const resetButton = screen.getByRole("button", { name: /reset/i });

	expect(emailInput).not.toBeDisabled();
	expect(passwordInput).not.toBeDisabled();
	expect(submitButton).not.toBeDisabled();
	expect(resetButton).not.toBeDisabled();
});

it("should reset the form fields when the reset button is clicked", async () => {
	render(<MockComponent isPending={false} />);

	const emailInput = screen.getByPlaceholderText("Email");
	const passwordInput = screen.getByPlaceholderText("Password");

	await userEvent.clear(emailInput);
	await userEvent.clear(passwordInput);
	await userEvent.type(emailInput, "test@example.com");
	await userEvent.type(passwordInput, "password123");

	expect(emailInput).toHaveValue("test@example.com");
	expect(passwordInput).toHaveValue("password123");

	await userEvent.click(screen.getByRole("button", { name: /reset/i }));

	expect(emailInput).toHaveValue(""); // Assuming form reset clears the input fields
	expect(passwordInput).toHaveValue("");
});
