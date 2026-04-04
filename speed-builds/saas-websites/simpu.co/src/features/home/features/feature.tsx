import type { FunctionComponent } from "react";
import type { TFeature } from "./types";
import { Button } from "#/components/button";
import * as stylex from "@stylexjs/stylex";
import { Link } from "@tanstack/react-router";

export const Feature: FunctionComponent<{ feature: TFeature }> = ({
  feature,
}) => (
  <div key={feature.id} id={feature.id} {...stylex.props(styles.container)}>
    <div {...stylex.props(styles.textContainer)}>
      <hgroup>
        <p {...stylex.props(styles.highlight)}>{feature.highlight}</p>
        <header {...stylex.props(styles.title)}>{feature.title}</header>
      </hgroup>
      <p {...stylex.props(styles.description)}>{feature.description}</p>
      <div {...stylex.props(styles.ctaContainer)}>
        <Link to="/login" {...stylex.props(styles.ctaLink)}>
          <Button>Get started</Button>
        </Link>
      </div>
    </div>
    <div {...stylex.props(styles.imageContainer)}>
      <img src={feature.imageUrl} alt={feature.id} />
    </div>
  </div>
);

const styles = stylex.create({
  container: {
    backgroundColor: "rgb(248 248 250)",
    paddingBlock: {
      default: "1.5rem",
      "@media (min-width: 1024px)": "8rem",
    },
    paddingInline: {
      default: "1.5rem",
      "@media (min-width: 1024px)": "3rem",
    },
    borderRadius: "0.375rem",
    display: "flex",
    alignItems: {
      default: "stretch",
      "@media (min-width: 1024px)": "center",
    },
    columnGap: "6rem",
    rowGap: "2rem",
    flexDirection: {
      default: "column-reverse",
      "@media (min-width: 1024px)": "row",
    },
  },
  textContainer: { width: "100%" },
  imageContainer: { width: "100%" },
  highlight: {
    textTransform: "uppercase",
    color: "rgb(0 101 235)",
    fontWeight: 600,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontFamily: "Lato",
  },
  title: {
    fontWeight: 700,
    fontSize: {
      default: "2.25rem",
      "@media (min-width: 1024px)": "3rem",
    },
    fontFamily: "Lato",
    lineHeight: 1,
    marginTop: "1rem",
    maxWidth: {
      default: "413px",
      "@media (min-width: 1024px)": "580px",
    },
  },
  description: {
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    fontFamily: "Lato",
    marginTop: "1.5rem",
    color: "rgb(77 77 77)",
    maxWidth: "480px",
  },
  ctaLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: {
      default: "stretch",
      "@media (min-width: 1024px)": "flex-start",
    },
  },
  ctaContainer: { marginTop: "2.5rem" },
});
