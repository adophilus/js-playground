import { socials } from "./data";
import * as stylex from "@stylexjs/stylex";
import { Social } from "./social";

export const Socials = () => (
  <div {...stylex.props(styles.container)}>
    {socials.map((social) => (
      <Social key={social.id} social={social} />
    ))}
  </div>
);

const styles = stylex.create({
  container: {
    display: "flex",
    gap: "1.5rem",
  },
});
