import { css, html } from "react-strict-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BellDotIcon,
  InformationCircleIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { tokens } from "@/styles/tokens.css";

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

const extras = [
  { label: "Search", icon: Search01Icon },
  { label: "Notifications", icon: BellDotIcon },
  { label: "Info", icon: InformationCircleIcon },
];

export const Header = () => (
  <html.nav>
    <html.a style={styles.logoContainer}>
      <html.span></html.span>
      LOGO
    </html.a>
    <html.ul>
      {items.map((item) => (
        <html.ol key={item.link}>{item.label}</html.ol>
      ))}
    </html.ul>
    <html.ul>
      {extras.map((extra) => (
        <html.ol key={extra.label}>
          <HugeiconsIcon icon={extra.icon} />
        </html.ol>
      ))}
    </html.ul>
  </html.nav>
);

const styles = css.create({
  logoContainer: { backgroundColor: tokens.colorWhite },
});
