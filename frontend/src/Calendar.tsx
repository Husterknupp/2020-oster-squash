import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import { classes, stylesheet } from "typestyle";
import { Registration } from "./DTOs";
import axios from "axios";
import { DateTime } from "luxon";
import { NestedCSSProperties } from "typestyle/lib/types";
import { Spinner } from "./Spinner";

const HOST = "http://localhost:8000";

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
    minHeight: "38px",
    background: "white"
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

/* todo
 * loading placeholder (for available spots)
 * registration state: show only "WAITING_FOR_SANITY_CHECK"|"CHECKED" - not "DELETED"
 * overview for tony:
 ** with password protection (b/c of email addresses) - can we leverage django auth mechanism?
 ** how many 12 or younger?
 ** approve/sanity check
 ** delete
 * a11y? Tab indices?
 * proper landing page design ("Artwork") - wie auf eventim artist page (https://www.eventim.de/artist/morrissey/)
 * proper Footer/disclaimer
 * favicon
 * popup failure case: please write email to adlknwld
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
  const [isOutdated, setIsOutdated] = useState(true);
  useEffect(() => {
    if (!isOutdated) return;

    const getRegistrations = async () => {
      const registrations = await axios.get(`${HOST}/api/registrations/`);
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
          .map(({ childCount, adultsCount }) => childCount + adultsCount)
          .forEach(seatsTaken => {
            available = Math.max(0, available - seatsTaken);
          });
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
  /* mostly copied from https://css-tricks.com/overriding-default-button-styles/ */
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

const inputStyles: NestedCSSProperties = {
  /* shamelessly copied from stackoverflow search bar input */
  backgroundColor: "#fff",
  boxShadow: "none",
  color: "#3c4146",
  "-webkit-appearance": "none",
  padding: ".6em .7em",
  height: "3em",
  border: "1px solid #bbc0c4",
  borderRadius: "3px",
  fontSize: "13px",
  boxSizing: "border-box",
  transition: "box-shadow 150ms ease-in-out",
  $nest: {
    "&:focus": {
      outline: "none", // normalize Chrome behaviour (https://stackoverflow.com/questions/3397113/how-to-remove-focus-border-outline-around-text-input-boxes-chrome)
      boxShadow: "0px 0px 1px inset #139df4"
    }
  }
};

const popupStyles = stylesheet({
  popup: {
    position: "absolute",
    top: "-348px",
    width: "22vw",
    backgroundColor: "#f9fafb",
    left: "-31px",
    zIndex: 1,
    boxShadow: "0px 0px 200px rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    $nest: {
      "& > *": {
        margin: ".5em"
      }
    }
  },
  header: {
    display: "flex",
    justifyContent: "space-between"
  },
  availableSlots: {
    padding: ".5em",
    border: "1px solid transparent",
    borderRadius: "4px"
  },
  numberInput: {
    ...inputStyles,
    width: "3em"
  },
  redBorder: {
    border: "1px solid red"
  },
  peopleCount: {
    display: "flex",
    alignItems: "center", // vertical
    $nest: {
      "& > input": {
        marginRight: ".8em"
      },
      "& > small": {
        width: "100%"
      }
    }
  },
  emailInput: {
    paddingTop: "1em",
    $nest: {
      "& > input": {
        ...inputStyles,
        width: "100%"
      },
      "& > input:invalid:not(:placeholder-shown)": {
        /* thanks Zell https://zellwk.com/blog/check-empty-input-css/ */
        border: "1px solid red"
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
        transition: "filter 250ms ease-in-out, transform 150ms ease",
        background: "rgb(19 157 244)",
        color: "white",
        padding: ".8em 2em",
        margin: "0"
      },
      "& > button:hover,button:focus": {
        filter: "brightness(0.9)"
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
  const [emailAddress, setEmailAddress] = useState<string>("");
  const asDate = DateTime.fromISO(date).setLocale("de");
  const [submitState, setSubmitState] = useState<
    "READY_TO_SUBMIT" | "WAITING_FOR_RESPONSE" | "SUCCESS_RESPONSE"
  >("READY_TO_SUBMIT");

  const sum = (childCount || 0) + (adultsCount || 0);
  const adultsCountInvalid =
    !!adultsCount && (adultsCount > availableSlots || sum > availableSlots);
  const childCountInvalid =
    !!childCount && (childCount > availableSlots || sum > availableSlots);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const payload: Registration = {
      timeFrameBegin: eventTimestamp,
      adultsCount: adultsCount || 0,
      childCount: childCount || 0,
      emailAddress
    } as Registration;
    setSubmitState("WAITING_FOR_RESPONSE");
    axios
      .post(`${HOST}/api/registrations/`, payload)
      .catch(console.error)
      .finally(() => {
        setTimeout(() => setSubmitState("SUCCESS_RESPONSE"), 1000);
        setTimeout(() => onClose(true), 2200);
      });
  };

  let submitButton: ReactElement;
  switch (submitState) {
    case "READY_TO_SUBMIT": {
      submitButton = (
        <button
          type={"submit"}
          disabled={adultsCountInvalid || childCountInvalid}
        >
          ANMELDEN
        </button>
      );
      break;
    }
    case "WAITING_FOR_RESPONSE": {
      submitButton = (
        <button type={"button"}>
          <Spinner />
        </button>
      );
      break;
    }
    case "SUCCESS_RESPONSE": {
      submitButton = <button type={"button"}> Erfolgreich Angemeldet </button>;
    }
  }

  return (
    <form className={popupStyles.popup} onSubmit={onSubmit}>
      <div className={popupStyles.header}>
        <div>
          <div>
            Anmelden für{" "}
            {asDate.toLocaleString(
              Object.assign(DateTime.DATE_HUGE, { month: "numeric" })
            )}
          </div>
          <div>
            {hour}
            {" - "}
            {hour + 1} Uhr
          </div>
        </div>
        <div className={popupStyles.close}>
          <button type={"button"} onClick={() => onClose(false)}>
            X
          </button>
        </div>
      </div>
      <div
        className={classes(
          popupStyles.availableSlots,
          adultsCountInvalid || childCountInvalid ? popupStyles.redBorder : ""
        )}
      >
        {availableSlots} Plätze sind noch frei
      </div>
      <div className={popupStyles.peopleCount}>
        <input
          onChange={event => {
            const number = parseInt(event.target.value);
            setAdultsCount(isNaN(number) ? 0 : number);
          }}
          value={adultsCount !== null ? adultsCount : ""}
          autoFocus={true}
          className={classes(
            popupStyles.numberInput,
            adultsCountInvalid ? popupStyles.redBorder : ""
          )}
        />
        <small>Personen (12+ Jahre alt)</small>
      </div>
      <div className={popupStyles.peopleCount}>
        <input
          onChange={event => {
            const number = parseInt(event.target.value);
            setChildCount(isNaN(number) ? 0 : number);
          }}
          value={childCount !== null ? childCount : ""}
          className={classes(
            popupStyles.numberInput,
            childCountInvalid ? popupStyles.redBorder : ""
          )}
        />
        <small>
          Plätze zusätzlich für Kinder unter 12 (wir wollen das wissen, damit es
          ggf. nicht "zu authentisch" wird)
        </small>
      </div>
      <div className={popupStyles.emailInput}>
        <input
          type={"email"}
          required
          value={emailAddress}
          onChange={event => setEmailAddress(event.target.value)}
          placeholder={"Email Adresse"}
        />
      </div>
      <div className={popupStyles.submit}>{submitButton}</div>
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
