import { tokens } from "../../styles/tokens.css";
import {
  DashboardSquare03Icon,
  Calendar03Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { html, css } from "react-strict-dom";

const items = [
  { label: "Overview", link: "/", isActive: true, icon: DashboardSquare03Icon },
  { label: "Schedule", link: "/schedule", icon: Calendar03Icon },
  { label: "Inbox", link: "/schedule", icon: Mail01Icon },
];

export const SidebarNavigation = () => (
  <html.ul style={styles.container}>
    {items.map((item) => (
      <html.li key={item.link}>
        <html.button style={[styles.item, item.isActive && styles.itemActive]}>
          <HugeiconsIcon icon={DashboardSquare03Icon} size={18} />
        </html.button>
      </html.li>
    ))}
  </html.ul>
);

const styles = css.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingInline: "8px",
    borderRadius: "40px",
    width: "40px",
    gap: "16px",
    backgroundColor: tokens.colorWhite,
    paddingBlock: "8px",
  },
  item: {
    height: "32px",
    width: "32px",
    borderRadius: "32px",
    color: tokens.colorBlack,
    backgroundColor: tokens.colorWhite,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
  },
  itemActive: {
    color: tokens.colorWhite,
    backgroundColor: tokens.colorBlack,
  },
});
