import { render } from "@/utils/test";
import { useRadioGroupA11y } from "./use-radio-group-a11y";

const options = [
  { id: "lilac", label: "Lilac" },
  { id: "ocean", label: "Ocean" },
];

const Test = ({ selectedIndex = 0 }: { selectedIndex?: number }) => {
  const selected = options[selectedIndex];
  const { groupProps, getRadioProps } = useRadioGroupA11y(
    "Color theme",
    selected,
    (option) => option.label,
  );

  return (
    <div {...groupProps}>
      {options.map((option) => (
        <button key={option.id} type="button" {...getRadioProps(option)}>
          {option.label}
        </button>
      ))}
    </div>
  );
};

describe("useRadioGroupA11y", () => {
  it("returns radiogroup semantics", () => {
    const { getByRole } = render(<Test />);

    expect(getByRole("radiogroup", { name: "Color theme" })).toBeInTheDocument();
  });

  it("marks the selected option as checked", () => {
    const { getByRole } = render(<Test selectedIndex={1} />);

    expect(getByRole("radio", { name: "Ocean, selected" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(getByRole("radio", { name: "Lilac" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });
});
