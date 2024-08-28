import { vi, it, beforeEach, describe, expect } from "vitest";
import { screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Wrapper } from "@/lib/vitest.util";
import FormUpdateProfile from "./FormUpdateProfile";

// Mock user data and states
const mockUser = {
	email: "test@email.com",
	emailVerified: true,
	displayName: "Test Name",
	uid: "testUID",
	photoURL: "http://test.com/test",
};

const logoutState = {
	isPending: false,
};
type LogoutState = typeof logoutState;

const updateProfileState = {
	isPending: false,
};
type UpdateProfileState = typeof updateProfileState;

const updateProfile = vi.fn();

interface Props {
	logoutState: LogoutState;
	updateProfileState: UpdateProfileState;
}
const MockComponent = ({ logoutState, updateProfileState }: Props) => {
	return (
		<Wrapper
			contextValue={{
				logoutState,
				updateProfileState,
				currentUser: mockUser,
				updateProfile,
			}}
		>
			<FormUpdateProfile />
		</Wrapper>
	);
};

describe("Component's definition", () => {
	beforeEach(() => {
		render(
			<MockComponent
				logoutState={{ isPending: false }}
				updateProfileState={{ isPending: false }}
			/>
		);
	});

	it("form is visible", () => {
		const form = screen.getByLabelText("form-update-profile");
		expect(form).toBeVisible();
	});

	it("input name is visible, with input value as user.displayName", () => {
		const form = screen.getByLabelText("form-update-profile");
		const inputName = within(form).getByRole("textbox", {
			name: "Your Name",
		});
		expect(inputName).toBeVisible();
		expect(inputName).toHaveDisplayValue(mockUser.displayName);
	});

	it("input file is visible with appropriate button text", () => {
		const form = screen.getByLabelText("form-update-profile");
		const inputFile = within(form).getByText(/your picture, your grace!/i);
		expect(inputFile).toBeVisible();
	});

	it("submit button is visible and enabled by default", () => {
		const form = screen.getByLabelText("form-update-profile");
		const submitButton = within(form).getByRole("button", {
			name: /edit profile!/i,
		});
		expect(submitButton).toBeVisible();
		expect(submitButton).toBeEnabled();
	});
});

describe("Component's input and button when there's pending mutation", () => {
	beforeEach(() => {
		render(
			<MockComponent
				logoutState={{ isPending: true }}
				updateProfileState={{ isPending: false }}
			/>
		);
	});

	it("input name is disabled if logoutState or updateProfileState is pending", () => {
		const form = screen.getByLabelText("form-update-profile");
		const inputName = within(form).getByRole("textbox", {
			name: "Your Name",
		});
		expect(inputName).toBeDisabled();
	});

	it("submit button is disabled if logoutState or updateProfileState is pending", () => {
		const form = screen.getByLabelText("form-update-profile");
		const submitButton = within(form).getByRole("button", {
			name: /edit profile!/i,
		});
		expect(submitButton).toBeDisabled();
	});
});

describe("Form interactions", () => {
	beforeEach(() => {
		render(
			<MockComponent
				logoutState={{ isPending: false }}
				updateProfileState={{ isPending: false }}
			/>
		);
	});

	it("submits the form with updated name and photo", async () => {
		const form = screen.getByLabelText("form-update-profile");
		const inputName = within(form).getByRole("textbox", {
			name: "Your Name",
		});
		const fileInput = within(form).getByLabelText("real-input");
		const submitButton = within(form).getByRole("button", {
			name: /edit profile!/i,
		});

		await userEvent.clear(inputName);
		await userEvent.type(inputName, "Updated Name");

		const file = new File(["photo"], "photo.png", { type: "image/png" });
		await userEvent.upload(fileInput, file);

		await userEvent.click(submitButton);

		expect(updateProfile).toHaveBeenCalledWith({
			displayName: "Updated Name",
			photo: file,
		});
	});
});
