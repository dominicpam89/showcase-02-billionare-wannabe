import App from "./App";
import { it, expect } from "vitest";
import { screen, render } from "@testing-library/react";

it("test basic component", () => {
	render(<App />);
	const logo = screen.getByLabelText("logo");
	expect(logo).toBeVisible();
});
