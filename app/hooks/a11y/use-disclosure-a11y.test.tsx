import { render } from "@/utils/test";
import { useDisclosureA11y } from "./use-disclosure-a11y";

const Test = ({ expanded }: { expanded: boolean }) => {
  const { triggerProps, regionProps } = useDisclosureA11y(expanded);

  return (
    <div>
      <button type="button" {...triggerProps}>
        Toggle replies
      </button>
      <div {...regionProps}>Replies</div>
    </div>
  );
};

describe("useDisclosureA11y", () => {
  it("wires a trigger to its region", () => {
    const { getByRole, getByText } = render(<Test expanded />);

    const button = getByRole("button", { name: "Toggle replies" });
    const region = getByText("Replies");

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-controls", region.id);
    expect(region.id).not.toBe("");
  });

  it("updates the expanded state", () => {
    const { getByRole, rerender } = render(<Test expanded={false} />);

    expect(getByRole("button", { name: "Toggle replies" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    rerender(<Test expanded />);

    expect(getByRole("button", { name: "Toggle replies" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
