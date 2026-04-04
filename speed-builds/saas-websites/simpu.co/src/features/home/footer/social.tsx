import type { FunctionComponent } from "react";
import type { TSocial } from "./type";
import * as stylex from "@stylexjs/stylex";

export const Social: FunctionComponent<{ social: TSocial }> = ({ social }) => (
  <span key={social.id} {...stylex.props(styles.container)}>
    <social.icon color="white" width={24} height={24} />
  </span>
);

const styles = stylex.create({
  container: {
    backgroundColor: "rgb(255 255 255 / 0.15)",
    display: "flex",
    width: "40px",
    aspectRatio: "1 / 1",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    ":hover": {
      backgroundColor: "rgb(255 255 255 / 0.3)",
      cursor: "pointer",
    },
  },
});
