type RadioOption = {
  label: string;
};

export function useRadioGroupA11y<T>(
  groupLabel: string,
  value: T,
  getOptionLabel: (option: T) => string = (option) =>
    (option as RadioOption).label,
) {
  const groupProps = {
    role: "radiogroup" as const,
    "aria-label": groupLabel,
  };

  const getRadioProps = (option: T) => {
    const label = getOptionLabel(option);
    const checked = Object.is(option, value);

    return {
      role: "radio" as const,
      "aria-checked": checked,
      "aria-label": `${label}${checked ? ", selected" : ""}`,
    };
  };

  return {
    groupProps,
    getRadioProps,
  };
}
