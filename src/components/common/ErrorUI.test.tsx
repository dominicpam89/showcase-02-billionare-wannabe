import { it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorUI from "./ErrorUI";
import { Wrapper } from "@/lib/vitest.util";

interface Props {
	title: string;
	message: string;
}

const MockComponent = ({ title, message }: Props) => {
	return (
		<Wrapper contextValue={{}}>
			<ErrorUI title={title} message={message} />
		</Wrapper>
	);
};

it("should render the ErrorUI with the correct title and message", () => {
	render(<MockComponent title="Error Title" message="An error occurred." />);

	expect(screen.getByLabelText("card-error")).toBeInTheDocument();
	expect(screen.getByLabelText("title")).toHaveTextContent("Error Title");
	expect(screen.getByLabelText("description")).toHaveTextContent(
		"An error occurred."
	);
});

it("should dismiss the error UI when the Dismiss button is clicked", async () => {
	render(<MockComponent title="Error Title" message="An error occurred." />);

	const dismissButton = screen.getByRole("button", { name: /dismiss/i });

	// Initially, the card should be visible
	expect(screen.getByLabelText("card-error")).toBeInTheDocument();

	// Click the Dismiss button
	await userEvent.click(dismissButton);

	// After clicking, the card should not be visible
	expect(screen.queryByLabelText("card-error")).not.toBeInTheDocument();
});

it("should not render anything if the error UI is dismissed", async () => {
	// First, render the component and simulate a dismiss action
	render(<MockComponent title="Error Title" message="An error occurred." />);

	const errorCard = screen.getByLabelText("card-error");
	const dismissButton = screen.getByRole("button", { name: /dismiss/i });

	await userEvent.click(dismissButton);

	expect(errorCard).not.toBeInTheDocument();
});
