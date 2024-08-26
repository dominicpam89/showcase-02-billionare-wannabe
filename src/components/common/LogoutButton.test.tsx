import { Wrapper } from "@/lib/vitest.util";
import { vi, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoutButton from "./LogoutButton";

const mockLogout = vi.fn();

interface Props {
	isPending: boolean;
}
const MockComponent = ({ isPending }: Props) => {
	return (
		<Wrapper
			contextValue={{
				logout: mockLogout,
				logoutState: {
					isPending,
				},
			}}
		>
			<LogoutButton />
		</Wrapper>
	);
};

it("should render the Logout button with the correct text and icon", () => {
	render(<MockComponent isPending={false} />);
	expect(screen.getByText("Logout")).toBeInTheDocument();
	expect(screen.getByRole("button")).toBeInTheDocument();
});

it("should call the logout function when the button is clicked", async () => {
	render(<MockComponent isPending={false} />);
	const button = screen.getByRole("button");
	await userEvent.click(button);
	expect(mockLogout).toHaveBeenCalledTimes(1);
});

it("should disable the button when logoutState.isPending is true", () => {
	// Re-render the component with `isPending` set to true
	render(<MockComponent isPending={true} />);
	const button = screen.getByLabelText("logout-button");
	expect(button).toBeDisabled();
});

it("should enable the button when logoutState.isPending is false", () => {
	render(<MockComponent isPending={false} />);
	const button = screen.getByLabelText("logout-button");
	expect(button).not.toBeDisabled();
});
