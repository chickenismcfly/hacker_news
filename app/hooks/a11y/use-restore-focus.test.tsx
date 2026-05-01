import { act, render } from "@/utils/test";
import { useState } from "react";
import { useRestoreFocus } from "./use-restore-focus";

const Test = ({ initialActive = false }: { initialActive?: boolean }) => {
  const [active, setActive] = useState(initialActive);
  useRestoreFocus(active);
  return (
    <div>
      <button type="button" onClick={() => setActive(true)}>
        Open
      </button>
      <button type="button" onClick={() => setActive(false)}>
        Close
      </button>
    </div>
  );
};

describe("useRestoreFocus", () => {
  it("restores focus to the previously focused element when deactivated", () => {
    const { getByText } = render(
      <div>
        <button type="button">Opener</button>
        <Test />
        <button type="button">Other</button>
      </div>,
    );

    const opener = getByText("Opener");
    const other = getByText("Other");
    const open = getByText("Open");
    const close = getByText("Close");

    opener.focus();
    expect(document.activeElement).toBe(opener);

    act(() => {
      open.click();
    });

    other.focus();
    expect(document.activeElement).toBe(other);

    act(() => {
      close.click();
    });

    expect(document.activeElement).toBe(opener);
  });
});

