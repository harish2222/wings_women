import ServicesPage from "@/app/services/page";
import { customRender, screen } from "@/test/test-utils";

describe("ServicesPage", () => {
  it("renders service details and learn more links", () => {
    customRender(<ServicesPage />);
    expect(screen.getByRole("heading", { name: /service categories/i })).toBeInTheDocument();
    expect(screen.getByText(/ovulation induction and timed intercourse/i)).toBeInTheDocument();
    const links = screen.getAllByRole("link", { name: /learn more/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", expect.stringContaining("/services/"));
  });

  it("includes hover effect utility classes", () => {
    const { container } = customRender(<ServicesPage />);
    const card = container.querySelector("article");
    expect(card?.className).toContain("hover:-translate-y-1");
    expect(card?.className).toContain("hover:shadow-md");
  });

  it("contains mobile responsive grid classes", () => {
    const { container } = customRender(<ServicesPage />);
    const grid = container.querySelector(".grid");
    expect(grid?.className).toContain("grid-cols-1");
    expect(grid?.className).toContain("md:grid-cols-2");
    expect(grid?.className).toContain("xl:grid-cols-3");
  });
});

