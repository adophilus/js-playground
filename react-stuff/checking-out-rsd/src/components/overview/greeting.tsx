import { css, html } from "react-strict-dom";

export const Greeting = () => (
  <html.div>
    <html.header style={styles.heading}>Good morning, Sajibur</html.header>
    <html.p style={styles.subHeading}>
      Stay on top of your tasks, monitor progress, and track status.
    </html.p>
  </html.div>
);

const styles = css.create({
  heading: {
    fontSize: "2rem",
  },
  subHeading: {
    fontWeight: 200,
  },
});
