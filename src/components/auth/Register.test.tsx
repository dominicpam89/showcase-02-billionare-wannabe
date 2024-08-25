import { it, expect, beforeEach, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "./Register";
import { Wrapper } from "@/lib/vitest.util";

const switchFormMock = vi.fn();

beforeEach(() => {
	render(
		<Wrapper contextValue={{}}>
			<Register switchForm={switchFormMock} />
		</Wrapper>
	);
});

it("button exist", async () => {
	const button = screen.getByRole("button");
	expect(button).toBeVisible();
	await userEvent.click(button);
	expect(switchFormMock).toHaveBeenCalled();
});
