import { vi, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import AuthCardContent, { Props } from "./AuthCardContent";

const MockComponent = ({ formType }: Props) => {
	return <AuthCardContent formType={formType} />;
};

vi.mock("./AuthCardContent/Login", () => ({
	default: vi.fn(() => <div>Login</div>),
}));

vi.mock("./AuthCardContent/Register", () => ({
	default: vi.fn(() => <div>Register</div>),
}));

it("should render the Login component when formType is 'login'", () => {
	render(<MockComponent formType="login" />);

	expect(screen.getByText("Login")).toBeInTheDocument();
	expect(screen.queryByText("Register")).not.toBeInTheDocument();
});

it("should render the Register component when formType is 'register'", () => {
	render(<MockComponent formType="register" />);

	expect(screen.getByText("Register")).toBeInTheDocument();
	expect(screen.queryByText("Login")).not.toBeInTheDocument();
});
