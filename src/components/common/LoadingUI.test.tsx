import { Wrapper } from "@/lib/vitest.util";
import { it, expect, beforeEach } from "vitest";
import { screen, render } from "@testing-library/react";
import LoadingUI from "./LoadingUI";

let shown = false;

beforeEach(() => {
	render(
		<Wrapper contextValue={{}}>
			<LoadingUI shown={shown} />
		</Wrapper>
	);
});

it("should not render the dialog when shown is false", () => {
	// The dialog should not be visible when 'shown' is false
	expect(screen.queryByText("Loading content")).not.toBeInTheDocument();
});

it("should render the dialog with correct content when shown is true", () => {
	// Re-render the component with 'shown' set to true
	shown = true;
	render(
		<Wrapper contextValue={{}}>
			<LoadingUI shown={shown} />
		</Wrapper>
	);

	// The dialog should be visible and contain the correct content
	expect(screen.getByText("Loading content")).toBeInTheDocument();
	expect(
		screen.getByText("Please wait while we are loding the content.")
	).toBeInTheDocument();
});
