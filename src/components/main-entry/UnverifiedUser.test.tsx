import { it, expect, vi, beforeEach } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UnverifiedUser from "./UnverifiedUser";
import { Wrapper } from "@/lib/vitest.util";

const mockOnResendVerification = vi.fn();

beforeEach(() => {
	mockOnResendVerification.mockClear(); // Clear mock before each test
});

const MockComponent = ({ isPending }: { isPending: boolean }) => (
	<Wrapper
		contextValue={{
			onResendVerification: mockOnResendVerification,
			resendVerificationState: { isPending },
		}}
	>
		<UnverifiedUser />
	</Wrapper>
);

it("should render the UnverifiedUser component with the correct content", () => {
	render(<MockComponent isPending={false} />);

	expect(
		screen.getByLabelText("unverified-user-container")
	).toBeInTheDocument();
	expect(screen.getByText("Account Unverified")).toBeInTheDocument();
	expect(
		screen.getByText(
			"You need to verify your account before continue using this app!"
		)
	).toBeInTheDocument();
	expect(
		screen.getByText("Check your inbox to get verification done!")
	).toBeInTheDocument();
	expect(
		screen.getByRole("button", { name: /resend verification to email/i })
	).toBeInTheDocument();
});

it("should call onResendVerification when the 'Resend verification to email' button is clicked", async () => {
	render(<MockComponent isPending={false} />);

	const resendButton = screen.getByRole("button", {
		name: /resend verification to email/i,
	});

	await userEvent.click(resendButton);

	expect(mockOnResendVerification).toHaveBeenCalledTimes(1);
});

it("should disable the 'Resend verification to email' button when isPending is true", () => {
	render(<MockComponent isPending={true} />);

	const resendButton = screen.getByRole("button", {
		name: /resend verification to email/i,
	});

	expect(resendButton).toBeDisabled();
});

it("should enable the 'Resend verification to email' button when isPending is false", () => {
	render(<MockComponent isPending={false} />);

	const resendButton = screen.getByRole("button", {
		name: /resend verification to email/i,
	});

	expect(resendButton).not.toBeDisabled();
});
