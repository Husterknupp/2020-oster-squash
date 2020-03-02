import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import "./App.css";
import { classes, stylesheet } from "typestyle";
import Calendar from "./Calendar";
import headerImage from "./assets/bruno-van-der-kraan-v2HgNzRDfII-unsplash-cropped.png";
import { Impressum } from "./Impressum";

const styles = stylesheet({
  fullHeight: { minHeight: "100vh" },
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
    backgroundPosition: "bottom",
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
    borderTop: "1px solid #e1e4e8",
    display: "flex",
    $nest: {
      "& > div": {
        fontSize: "small",
        margin: "auto 1em"
      }
    }
  },
  subtleLink: {
    color: "inherit",
    textDecoration: "inherit",
    $nest: {
      "&:hover": {
        textDecoration: "underline"
      }
    }
  }
});

const App: React.FC = () => {
  return (
    <Router>
      <div
        className={classes(
          styles.gridContainer,
          styles.fullHeight,
          styles.grayishBackground
        )}
      >
        <Artwork />
        <Content />
        <Footer />
      </div>
    </Router>
  );
};

const Artwork: React.FC = () => {
  return (
    <div className={styles.artwork}>
      <div className={styles.description}>
        <h1>
          <Link to={"/"} className={styles.subtleLink}>
            Zurück in die Zukunft: Ostern ERlebt
          </Link>
        </h1>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempor
          quis velit sit amet iaculis. Nulla volutpat.
        </div>
        <div className={styles.descriptionDate}>07.04.2020 – 11.04.2020</div>
      </div>
    </div>
  );
};

const Content: React.FC = () => {
  return (
    <Switch>
      <Route path="/datenschutz">
        <Impressum />
      </Route>
      <Route path="/impressum">
        <Impressum />
      </Route>
      <Route path="/">
        <Calendar />
      </Route>
    </Switch>
  );
};

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div>
        <Link to={"/impressum"} className={styles.subtleLink}>
          Impressum
        </Link>
      </div>
      <div>
        <Link to={"/datenschutz"} className={styles.subtleLink}>
          Datenschutz
        </Link>
      </div>
    </div>
  );
};

export default App;
