export const Colors = {
  primary: "#2A9D8F",
  primaryLight: "#52B5A8",
  secondary: "#48CAE4",
  secondaryLight: "#90E0EF",

  background: "#F0FAFB",
  surface: "#FFFFFF",

  text: "#1B2D3E",
  textSecondary: "#6B8DA3",

  border: "#D0E8ED",
  error: "#E76F51",

  white: "#FFFFFF",
  black: "#000000",

  favourite: "#F9A825",
} as const;

export type ColorKey = keyof typeof Colors;
