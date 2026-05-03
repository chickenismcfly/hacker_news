import { fireEvent, render } from "@/utils/test";
import { useRef } from "react";
import { useFocusTrap } from "./use-focus-trap";

const Test = ({ active = true }: { active?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLButtonElement>(null);
  const onKeyDown = useFocusTrap(active, containerRef, fallbackRef);

  return (
    <div>
      <button ref={fallbackRef} type="button">
        Fallback
      </button>
      <div ref={containerRef} onKeyDown={onKeyDown}>
        <button type="button">First</button>
        <button type="button">Last</button>
      </div>
    </div>
  );
};

describe("useFocusTrap", () => {
  it("cycles focus to the last element on Shift+Tab from the first element", () => {
    const { getByText } = render(<Test />);

    const first = getByText("First");
    const last = getByText("Last");

    first.focus();
    fireEvent.keyDown(first, { key: "Tab", shiftKey: true });

    expect(document.activeElement).toBe(last);
  });

  it("cycles focus to the first element on Tab from the last element", () => {
    const { getByText } = render(<Test />);

    const first = getByText("First");
    const last = getByText("Last");

    last.focus();
    fireEvent.keyDown(last, { key: "Tab" });

    expect(document.activeElement).toBe(first);
  });

  it("does nothing when inactive", () => {
    const { getByText } = render(<Test active={false} />);

    const first = getByText("First");
    const last = getByText("Last");

    first.focus();
    fireEvent.keyDown(first, { key: "Tab", shiftKey: true });

    expect(document.activeElement).toBe(first);
    expect(document.activeElement).not.toBe(last);
  });
});
