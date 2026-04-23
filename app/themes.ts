export type ThemeId = "lilac" | "ocean" | "rose";

export type Theme = {
  id: ThemeId;
  label: string;
  previewColor: string;
};

export const themes: Theme[] = [
  { id: "lilac", label: "Lilac", previewColor: "#7c3aed" },
  { id: "ocean", label: "Ocean", previewColor: "#0284c7" },
  { id: "rose",  label: "Rose",  previewColor: "#e11d48" },
];

export const DEFAULT_THEME: ThemeId = "lilac";
