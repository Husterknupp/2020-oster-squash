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
  eventGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)" },
  header: { margin: "1em" },
  headerDate: { fontSize: "1.7em", fontWeight: "bold" },
  headerYear: { fontSize: "1.7em" },
  headerWeekday: { fontSize: "1.2em" },
  eventDisplay: {
    textAlign: "center",
    margin: ".5em",
    border: `.5px solid rgb(230 229 230)`,
    borderRadius: "4px",
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
  popupAnchor: { position: "relative" }
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
        "http://localhost:8000/api/registrations/"
      );
      setRegistrations(registrations.data as Registration[]);
    };
    getRegistrations().catch(console.error);
  }, []);

  const [openRegistration, setOpenRegistration] = useState<string | null>(null);

  const dateHeaders = eventDates.map(({ day }) => (
    <DateHeader key={day} day={day} />
  ));

  const eventsPerDay = eventDates.map(eventDate => (
    <div key={eventDate.day}>
      {hours.map(hour => {
        const eventTimestamp = `${eventDate.day}T${hour}:00:00Z`;
        let available = 8;
        registrations
          .filter(r => r.timeFrameBegin === eventTimestamp)
          .forEach(() => (available = Math.max(0, --available)));
        const isOpen = openRegistration === eventTimestamp;
        return (
          <div className={styles.popupAnchor} key={eventTimestamp}>
            {isOpen && (
              <RegistrationPopup
                date={eventDate.day}
                hour={hour}
                eventTimestamp={eventTimestamp}
                availableSlots={available}
              />
            )}
            <Event
              isHappening={eventDate.hours.includes(hour)}
              date={eventDate.day}
              hour={hour}
              availableSlots={available}
              onClick={() => {
                if (isOpen) {
                  setOpenRegistration(null);
                } else {
                  setOpenRegistration(eventTimestamp);
                }
              }}
            />
          </div>
        );
      })}
    </div>
  ));

  return (
    <div className={styles.calendar}>
      <div className={styles.dayOfWeek}>{dateHeaders}</div>
      <div className={styles.eventGrid}>{eventsPerDay}</div>
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

const popupStyles = stylesheet({
  popup: {
    position: "absolute",
    top: "-300px",
    width: "22vw",
    height: "18em",
    backgroundColor: "wheat",
    left: "-31px",
    zIndex: 1,
    $nest: {
      "& > *": {
        margin: ".5em"
      }
    }
  },
  header: {
    display: "flex",
    alignContent: "space-between"
  },
  adultsCount: {
    $nest: {
      "& > input": {
        marginRight: ".8em"
      }
    }
  },
  numberInput: {
    height: "2em",
    width: "3em",
    padding: "4px"
  },
  childCount: {
    display: "flex",
    $nest: {
      "& > input": {
        margin: "auto .8em auto auto"
      }
    }
  },
  emailInput: {
    paddingTop: "1em",
    $nest: {
      "& > input": {
        height: "2em",
        width: "calc(100% - 1em)",
        padding: "4px"
      }
    }
  },
  submit: {
    paddingTop: "1em",
    $nest: {
      "& > button": {
        width: "100%",
        display: "inline-block",
        border: "none",
        padding: "1rem 2rem",
        margin: "0",
        textDecoration: "none",
        background: "rgb(19 157 244)",
        color: "white",
        fontFamily: "sans-serif",
        fontSize: "1rem",
        cursor: "pointer",
        textAlign: "center",
        transition: "background 250ms ease-in-out, transform 150ms ease",
        "-webkit-appearance": "none",
        "-moz-appearance": "none"
      },
      "& > button:hover,button:focus": {
        background: "#0053ba"
      },
      "& > button:focus": {
        outline: "1px solid #fff",
        outlineOffset: "-4px"
      },
      "& > button:active": {
        transform: "scale(0.99)"
      }
    }
  }
});

type RegistrationPopupProps = {
  date: string;
  hour: number;
  eventTimestamp: string;
  availableSlots: number;
};
function RegistrationPopup({
  availableSlots,
  date,
  eventTimestamp,
  hour
}: RegistrationPopupProps): ReactElement {
  const [adultsCount, setAdultsCount] = useState<number | null>(null);
  const [childCount, setChildCount] = useState<number | null>(null);
  const [emailAddress, setEmailAddress] = useState<string | null>(null);

  return (
    <form
      className={popupStyles.popup}
      onSubmit={event => {
        const payload: Registration = {
          timeFrameBegin: eventTimestamp,
          adultsCount,
          childCount,
          emailAddress
        } as Registration;
        axios
          .post("http://localhost:8000/api/registrations/", payload)
          .finally(console.log);
        event.preventDefault();
      }}
    >
      <div className={popupStyles.header}>
        <div>Anmelden für Dienstag, 7.4.2020, 14-15 Uhr</div>
        <button type={"button"}>X</button>
      </div>
      <div className={popupStyles.adultsCount}>
        <input
          onChange={event => setAdultsCount(parseInt(event.target.value))}
          className={popupStyles.numberInput}
        />
        <small>Personen</small>
      </div>
      <div className={popupStyles.childCount}>
        <input
          onChange={event => setChildCount(parseInt(event.target.value))}
          className={popupStyles.numberInput}
        />
        <small>
          zusätzliche Personen jünger als 12 Jahre (wir passen auf, dass es
          nicht "zu authentisch" wird)
        </small>
      </div>
      <div className={popupStyles.emailInput}>
        <input
          onChange={event => setEmailAddress(event.target.value)}
          placeholder={"Email Adresse"}
        />
      </div>
      <div className={popupStyles.submit}>
        <button type={"submit"}>ANMELDEN</button>
      </div>
    </form>
  );
}

type EventProps = {
  isHappening: boolean;
  date: string;
  hour: number;
  availableSlots: number;
  onClick: () => void;
};
function Event({
  isHappening,
  date,
  hour,
  availableSlots,
  onClick
}: EventProps): ReactElement {
  if (!isHappening) {
    return (
      <div className={styles.eventDisplay}>
        um {hour} Uhr findet keine Veranstaltung statt
      </div>
    );
  } else if (availableSlots === 0) {
    return <div className={styles.eventDisplay}>alle Plätze belegt</div>;
  }

  return (
    <div
      className={classes(styles.eventDisplay, styles.clickable)}
      onClick={onClick}
    >
      <small>{availableSlots} Plätze frei</small>
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
