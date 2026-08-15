import { HugeiconsIcon } from "@hugeicons/react";
import { tokens } from "../../styles/tokens.css";
import { html, css } from "react-strict-dom";
import {
  BellDotIcon,
  InformationCircleIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

const items = [
  { label: "Search", icon: Search01Icon },
  { label: "Notifications", icon: BellDotIcon },
  { label: "Info", icon: InformationCircleIcon },
];

export const NavTools = () => (
  <html.ul style={styles.container}>
    {items.map((item) => (
      <html.ol key={item.label}>
        <html.button style={styles.item}>
          <HugeiconsIcon icon={item.icon} />
        </html.button>
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
    borderWidth: "0px",
    cursor: "pointer",
  },
  itemActive: {
    backgroundColor: tokens.colorBlack,
    color: tokens.colorWhite,
  },
});
