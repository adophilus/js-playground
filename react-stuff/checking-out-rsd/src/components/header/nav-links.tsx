import { tokens } from "../../styles/tokens.css";
import { html, css } from "react-strict-dom";

const items = [
  {
    label: "Overview",
    link: "/",
    isActive: true,
  },
  { label: "Activity", link: "/activity" },
  { label: "Manage", link: "/manage" },
  { label: "Program", link: "/program" },
  { label: "Account", link: "/account" },
  { label: "Reports", link: "/reports" },
];

export const NavLinks = () => (
  <html.ul style={styles.container}>
    {items.map((item) => (
      <html.ol
        key={item.link}
        style={[styles.item, item.isActive ?? styles.itemActive]}
      >
        {item.label}
      </html.ol>
    ))}
  </html.ul>
);

const styles = css.create({
  container: {
    display: "flex",
    padding: "8px",
    backgroundColor: tokens.colorWhite,
    height: "32px",
    gap: "16px",
    borderRadius: "32px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    paddingInline: "8px",
  },
  itemActive: {
    backgroundColor: tokens.colorBlack,
    color: tokens.colorWhite,
  },
});
