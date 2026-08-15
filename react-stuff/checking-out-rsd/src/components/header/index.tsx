import { css, html } from "react-strict-dom";
import { tokens } from "../../styles/tokens.css";
import { NavLinks } from "./nav-links";
import { NavTools } from "./nav-tools";

export const Header = () => (
  <html.nav style={styles.navContainer}>
    <html.a style={styles.logoContainer}>
      <html.span style={styles.logoIcon} />
      LOGO
    </html.a>
    <NavLinks />
    <NavTools />
  </html.nav>
);

const styles = css.create({
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    backgroundColor: tokens.colorWhite,
    borderRadius: "40px",
    height: "40px",
    paddingInline: "8px",
  },
  logoIcon: {
    backgroundColor: tokens.colorOrange,
    width: "32px",
    height: "32px",
    borderRadius: "32px",
  },
  navContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
