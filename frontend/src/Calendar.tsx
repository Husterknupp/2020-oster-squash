import React, { ReactElement, useEffect, useState } from "react";
import { classes, stylesheet } from "typestyle";
import { Registration } from "./DTOs";
import axios from "axios";
import { DateTime } from "luxon";
import { NestedCSSProperties } from "typestyle/lib/types";

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
    boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.05)",
    minHeight: "38px"
  },
  eventImportantText: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
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
/* todo
 * create registration when clicking on a date todo
 ** Popup: consider availableSlots
 ** Popup: real date
 ** sum up attendants correctly
 ** loading state in popup / success feedback
 ** validation / creation on backend side
 * loading placeholder (for available spots)
 * registration state: show only "WAITING_FOR_SANITY_CHECK"|"CHECKED" - not "DELETED"
 * overview for tony:
 ** with password protection (b/c of email addresses) - can we leverage django auth mechanism?
 ** how many 12 or younger?
 ** approve/sanity check
 ** delete
 * a11y?
 * proper landing page design ("Artwork") - wie auf eventim artist page (https://www.eventim.de/artist/morrissey/)
 * proper Footer/disclaimer
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
  const [isOutdated, setIsOutdated] = useState(true);
  useEffect(() => {
    if (!isOutdated) return;

    const getRegistrations = async () => {
      const registrations = await axios.get(
        "http://localhost:8000/api/registrations/"
      );
      setRegistrations(registrations.data as Registration[]);
      setIsOutdated(false);
    };
    getRegistrations().catch(console.error);
  }, [isOutdated]);

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
                onClose={registrationSuccessful => {
                  setOpenRegistration(null);
                  setIsOutdated(registrationSuccessful);
                }}
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

const buttonStyles: NestedCSSProperties = {
  width: "100%",
  display: "inline-block",
  border: "none",
  textDecoration: "none",
  fontSize: "1em",
  cursor: "pointer",
  textAlign: "center",
  "-webkit-appearance": "none",
  "-moz-appearance": "none"
};

const popupStyles = stylesheet({
  popup: {
    position: "absolute",
    top: "-300px",
    width: "22vw",
    height: "18em",
    backgroundColor: "wheat",
    left: "-31px",
    zIndex: 1,
    boxShadow: "0px 0px 200px rgba(0, 0, 0, 0.23)",
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
  close: {
    $nest: {
      "& > button": {
        ...buttonStyles,
        transition: "transform 150ms ease",
        background: "transparent"
      },
      "& > button:active": {
        transform: "scale(0.90)"
      }
    }
  },
  submit: {
    paddingTop: "1em",
    $nest: {
      "& > button": {
        ...buttonStyles,
        transition: "background 250ms ease-in-out, transform 150ms ease",
        background: "rgb(19 157 244)",
        color: "white",
        padding: ".8em 2em",
        margin: "0"
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
  onClose: (registrationSuccessful: boolean) => void;
};
function RegistrationPopup({
  availableSlots,
  date,
  eventTimestamp,
  hour,
  onClose
}: RegistrationPopupProps): ReactElement {
  const [adultsCount, setAdultsCount] = useState<number | null>(null);
  const [childCount, setChildCount] = useState<number | null>(null);
  const [emailAddress, setEmailAddress] = useState<string | null>(null);

  return (
    <form
      className={popupStyles.popup}
      onSubmit={event => {
        event.preventDefault();
        const payload: Registration = {
          timeFrameBegin: eventTimestamp,
          adultsCount,
          childCount,
          emailAddress
        } as Registration;
        axios
          .post("http://localhost:8000/api/registrations/", payload)
          .finally(() => onClose(true));
      }}
    >
      <div className={popupStyles.header}>
        <div>Anmelden für Dienstag, 7.4.2020, 14-15 Uhr</div>
        <div className={popupStyles.close}>
          <button type={"button"} onClick={() => onClose(false)}>
            X
          </button>
        </div>
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
      <div className={classes(styles.eventDisplay, styles.italic)}>
        um {hour} Uhr findet keine Veranstaltung statt
      </div>
    );
  } else if (availableSlots === 0) {
    return (
      <div className={classes(styles.eventDisplay, styles.italic)}>
        alle Plätze belegt
      </div>
    );
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
