import React from "react";
import "./App.css";
import { classes, stylesheet } from "typestyle";
import Calendar from "./Calendar";

/* todo
 * GitHub 2020-oster-brokkoli
 * create registration when clicking on a date
 * allow more details in popup panel
 * loading placeholder (for available spots)
 * a11y?
 * proper landing page design ("Artwork")
 * proper Footer/disclaimer
 */

const styles = stylesheet({
  fullHeight: { height: "100vh" },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "90px auto 90px",
    gridTemplateRows: "380px auto 50px"
  },
  artwork: {
    gridColumnStart: 1,
    gridColumnEnd: 4,
    gridRowStart: 1,
    gridRowEnd: 2,
    backgroundColor: "lightcyan"
  },
  footer: {
    gridColumnStart: 1,
    gridColumnEnd: 4,
    gridRowStart: 3,
    backgroundColor: "lightyellow"
  }
});

const App: React.FC = () => {
  return (
    <div className={classes(styles.gridContainer, styles.fullHeight)}>
      <Artwork />
      <Calendar />
      <Footer />
    </div>
  );
};

const Artwork: React.FC = () => {
  return <div className={styles.artwork}>Artwork</div>;
};

const Footer: React.FC = () => {
  return <div className={styles.footer}>Footer</div>;
};

export default App;
