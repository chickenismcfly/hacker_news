import { render } from "@/utils/test";
import { useScrollLock } from "./use-scroll-lock";

const Test = ({ active }: { active: boolean }) => {
  useScrollLock(active);
  return <div />;
};

describe("useScrollLock", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("sets body overflow to hidden when active", () => {
    render(<Test active />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("clears body overflow when not active", () => {
    render(<Test active={false} />);
    expect(document.body.style.overflow).toBe("");
  });

  it("cleans up on unmount", () => {
    const { unmount } = render(<Test active />);
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});

