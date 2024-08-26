import { it, expect, beforeEach, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Register";
import { Wrapper } from "@/lib/vitest.util";

const mockRegisterWithEmail = vi.fn();

beforeEach(() => {
	mockRegisterWithEmail.mockClear(); // Clear mock before each test
});

interface Props {
	isPending: boolean;
}

const MockComponent = ({ isPending }: Props) => (
	<Wrapper
		contextValue={{
			registerWithEmailState: {
				isPending,
			},
			registerWithEmail: mockRegisterWithEmail,
		}}
	>
		<Register />
	</Wrapper>
);

it("should render the register form with first name, last name, email, password, and confirmation password fields", () => {
	render(<MockComponent isPending={false} />);

	expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
	expect(screen.getByLabelText("Email")).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
	expect(screen.getByLabelText("Password")).toBeInTheDocument();
	expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
	expect(screen.getByLabelText("Confirmation Password")).toBeInTheDocument();
	expect(
		screen.getByPlaceholderText("Confirmation Password")
	).toBeInTheDocument();
});

it("should call registerWithEmail when the form is submitted with valid data", async () => {
	render(<MockComponent isPending={false} />);

	const firstNameInput = screen.getByPlaceholderText("First Name");
	const lastNameInput = screen.getByPlaceholderText("Last Name");
	const emailInput = screen.getByPlaceholderText("Email");
	const passwordInput = screen.getByPlaceholderText("Password");
	const confirmationPasswordInput = screen.getByPlaceholderText(
		"Confirmation Password"
	);

	await userEvent.type(firstNameInput, "John");
	await userEvent.type(lastNameInput, "Doe");
	await userEvent.clear(emailInput);
	await userEvent.type(emailInput, "john.doe@example.com");
	await userEvent.clear(passwordInput);
	await userEvent.type(passwordInput, "Password12345!");
	await userEvent.clear(confirmationPasswordInput);
	await userEvent.type(confirmationPasswordInput, "Password12345!");

	await userEvent.click(screen.getByRole("button", { name: /submit/i }));

	await waitFor(() => {
		expect(mockRegisterWithEmail).toHaveBeenCalledTimes(1);
		expect(mockRegisterWithEmail).toHaveBeenCalledWith({
			email: "john.doe@example.com",
			password: "Password12345!",
			firstName: "John",
			lastName: "Doe",
		});
	});
});

it("should disable the form controls when isPending is true", () => {
	render(<MockComponent isPending={true} />);

	const firstNameInput = screen.getByPlaceholderText("First Name");
	const lastNameInput = screen.getByPlaceholderText("Last Name");
	const emailInput = screen.getByPlaceholderText("Email");
	const passwordInput = screen.getByPlaceholderText("Password");
	const confirmationPasswordInput = screen.getByPlaceholderText(
		"Confirmation Password"
	);
	const submitButton = screen.getByRole("button", { name: /submit/i });
	const resetButton = screen.getByRole("button", { name: /reset/i });

	expect(firstNameInput).toBeDisabled();
	expect(lastNameInput).toBeDisabled();
	expect(emailInput).toBeDisabled();
	expect(passwordInput).toBeDisabled();
	expect(confirmationPasswordInput).toBeDisabled();
	expect(submitButton).toBeDisabled();
	expect(resetButton).toBeDisabled();
});

it("should enable the form controls when isPending is false", () => {
	render(<MockComponent isPending={false} />);

	const firstNameInput = screen.getByPlaceholderText("First Name");
	const lastNameInput = screen.getByPlaceholderText("Last Name");
	const emailInput = screen.getByPlaceholderText("Email");
	const passwordInput = screen.getByPlaceholderText("Password");
	const confirmationPasswordInput = screen.getByPlaceholderText(
		"Confirmation Password"
	);
	const submitButton = screen.getByRole("button", { name: /submit/i });
	const resetButton = screen.getByRole("button", { name: /reset/i });

	expect(firstNameInput).not.toBeDisabled();
	expect(lastNameInput).not.toBeDisabled();
	expect(emailInput).not.toBeDisabled();
	expect(passwordInput).not.toBeDisabled();
	expect(confirmationPasswordInput).not.toBeDisabled();
	expect(submitButton).not.toBeDisabled();
	expect(resetButton).not.toBeDisabled();
});

it("should reset the form fields when the reset button is clicked", async () => {
	render(<MockComponent isPending={false} />);

	const firstNameInput = screen.getByPlaceholderText("First Name");
	const lastNameInput = screen.getByPlaceholderText("Last Name");
	const emailInput = screen.getByPlaceholderText("Email");
	const passwordInput = screen.getByPlaceholderText("Password");
	const confirmationPasswordInput = screen.getByPlaceholderText(
		"Confirmation Password"
	);

	await userEvent.type(firstNameInput, "John");
	await userEvent.type(lastNameInput, "Doe");
	await userEvent.clear(emailInput);
	await userEvent.type(emailInput, "john.doe@example.com");
	await userEvent.clear(passwordInput);
	await userEvent.type(passwordInput, "Password12345!");
	await userEvent.clear(confirmationPasswordInput);
	await userEvent.type(confirmationPasswordInput, "Password12345!");

	expect(firstNameInput).toHaveValue("John");
	expect(lastNameInput).toHaveValue("Doe");
	expect(emailInput).toHaveValue("john.doe@example.com");
	expect(passwordInput).toHaveValue("Password12345!");
	expect(confirmationPasswordInput).toHaveValue("Password12345!");

	await userEvent.click(screen.getByRole("button", { name: /reset/i }));

	expect(firstNameInput).toHaveValue(""); // Assuming form reset clears the input fields
	expect(lastNameInput).toHaveValue(""); // Assuming form reset clears the input fields
	expect(emailInput).toHaveValue(""); // Reset to default value
	expect(passwordInput).toHaveValue(""); // Reset to default value
	expect(confirmationPasswordInput).toHaveValue(""); // Reset to default value
});
