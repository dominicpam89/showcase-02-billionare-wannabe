import { it, expect, beforeEach, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthCardFooter from "./AuthCardFooter";
import { Wrapper } from "@/lib/vitest.util";

const mockLoginGoogle = vi.fn();

beforeEach(() => {
	mockLoginGoogle.mockClear(); // Clear mock before each test
});

interface Props {
	formTypeText: string;
}

const MockComponent = ({ formTypeText }: Props) => (
	<Wrapper
		contextValue={{
			loginGoogle: mockLoginGoogle,
		}}
	>
		<AuthCardFooter formTypeText={formTypeText} />
	</Wrapper>
);

it("should render the Google login button with correct text", () => {
	render(<MockComponent formTypeText="Login" />);

	expect(
		screen.getByRole("button", { name: /Login with Google/i })
	).toBeInTheDocument();
});

it("should call loginGoogle when the Google login button is clicked", async () => {
	render(<MockComponent formTypeText="Login" />);

	const googleLoginButton = screen.getByRole("button", {
		name: /Login with Google/i,
	});

	await userEvent.click(googleLoginButton);

	expect(mockLoginGoogle).toHaveBeenCalledTimes(1);
});

it("should render with different formTypeText", () => {
	render(<MockComponent formTypeText="Register" />);

	expect(
		screen.getByRole("button", { name: /Register with Google/i })
	).toBeInTheDocument();
});
