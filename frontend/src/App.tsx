import React, { useEffect } from "react";
import "./App.css";
import { Registration } from "./DTOs";
import { classes, stylesheet } from "typestyle";

/* todo
 * show free spots per date
 * create registration when clicking on a date
 * allow more details in popup panel
 * proper landing page design
 */

/*
<>
  <Header />
  <CalendarGrid> // wie auf eventim artist page (https://www.eventim.de/artist/morrissey/)
    const eventDates = [{day: "2020-04-07", hours: [14, 15, 16, 17]}, ..]
    {for day in eventDates
      {for hour in day
        <Event registrations day hour> // Context?
          const available = find available registrations for day/hour/'8 per day'
          <Timestamp day hour/>
          {available > 0 ?
            <RegistrationModal onRegistration={onRegistration}>Anmelden</Button>
            : "alles belegt"
          }
        </Event>
      }
    }
  </CalendarGrid>
  <Footer />
<>
*
* 2020-04-07T14:00:00.000+01:00
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
  calendar: {
    gridColumnStart: 2,
    gridColumnEnd: 3
  },
  dayOfWeek: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)" },
  dateGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)" },
  footer: {
    gridColumnStart: 1,
    gridColumnEnd: 4,
    gridRowStart: 3,
    backgroundColor: "lightyellow"
  }
});

function callBackend(): Promise<Registration[]> {
  return fetch("http://localhost:8000/api/registrations").then(fetchResponse =>
    fetchResponse.json().then(json => json as Registration[])
  );
}

const App: React.FC = () => {
  useEffect(() => {
    callBackend().catch(console.error);
  });

  return (
    <div className={classes(styles.gridContainer, styles.fullHeight)}>
      <Artwork />
      <Calendar />
      <Footer />
    </div>
  );
};

const Calendar: React.FC = () => {
  const eventDates = [
    { day: "2020-04-07", hours: [14, 15, 16, 17] },
    { day: "2020-04-08", hours: [14, 15, 16, 17] },
    { day: "2020-04-09", hours: [14, 15, 16, 17] },
    { day: "2020-04-10", hours: [14, 15, 16, 17] },
    { day: "2020-04-11", hours: [14, 15, 16, 17] }
  ];
  const hours = Array.from(new Set(eventDates.flatMap(({ hours }) => hours)));

  return (
    <div className={styles.calendar}>
      <div className={styles.dayOfWeek}>
        {eventDates.map(({ day }) => (
          <div>{day}</div>
        ))}
      </div>
      <div className={styles.dateGrid}>
        {eventDates.map(eventDate => (
          <div>
            {hours.map(hour => {
              if (eventDate.hours.includes(hour)) {
                return <div>{hour}</div>;
              } else {
                return <div>um {hour} Uhr keine Veranstaltung</div>;
              }
            })}
          </div>
        ))}
      </div>
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
