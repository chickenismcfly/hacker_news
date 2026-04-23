import { configureAxe } from "jest-axe";

export const axe = configureAxe({
  rules: {
    // Disable region rule — not meaningful at component level in single-page apps
    region: { enabled: false },
  },
});
