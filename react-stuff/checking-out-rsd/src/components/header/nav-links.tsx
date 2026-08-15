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
      <html.ol key={item.link}>
        <html.a href={item.link}>
          <html.button
            style={[styles.item, item.isActive && styles.itemActive]}
          >
            {item.label}
          </html.button>
        </html.a>
      </html.ol>
    ))}
  </html.ul>
);

const styles = css.create({
  container: {
    display: "flex",
    backgroundColor: tokens.colorWhite,
    height: "40px",
    alignItems: "center",
    gap: "16px",
    borderRadius: "32px",
    paddingInline: "8px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    paddingInline: "8px",
    height: "32px",
    borderRadius: "32px",
    fontWeight: 200,
    borderWidth: "0px",
    cursor: "pointer",
  },
  itemActive: {
    backgroundColor: tokens.colorBlack,
    color: tokens.colorWhite,
  },
});
