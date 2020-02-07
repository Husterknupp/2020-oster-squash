import React from "react";
import "./App.css";
import { classes, stylesheet } from "typestyle";
import Calendar from "./Calendar";
import headerImage from "./assets/laura-siegal-1xmuSigXQ2Y-unsplash.jpg";

const styles = stylesheet({
  fullHeight: { height: "100vh" },
  grayishBackground: { background: "#f9fafb" },
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
    backgroundImage: `url(${headerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderBottom: "1px solid rgba(206, 175, 142, 0.41)"
  },
  description: {
    margin: "90px",
    color: "white",
    maxWidth: "300px",
    filter: "drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.28))"
  },
  descriptionDate: {
    marginTop: "1em"
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
    <div
      className={classes(
        styles.gridContainer,
        styles.fullHeight,
        styles.grayishBackground
      )}
    >
      <Artwork />
      <Calendar />
      <Footer />
    </div>
  );
};

const Artwork: React.FC = () => {
  return (
    <div className={styles.artwork}>
      <div className={styles.description}>
        <h1>Ostern</h1>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor
          quis velit sit amet iaculis. Nulla volutpat.
        </div>
        <div className={styles.descriptionDate}>07.04.2020 – 11.04.2020</div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return <div className={styles.footer}>Footer</div>;
};

export default App;
