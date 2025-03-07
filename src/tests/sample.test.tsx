import { render, screen } from "@testing-library/react";

describe("Sample Test", () => {
  it("renders a sample text", () => {
    render(<p>Hello, Testing!</p>);
    expect(screen.getByText("Hello, Testing!")).toBeInTheDocument();
  });
});
