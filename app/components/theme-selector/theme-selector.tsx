import { themes } from "@/app/themes";
import { useTheme } from "@/app/hooks/use-theme";

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-1.5"
      role="radiogroup"
      aria-label="Color theme"
    >
      {themes.map((t) => {
        const checked = theme === t.id;

        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => setTheme(t.id)}
            aria-label={`${t.label} theme${checked ? ", selected" : ""}`}
            title={t.label}
            className="w-5 h-5 rounded-full transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
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
