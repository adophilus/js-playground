import { links } from "./data";
import * as stylex from "@stylexjs/stylex";

export const Links = () => (
  <ul {...stylex.props(styles.container)}>
    {links.map((link) => (
      <li key={link.link}>
        <a href={link.link} {...stylex.props(styles.link)}>
          {link.label}
        </a>
      </li>
    ))}
  </ul>
);

const styles = stylex.create({
  container: {
    marginTop: {
      default: "1.25rem",
      "@media (min-width: 1024px)": "2.5rem",
    },
    display: "flex",
    flexDirection: {
      default: "column",
      "@media (min-width: 1024px)": "row",
    },
    gap: {
      default: "1.25rem",
      "@media (min-width: 1024px)": "2.5rem",
    },
  },
  link: {
    color: "rgb(255 255 255 / 0.8)",
    fontSize: {
      "@media (min-width: 1024px)": "0.875rem",
    },
    lineHeight: "1.25rem",
    fontFamily: "Lato",
    ":hover": {
      color: "rgb(255 255 255)",
    },
  },
});
