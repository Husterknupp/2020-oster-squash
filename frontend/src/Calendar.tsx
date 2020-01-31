import React, { ReactElement, useEffect, useState } from "react";
import { classes, stylesheet } from "typestyle";
import { Registration } from "./DTOs";
import axios from "axios";
import { DateTime } from "luxon";

const styles = stylesheet({
  calendar: {
    gridColumnStart: 2,
    gridColumnEnd: 3
  },
  dayOfWeek: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)" },
  dateGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)" },
  header: { margin: "1em" },
  headerDate: { fontSize: "1.7em", fontWeight: "bold" },
  headerYear: { fontSize: "1.7em" },
  headerWeekday: { fontSize: "1.2em" },
  eventDisplay: {
    textAlign: "center",
    margin: ".5em",
    border: `.5px solid rgb(230 229 230)`,
    borderRadius: "10px",
    padding: "1em",
    boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.05)",
    minHeight: "38px"
  },
  eventImportantText: { fontWeight: "bold" },
  clickable: {
    cursor: "pointer",
    $nest: {
      "&:hover": {
        color: "rgb(19 157 244)"
      }
    }
  },
  popupContainer: { position: "relative" },
  popup: {
    position: "absolute",
    top: "-160px",
    width: "22vw",
    height: "140px",
    backgroundColor: "wheat",
    left: "-31px"
  }
});

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
* (2020-04-07T14:00:00.000+01:00)
* backend: 2020-04-07T15:00:00Z
 */

const eventDates: EventDate[] = [
  { day: "2020-04-07", hours: [14, 15, 16, 17] },
  { day: "2020-04-08", hours: [14, 15, 16, 17] },
  { day: "2020-04-09", hours: [14, 15, 16, 17] },
  { day: "2020-04-10", hours: [14, 15, 16, 17] },
  { day: "2020-04-11", hours: [14, 15, 16, 17] }
];
type EventDate = { day: string; hours: number[] };

const hours = Array.from(new Set(eventDates.flatMap(({ hours }) => hours)));

const Calendar: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  useEffect(() => {
    const getRegistrations = async () => {
      const registrations = await axios.get(
        "http://localhost:8000/api/registrations"
      );
      setRegistrations(registrations.data as Registration[]);
    };
    getRegistrations().catch(console.error);
  }, []);

  const [openRegistration, setOpenRegistration] = useState<string | null>(null);

  return (
    <div className={styles.calendar}>
      <div className={styles.dayOfWeek}>
        {eventDates.map(({ day }) => (
          <DateHeader key={day} day={day} />
        ))}
      </div>
      <div className={styles.dateGrid}>
        {eventDates.map(eventDate => (
          <div key={eventDate.day}>
            {hours.map(hour => {
              const event = `${eventDate.day}-${hour}`;
              const isOpen = openRegistration === event;
              return (
                <div className={styles.popupContainer}>
                  {isOpen && <div className={styles.popup}>Popup</div>}
                  <Event
                    isHappening={eventDate.hours.includes(hour)}
                    date={eventDate.day}
                    hour={hour}
                    registrations={registrations}
                    onClick={() => {
                      if (isOpen) {
                        setOpenRegistration(null);
                      } else {
                        setOpenRegistration(event);
                      }
                    }}
                    key={event}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

type DateHeaderProps = {
  day: string;
};
function DateHeader({ day }: DateHeaderProps): ReactElement {
  const asDate = DateTime.fromISO(day).setLocale("de");

  return (
    <div className={styles.header}>
      <div>
        <span className={styles.headerDate}>
          {asDate.toLocaleString({ month: "long", day: "numeric" })}
        </span>
        <span className={styles.headerYear}>
          {" "}
          {asDate.toLocaleString({ year: "numeric" })}
        </span>
      </div>
      <div className={styles.headerWeekday}>
        {asDate.toLocaleString({ weekday: "long" })}
      </div>
    </div>
  );
}

type EventProps = {
  isHappening: boolean;
  date: string;
  hour: number;
  registrations: Registration[];
  onClick: () => void;
};
function Event({
  isHappening,
  date,
  hour,
  registrations,
  onClick
}: EventProps): ReactElement {
  let available = 8;
  registrations
    .filter(r => r.timeFrameBegin === `${date}T${hour}:00:00Z`)
    .forEach(() => (available = Math.max(0, --available)));

  if (!isHappening) {
    return (
      <div className={styles.eventDisplay}>
        um {hour} Uhr findet keine Veranstaltung statt
      </div>
    );
  } else if (available === 0) {
    return <div className={styles.eventDisplay}>alle Plätze belegt</div>;
  }

  return (
    <div
      className={classes(styles.eventDisplay, styles.clickable)}
      onClick={onClick}
    >
      <small>{available} Plätze frei</small>
      <div className={styles.eventImportantText}>{`${dayOfTheWeek(
        date
      )} ${hour}:00`}</div>
    </div>
  );
}

function dayOfTheWeek(dateString: string): string {
  const dayIdx = new Date(dateString).getDay();

  switch (dayIdx) {
    case 0:
      return "So";
    case 1:
      return "Mo";
    case 2:
      return "Di";
    case 3:
      return "Mi";
    case 4:
      return "Do";
    case 5:
      return "Fr";
    case 6:
      return "Sa";
    default:
      throw new Error(
        `invalid day of the week ${dayIdx}. I only know of 7 days per week`
      );
  }
}

export default Calendar;
