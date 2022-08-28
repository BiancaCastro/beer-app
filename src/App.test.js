import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the beer list text", () => {
  render(<App />);
  const linkElement = screen.getByText("Beer List");
  expect(linkElement).toBeInTheDocument();
});
