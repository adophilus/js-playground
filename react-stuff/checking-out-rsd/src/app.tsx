import { html, css } from "react-strict-dom";

export const App = () => <html.div style={styles.container} />;

const styles = css.create({
  container: { backgroundColor: "#ff0000", height: "100px", width: "100px" },
});
