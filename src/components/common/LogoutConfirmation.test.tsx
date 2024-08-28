import { Wrapper } from "@/lib/vitest.util";
import { vi, it, expect, describe, beforeEach } from "vitest";
import { screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoutConfirmation from "./LogoutConfirmation";

const mockLogout = vi.fn();

interface Props {
	disabled: boolean;
	isPending: boolean;
}
const MockComponent = ({ disabled, isPending }: Props) => {
	return (
		<Wrapper
			contextValue={{
				logout: mockLogout,
				logoutState: {
					isPending,
				},
			}}
		>
			<LogoutConfirmation disabled={disabled} />
		</Wrapper>
	);
};

describe("Components definition", () => {
	beforeEach(() => {
		render(<MockComponent disabled={false} isPending={false} />);
	});

	it("button trigger is visible from beginning", () => {
		const dialogTrigger = screen.getByLabelText("button-logout");
		expect(dialogTrigger).toBeVisible();
	});

	it("dialog and its child components are shown when button trigger is clicked", async () => {
		const dialogTrigger = screen.getByLabelText("button-logout");
		await userEvent.click(dialogTrigger);
		const dialog = screen.getByLabelText("confirmation-dialog", {
			exact: false,
		});
		const dialogHeader = within(dialog).getByLabelText("header");
		const confirmButton = within(dialog).getByLabelText("confirm-button");
		expect(dialog).toBeVisible();
		expect(dialogHeader).toBeVisible();
		expect(confirmButton).toBeVisible();
	});
});

describe("Delete confirmation button behavior", () => {
	beforeEach(() => {
		render(<MockComponent disabled={false} isPending={false} />);
	});

	it("it will logging out user when confirm button is clicked", async () => {
		const dialogTrigger = screen.getByLabelText("button-logout");
		await userEvent.click(dialogTrigger);
		const dialog = screen.getByLabelText("confirmation-dialog", {
			exact: false,
		});
		const confirmButton = within(dialog).getByLabelText("confirm-button");

		// mock would have been not called before user click confirm button
		expect(mockLogout).not.toHaveBeenCalled();
		await userEvent.click(confirmButton);
		// mock would have been called after user click confirm button
		expect(mockLogout).toHaveBeenCalled();
	});
});
