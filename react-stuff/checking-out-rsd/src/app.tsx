import { html, css } from "react-strict-dom";
import { tokens } from "./styles/tokens.css";
import { Header } from "./components/header";

export const App = () => (
  <html.main style={styles.container}>
    <Header />
  </html.main>
);

const styles = css.create({
  container: { backgroundColor: tokens.colorGrey, padding: "24px" },
});
