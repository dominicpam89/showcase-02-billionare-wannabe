import { it, expect, beforeEach, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { Wrapper } from "@/lib/vitest.util";

const switchFormMock = vi.fn();

beforeEach(() => {
	render(
		<Wrapper contextValue={{}}>
			<Login switchForm={switchFormMock} />
		</Wrapper>
	);
});

it("button exist", async () => {
	const button = screen.getByRole("button");
	expect(button).toBeVisible();
	await userEvent.click(button);
	expect(switchFormMock).toHaveBeenCalled();
});
