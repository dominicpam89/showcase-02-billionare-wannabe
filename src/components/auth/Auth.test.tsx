import { it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth from "./Auth";
import { Wrapper } from "@/lib/vitest.util";

const mockContextValue = {
	currentUser: null,
	loginGoogle: vi.fn(),
	logoutGoogle: vi.fn(),
	loginState: { isLoading: false },
	logoutState: { isLoading: false },
};

beforeEach(() => {
	render(
		<Wrapper contextValue={mockContextValue}>
			<Auth />
		</Wrapper>
	);
});

it("section does exist", async () => {
	const section = screen.getByLabelText("section-auth");
	expect(section).toBeVisible();
});

it("login component is shown in the beginning", () => {
	const loginComponent = screen.getByText(/login form/i);
	expect(loginComponent).toBeVisible();
});

it("register component is shown after user navigate through login form", async () => {
	const loginComponent = screen.getByText(/login form/i);
	expect(loginComponent).toBeVisible();
	const switchButton = screen.getByText(/register/i);
	expect(switchButton).toBeVisible();
	await userEvent.click(switchButton);
	const registerComponent = screen.getByText(/register form/i);
	expect(registerComponent).toBeVisible();
});
