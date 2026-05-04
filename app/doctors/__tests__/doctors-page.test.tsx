import userEvent from "@testing-library/user-event";
import DoctorsPage from "@/app/doctors/page";
import { customRender, screen, within } from "@/test/test-utils";

describe("DoctorsPage", () => {
  it("displays doctor information cards", () => {
    customRender(<DoctorsPage />);
    expect(screen.getByRole("heading", { name: /our expert team/i })).toBeInTheDocument();
    expect(screen.getByText(/dr\. b\. viswanath/i)).toBeInTheDocument();
    expect(screen.getByText(/mbbs, dgo, dnb/i)).toBeInTheDocument();
  });

  it("shows initials placeholder for doctor image area", () => {
    customRender(<DoctorsPage />);
    expect(screen.getByAltText(/dr\. b\. viswanath/i)).toBeInTheDocument();
  });

  it("opens modal on View Full Profile and includes WhatsApp booking", async () => {
    const user = userEvent.setup();
    customRender(<DoctorsPage />);

    const profileButtons = screen.getAllByRole("button", { name: /view full profile/i });
    await user.click(profileButtons[0]);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: /dr\. b\. viswanath/i })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /book appointment/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me"),
    );
  });
});

