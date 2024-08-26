import { vi, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import AuthCardContent, { Props } from "./AuthCardContent";

const MockComponent = ({ formType, switchForm }: Props) => {
	return <AuthCardContent formType={formType} switchForm={switchForm} />;
};

vi.mock("./AuthCardContent/Login", () => ({
	default: vi.fn(() => <div>Login</div>),
}));

vi.mock("./AuthCardContent/Register", () => ({
	default: vi.fn(() => <div>Register</div>),
}));

vi.mock("./AuthCardContent/ForgetPassword", () => ({
	default: vi.fn(() => <div>ForgetPassword</div>),
}));

it("should render the Login component when formType is 'login'", () => {
	render(<MockComponent formType="login" switchForm={vi.fn()} />);

	expect(screen.getByText("Login")).toBeInTheDocument();
	expect(screen.queryByText("Register")).not.toBeInTheDocument();
	expect(screen.queryByText("ForgetPassword")).not.toBeInTheDocument();
});

it("should render the Register component when formType is 'register'", () => {
	render(<MockComponent formType="register" switchForm={vi.fn()} />);

	expect(screen.getByText("Register")).toBeInTheDocument();
	expect(screen.queryByText("Login")).not.toBeInTheDocument();
	expect(screen.queryByText("ForgetPassword")).not.toBeInTheDocument();
});

it("should render the ForgetPassword component when formType is 'reset-password'", () => {
	render(<MockComponent formType="reset-password" switchForm={vi.fn()} />);

	expect(screen.getByText("ForgetPassword")).toBeInTheDocument();
	expect(screen.queryByText("Login")).not.toBeInTheDocument();
	expect(screen.queryByText("Register")).not.toBeInTheDocument();
});
