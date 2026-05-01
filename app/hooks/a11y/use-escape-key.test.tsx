import { fireEvent, render } from "@/utils/test";
import { useEscapeKey } from "./use-escape-key";

const Test = ({
  active = true,
  onEscape,
}: {
  active?: boolean;
  onEscape: () => void;
}) => {
  useEscapeKey(onEscape, active);
  return <div />;
};

describe("useEscapeKey", () => {
  it("calls onEscape when Escape is pressed and active is true", () => {
    const onEscape = vi.fn();
    render(<Test onEscape={onEscape} active />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it("does not call onEscape when active is false", () => {
    const onEscape = vi.fn();
    render(<Test onEscape={onEscape} active={false} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onEscape).not.toHaveBeenCalled();
  });

  it("removes the listener on unmount", () => {
    const onEscape = vi.fn();
    const { unmount } = render(<Test onEscape={onEscape} active />);
    unmount();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onEscape).not.toHaveBeenCalled();
  });
});

