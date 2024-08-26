// AuthCardHeader.test.tsx
import { vi, it, expect, beforeEach, describe } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthCardHeader from "./AuthCardHeader";
import { Wrapper } from "@/lib/vitest.util";

// Mock the switchForm function
const switchFormMock = vi.fn();

beforeEach(() => {
	switchFormMock.mockClear();
});

interface Props {
	formType: AuthFormType;
	formTypeText: string;
	text: string;
	textLink: string;
}

// MockComponent wraps AuthCardHeader with necessary props and context
const MockComponent = ({ formType, formTypeText, text, textLink }: Props) => {
	return (
		<Wrapper contextValue={{}}>
			<AuthCardHeader
				formType={formType}
				formTypeText={formTypeText}
				text={text}
				textLink={textLink}
				switchForm={switchFormMock}
			/>
		</Wrapper>
	);
};

describe("AuthCardHeader", () => {
	it("should render the icon, title, and description correctly for login form", () => {
		render(
			<MockComponent
				formType="login"
				formTypeText="Login"
				text="Don't have an account?"
				textLink="Sign up here"
			/>
		);

		// Check for the FaPiggyBank icon
		expect(screen.getByLabelText("mock-logo")).toBeInTheDocument();

		// Check for the CardTitle
		expect(screen.getByText("Login")).toBeInTheDocument();

		// Check for the CardDescription text and link
		expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
		expect(screen.getByText("Sign up here")).toBeInTheDocument();
	});

	it("should call switchForm with 'register' when the description is clicked in login form", async () => {
		render(
			<MockComponent
				formType="login"
				formTypeText="Login"
				text="Don't have an account?"
				textLink="Sign up here"
			/>
		);

		const descriptionElement = screen.getByText("Don't have an account?");
		await userEvent.click(descriptionElement);

		expect(switchFormMock).toHaveBeenCalledTimes(1);
		expect(switchFormMock).toHaveBeenCalledWith("register");
	});

	it("should render correctly with different formTypeText and textLink for register form", () => {
		render(
			<MockComponent
				formType="register"
				formTypeText="Register"
				text="Already have an account?"
				textLink="Login here"
			/>
		);

		// Check for the CardTitle
		expect(screen.getByText("Register")).toBeInTheDocument();

		// Check for the CardDescription text and link
		expect(screen.getByText("Already have an account?")).toBeInTheDocument();
		expect(screen.getByText("Login here")).toBeInTheDocument();
	});

	it("should call switchForm with 'login' when the description is clicked in register form", async () => {
		render(
			<MockComponent
				formType="register"
				formTypeText="Register"
				text="Already have an account?"
				textLink="Login here"
			/>
		);

		const descriptionElement = screen.getByText("Already have an account?");
		await userEvent.click(descriptionElement);

		expect(switchFormMock).toHaveBeenCalledTimes(1);
		expect(switchFormMock).toHaveBeenCalledWith("login");
	});
});
