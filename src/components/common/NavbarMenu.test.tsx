import { vi, it, describe, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavbarMenu from "./NavbarMenu";
import { Wrapper } from "@/lib/vitest.util";

// Mock the dependent components
vi.mock("../main-app/FormUpdateProfile", () => ({
	__esModule: true,
	default: () => <div>Mocked FormUpdateProfile</div>,
}));

vi.mock("./UserAvatar", () => ({
	__esModule: true,
	default: () => <div>Mocked UserAvatar</div>,
}));

describe("NavbarMenu Component", () => {
	beforeEach(() => {
		render(
			<Wrapper contextValue={{}}>
				<NavbarMenu />
			</Wrapper>
		);
	});

	it("renders the MenuIcon and opens the sheet when clicked", async () => {
		const menuIcon = screen.getByLabelText("button-trigger");
		expect(menuIcon).toBeVisible();

		await userEvent.click(menuIcon);

		const sheetContent = screen.getByLabelText("sheet-content");
		expect(sheetContent).toBeVisible();

		const header = within(sheetContent).getByLabelText("header");
		expect(header).toBeVisible();

		const title = within(header).getByLabelText(/title/i);
		expect(title).toBeVisible();

		const description = within(header).getByLabelText(/description/i);
		expect(description).toBeVisible();

		const userAvatar = within(header).getByText("Mocked UserAvatar");
		expect(userAvatar).toBeVisible();

		const formUpdateProfile = within(sheetContent).getByText(
			"Mocked FormUpdateProfile"
		);
		expect(formUpdateProfile).toBeVisible();
	});
});
