import { css } from "react-strict-dom";

// Tokens = CSS custom properties, compiled away by babel.
// Must live at module top level (stylex compile requirement).
export const tokens = css.defineVars({
  colorOrange: "hsl(13, 84, 54)",
  colorBg: "#f4f4f5",
  colorWhite: "hsl(0, 0, 100)",
  colorBlack: "hsl(60, 15, 10)",
  colorGrey: "hsl(0, 0, 96)",
});
