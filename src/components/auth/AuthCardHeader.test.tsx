import { vi, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthCardHeader from "./AuthCardHeader";
import { Wrapper } from "@/lib/vitest.util";
import { beforeEach } from "node:test";

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

it("should render the icon, title, and description correctly", () => {
	render(
		<MockComponent
			formType="login"
			formTypeText="Login"
			text="Don't have an account?"
			textLink="Sign up here"
		/>
	);

	expect(screen.getByLabelText("mock-logo")).toBeInTheDocument(); // Checking for the FaPiggyBank icon
	expect(screen.getByText("Login to be Billionare")).toBeInTheDocument();
	expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
	expect(screen.getByText("Sign up here")).toBeInTheDocument();
});

it("should call switchForm when the description is clicked", async () => {
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
	expect(switchFormMock).toHaveBeenCalledWith("login");
});

it("should render with different formTypeText and textLink", () => {
	render(
		<MockComponent
			formType="register"
			formTypeText="Register"
			text="Already have an account?"
			textLink="Login here"
		/>
	);

	expect(screen.getByText("Register to be Billionare")).toBeInTheDocument();
	expect(screen.getByText("Already have an account?")).toBeInTheDocument();
	expect(screen.getByText("Login here")).toBeInTheDocument();
});
