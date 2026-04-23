import { themes } from "@/app/themes";
import { useTheme } from "@/app/hooks/use-theme";

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          aria-label={`Switch to ${t.label} theme`}
          title={t.label}
          className="w-5 h-5 rounded-full transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
          style={{
            backgroundColor: t.previewColor,
            boxShadow: theme === t.id ? `0 0 0 2px white, 0 0 0 3.5px ${t.previewColor}` : undefined,
          }}
        />
      ))}
    </div>
  );
};
