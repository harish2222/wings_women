import userEvent from "@testing-library/user-event";
import ContactSection from "@/components/contact-section";
import { customRender, screen, waitFor } from "@/test/test-utils";

describe("ContactSection", () => {
  const originalOpen = window.open;

  beforeEach(() => {
    window.open = jest.fn();
  });

  afterAll(() => {
    window.open = originalOpen;
  });

  it("shows validation errors for required fields", async () => {
    const user = userEvent.setup();
    customRender(<ContactSection />);
    await user.click(screen.getByRole("button", { name: /submit request/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/phone is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    expect(screen.getByText(/consent is required/i)).toBeInTheDocument();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();
    customRender(<ContactSection />);
    await user.type(screen.getByLabelText(/email/i), "bad-email");
    await user.click(screen.getByRole("button", { name: /submit request/i }));
    expect(await screen.findByText(/enter a valid email/i)).toBeInTheDocument();
  });

  it("submits with correct data and shows success message", async () => {
    const user = userEvent.setup();
    customRender(<ContactSection serviceContext="PCOS Care" />);

    await user.type(screen.getByLabelText(/^name$/i), "Asha");
    await user.type(screen.getByLabelText(/^email$/i), "asha@example.com");
    await user.type(screen.getByLabelText(/^phone$/i), "9876543210");
    await user.type(screen.getByLabelText(/preferred date/i), "2026-05-20");
    await user.type(screen.getByLabelText(/^message$/i), "Need consultation");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /submit request/i }));

    await waitFor(() => expect(window.open).toHaveBeenCalled());
    expect(screen.getByText(/email draft has been prepared/i)).toBeInTheDocument();
  });

  it("resets form after successful submission", async () => {
    const user = userEvent.setup();
    customRender(<ContactSection />);
    const nameInput = screen.getByLabelText(/^name$/i) as HTMLInputElement;

    await user.type(nameInput, "Asha");
    await user.type(screen.getByLabelText(/^email$/i), "asha@example.com");
    await user.type(screen.getByLabelText(/^phone$/i), "9876543210");
    await user.type(screen.getByLabelText(/preferred date/i), "2026-05-20");
    await user.type(screen.getByLabelText(/^message$/i), "Need consultation");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /submit request/i }));

    await waitFor(() => expect(nameInput.value).toBe(""));
  });
});

