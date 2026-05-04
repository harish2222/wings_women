import userEvent from "@testing-library/user-event";
import FloatingBookingButton from "@/components/floating-booking-button";
import { customRender, screen } from "@/test/test-utils";

const trackMock = jest.fn();

jest.mock("@/lib/analytics", () => ({
  trackAppointmentClick: (...args: unknown[]) => trackMock(...args),
}));

const mockPathname = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

describe("FloatingBookingButton", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    trackMock.mockClear();
    Object.defineProperty(window, "scrollY", { writable: true, value: 0 });
    Object.defineProperty(window.navigator, "userAgent", {
      writable: true,
      value: "Mozilla/5.0 (Linux; Android 13)",
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("appears after scroll delay", () => {
    mockPathname.mockReturnValue("/");
    customRender(<FloatingBookingButton />);
    const link = screen.getByRole("link", { name: /book appointment on whatsapp/i });

    expect(link.className).toContain("opacity-0");
    window.scrollY = 200;
    window.dispatchEvent(new Event("scroll"));
    jest.advanceTimersByTime(3000);
    expect(link.className).toContain("opacity-100");
  });

  it("generates service-specific WhatsApp message", () => {
    mockPathname.mockReturnValue("/services/pcos-care");
    customRender(<FloatingBookingButton />);
    const link = screen.getByRole("link", { name: /book appointment on whatsapp/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("Pcos%20Care"));
  });

  it("uses web whatsapp url on desktop", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      writable: true,
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    });
    mockPathname.mockReturnValue("/doctors");
    customRender(<FloatingBookingButton />);
    const link = screen.getByRole("link", { name: /book appointment on whatsapp/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("web.whatsapp.com"));
  });

  it("tracks click event", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    mockPathname.mockReturnValue("/");
    customRender(<FloatingBookingButton />);
    const link = screen.getByRole("link", { name: /book appointment on whatsapp/i });
    window.scrollY = 200;
    window.dispatchEvent(new Event("scroll"));
    jest.advanceTimersByTime(3000);
    await user.click(link);
    expect(trackMock).toHaveBeenCalled();
  });
});

