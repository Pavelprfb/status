export type ThemeName = "light" | "dark";

export interface Theme {
  bg: string;
  card: string;
  border: string;
  text: string;
  subtext: string;
  muted: string;
  accent: string;
  accentSoft: string;
  chipBg: string;
  chipBorder: string;
  chipActive: string;
  inputBg: string;
  headerBg: string;
  heartOn: string;
  heartOff: string;
  overlay: string;
}

export const themes: Record<ThemeName, Theme> = {
  light: {
    bg: "#f8fafc",
    card: "#ffffff",
    border: "#e2e8f0",
    text: "#1e293b",
    subtext: "#475569",
    muted: "#94a3b8",
    accent: "#2563eb",
    accentSoft: "#dbeafe",
    chipBg: "#ffffff",
    chipBorder: "#e2e8f0",
    chipActive: "#2563eb",
    inputBg: "#ffffff",
    headerBg: "#ffffff",
    heartOn: "#f43f5e",
    heartOff: "#94a3b8",
    overlay: "rgba(15, 23, 42, 0.5)",
  },
  dark: {
    bg: "#020617",
    card: "#0f172a",
    border: "#1e293b",
    text: "#f1f5f9",
    subtext: "#cbd5e1",
    muted: "#64748b",
    accent: "#3b82f6",
    accentSoft: "rgba(59, 130, 246, 0.15)",
    chipBg: "#0f172a",
    chipBorder: "#1e293b",
    chipActive: "#3b82f6",
    inputBg: "#0f172a",
    headerBg: "#0f172a",
    heartOn: "#fb7185",
    heartOff: "#64748b",
    overlay: "rgba(2, 6, 23, 0.7)",
  },
};
