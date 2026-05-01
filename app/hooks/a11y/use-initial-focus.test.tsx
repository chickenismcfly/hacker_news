import { render } from "@/utils/test";
import { useRef } from "react";
import { useInitialFocus } from "./use-initial-focus";

const Test = ({ active }: { active: boolean }) => {
  const ref = useRef<HTMLButtonElement>(null);
  useInitialFocus(active, ref);
  return (
    <div>
      <button type="button">Other</button>
      <button ref={ref} type="button">
        Target
      </button>
    </div>
  );
};

describe("useInitialFocus", () => {
  it("focuses the ref when active is true", () => {
    const { getByText } = render(<Test active />);
    expect(document.activeElement).toBe(getByText("Target"));
  });

  it("does not focus the ref when active is false", () => {
    const { getByText } = render(<Test active={false} />);
    expect(document.activeElement).not.toBe(getByText("Target"));
  });
});

