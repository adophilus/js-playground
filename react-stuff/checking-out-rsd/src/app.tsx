import { html, css } from "react-strict-dom";
import { tokens } from "./styles/tokens.css";
import { Header } from "./components/header";
import { Overview } from "./components/overview";

export const App = () => (
  <html.main style={styles.container}>
    <Header />
    <Overview />
  </html.main>
);

const styles = css.create({
  container: {
    backgroundColor: tokens.colorGrey,
    padding: "24px",
    fontFamily: tokens.fontBody,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
});
