import { act, render, screen } from "@testing-library/react";
import CountUp from "@/components/CountUp";

// Mock IntersectionObserver: capture the callback and expose a way to fire it.
let ioCallback: IntersectionObserverCallback | null = null;
let ioDisconnect: jest.Mock;

beforeEach(() => {
  ioDisconnect = jest.fn();
  ioCallback = null;
  (global as unknown as { IntersectionObserver: unknown }).IntersectionObserver = jest
    .fn()
    .mockImplementation((cb: IntersectionObserverCallback) => {
      ioCallback = cb;
      return {
        observe: jest.fn(),
        disconnect: ioDisconnect,
      };
    });

  // Deterministic rAF: run the callback immediately with an incrementing timestamp,
  // so the animation resolves within a couple of ticks instead of real frame timing.
  let now = 0;
  window.requestAnimationFrame = (cb: FrameRequestCallback) => {
    now += 500;
    cb(now);
    return now;
  };
  window.cancelAnimationFrame = jest.fn();
});

function fireIntersection(isIntersecting: boolean) {
  act(() => {
    ioCallback?.(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
}

describe("CountUp", () => {
  it("renders 0 before entering the viewport", () => {
    render(<CountUp target={120000} locale="en" />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("animates up to and settles on the target once visible", () => {
    render(<CountUp target={120000} locale="en" duration={1000} />);
    fireIntersection(true);
    expect(screen.getByText("120,000")).toBeInTheDocument();
  });

  it("formats with the requested decimal count", () => {
    render(<CountUp target={4.9} locale="en" decimals={1} duration={1000} />);
    fireIntersection(true);
    expect(screen.getByText("4.9")).toBeInTheDocument();
  });

  it("appends the suffix after the number", () => {
    render(<CountUp target={4} locale="en" suffix="+" duration={1000} />);
    fireIntersection(true);
    expect(screen.getByText("4+")).toBeInTheDocument();
  });

  it("disconnects the observer once triggered so it never re-animates", () => {
    render(<CountUp target={4} locale="en" duration={1000} />);
    fireIntersection(true);
    expect(ioDisconnect).toHaveBeenCalledTimes(1);
  });

  it("ignores a non-intersecting entry", () => {
    render(<CountUp target={120000} locale="en" duration={1000} />);
    fireIntersection(false);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(ioDisconnect).not.toHaveBeenCalled();
  });
});
