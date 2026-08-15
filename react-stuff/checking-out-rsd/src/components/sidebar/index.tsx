import { html, css } from "react-strict-dom";
import { SidebarNavigation } from "./navigation";
import { tokens } from "../../styles/tokens.css";

export const Sidebar = () => (
  <html.div style={styles.container}>
    <SidebarNavigation />
    <SidebarNavigation />
    <SidebarNavigation />
  </html.div>
);

const styles = css.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
