import { themes } from "@/app/themes";
import { useRadioGroupA11y } from "@/app/hooks/a11y/use-radio-group-a11y";
import { useTheme } from "@/app/hooks/use-theme";

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const selectedTheme = themes.find((candidate) => candidate.id === theme) ?? themes[0];
  const { groupProps, getRadioProps } = useRadioGroupA11y(
    "Color theme",
    selectedTheme,
    (option) => `${option.label} theme`,
  );

  return (
    <div className="flex items-center gap-1.5" {...groupProps}>
      {themes.map((t) => {
        const checked = theme === t.id;

        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setTheme(t.id)}
            title={t.label}
            className="w-5 h-5 rounded-full transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
            {...getRadioProps(t)}
            style={{
              backgroundColor: t.previewColor,
              boxShadow: checked
                ? `0 0 0 2px white, 0 0 0 3.5px ${t.previewColor}`
                : undefined,
            }}
          />
        );
      })}
    </div>
  );
};
