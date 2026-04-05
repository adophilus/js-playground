import { MenuIcon } from "lucide-react";
import * as stylex from "@stylexjs/stylex";

export const Menu = () => (
  <div {...stylex.props(styles.container)}>
    <MenuIcon />
  </div>
);

const styles = stylex.create({
  container: {
    display: {
      default: "block",
      "@media (min-width: 1024px)": "none",
    },
  },
});
