import React, { ReactElement } from "react";
import { stylesheet } from "typestyle";
import { H1 } from "./constants";

const styles = stylesheet({
  centralGridBlock: {
    gridColumnStart: 2,
    gridColumnEnd: 3
  },
  header: {
    ...H1,
    margin: "16px"
  },
  content: {
    margin: "0 16px",
    $nest: {
      "& > div": {
        margin: ".5em 0"
      }
    }
  },
  bold: {
    fontWeight: "bold"
  },
  address: {
    margin: ".3em 0"
  }
});

export function Impressum(): ReactElement {
  return (
    <div className={styles.centralGridBlock}>
      <div className={styles.header}>Impressum</div>
      <div className={styles.content}>
        <div>
          Zurück in die Zukunft: Ostern ERlebt. soll bla bla und blubb und
          außerdem noch so und so. Es wird veranstaltet von dem Gemeinsam für
          Halle e.V. in den Räumen der Evangeliumsgemeinde Halle e.V.
        </div>
        <div>
          <span className={styles.bold}>Evangeliumsgemeinde Halle e. V.: </span>
          <a href={"https://evangeliumsgemeinde.de"}>evangeliumsgemeinde.de</a>
          <div>Glauchaer Str. 77</div>
          <div>06110 Halle/S.</div>
        </div>
        <div>
          <span className={styles.bold}>Gemeinsam für Halle e. V.: </span>
          <a href={"https://gfhalle.de"}>gfHalle.de</a>
        </div>
        <div>
          <div className={styles.bold}>Internetauftritt: </div>
          <div>
            Anbieter und verantwortlich für den Inhalt dieser Seite ist
            <div className={styles.address}>
              Antonia Gerdemann
              <br />
              Wörmlitzer Str. 101
              <br />
              06110 Halle/S.
            </div>
            Entwickelt hat sie Benjamin Schandera aus Halle (husterknupp at
            outlook.com)
          </div>
        </div>
        <div>
          <span className={styles.bold}>Bildnachweis: </span> Bruno von der
          Kraan (Unsplash)
        </div>
      </div>
    </div>
  );
}
