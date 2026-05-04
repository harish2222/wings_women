import userEvent from "@testing-library/user-event";
import Navbar from "@/components/navbar";
import { customRender, screen } from "@/test/test-utils";

const mockSetTheme = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => "/services",
}));

jest.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "light",
    setTheme: mockSetTheme,
  }),
}));

describe("Navbar", () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  it("renders all main navigation links", () => {
    customRender(<Navbar />);
    expect(screen.getAllByRole("link", { name: /home/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /doctors/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /services/i })[0]).toBeInTheDocument();
  });

  it("toggles hamburger menu on mobile", async () => {
    const user = userEvent.setup();
    customRender(<Navbar />);

    const openButton = screen.getByRole("button", { name: /open menu/i });
    await user.click(openButton);
    expect(screen.getByRole("button", { name: /close navigation menu/i })).toBeInTheDocument();
  });

  it("dark mode toggle calls setTheme", async () => {
    const user = userEvent.setup();
    customRender(<Navbar />);
    const themeButton = screen.getByRole("switch", { name: /toggle theme/i });
    await user.click(themeButton);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("highlights active link", () => {
    customRender(<Navbar />);
    expect(screen.getAllByRole("link", { name: /services/i })[0]).toHaveAttribute("aria-current", "page");
  });

  it("has sticky behavior class", () => {
    const { container } = customRender(<Navbar />);
    expect(container.querySelector("header")).toHaveClass("sticky");
  });
});

