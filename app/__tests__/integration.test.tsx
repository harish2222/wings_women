import userEvent from "@testing-library/user-event";
import HomePage from "@/app/page";
import Navbar from "@/components/navbar";
import { customRender, screen } from "@/test/test-utils";

const mockSetTheme = jest.fn((value: string) => {
  window.localStorage.setItem("theme", value);
});

const pathnameMock = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => pathnameMock(),
}));

jest.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "light",
    setTheme: mockSetTheme,
  }),
}));

describe("Integration tests", () => {
  beforeEach(() => {
    pathnameMock.mockReturnValue("/");
    window.localStorage.clear();
    mockSetTheme.mockClear();
  });

  it("renders homepage content", () => {
    customRender(<HomePage />);
    expect(screen.getByRole("heading", { name: /expert fertility & women's health care/i })).toBeInTheDocument();
  });

  it("navigation links point to expected routes", () => {
    customRender(<Navbar />);
    expect(screen.getAllByRole("link", { name: /home/i })[0]).toHaveAttribute("href", "/");
    expect(screen.getAllByRole("link", { name: /doctors/i })[0]).toHaveAttribute("href", "/doctors");
    expect(screen.getAllByRole("link", { name: /services/i })[0]).toHaveAttribute("href", "/services");
  });

  it("theme choice persists through localStorage", async () => {
    const user = userEvent.setup();
    customRender(<Navbar />);
    await user.click(screen.getByRole("button", { name: /switch to dark mode/i }));
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });
});

