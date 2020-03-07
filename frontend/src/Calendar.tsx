import React, { ReactElement, useEffect, useState } from 'react';
import { classes, style, stylesheet } from 'typestyle';
import { Registration } from './DTOs';
import axios from 'axios';
import { DateTime } from 'luxon';
import { H1 } from './constants';
import RegistrationPopup from './RegistrationPopup';
import { HOST } from './App';

const styles = stylesheet({
    calendar: {
        gridColumnStart: 2,
        gridColumnEnd: 3,
    },
    dayOfWeek: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    eventGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' },
    header: { margin: '1em' },
    headerDate: { ...H1, fontWeight: 'bold' },
    headerWeekday: { fontSize: '1.2em' },
    eventDisplay: {
        textAlign: 'center',
        margin: '.5em',
        border: `.5px solid rgb(230 229 230)`,
        borderRadius: '4px',
        padding: '1em',
        boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.05)',
        minHeight: '38px',
        background: 'white',
    },
    eventImportantText: { fontWeight: 'bold' },
    italic: { fontStyle: 'italic', color: '#777676' },
    clickable: {
        cursor: 'pointer',
        $nest: {
            '&:hover': {
                color: 'rgb(19 157 244)',
            },
        },
    },
    popupAnchor: { position: 'relative' },
});

const eventDates: EventDate[] = [
    { day: '2020-04-07', hours: [14, 15, 16, 17] },
    { day: '2020-04-08', hours: [14, 15, 16, 17] },
    { day: '2020-04-09', hours: [14, 15, 16, 17] },
    { day: '2020-04-10', hours: [16, 17, 18, 19] },
    { day: '2020-04-11', hours: [14, 15, 16, 17] },
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

    useEffect(() => {
        const escFunction = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                setOpenRegistration(null);
            }
        };
        document.addEventListener('keydown', escFunction, false);
        return () => {
            document.removeEventListener('keydown', escFunction, false);
        };
    }, []);

    const [openRegistration, setOpenRegistration] = useState<string | null>(null);

    const dateHeaders = eventDates.map(({ day }) => <DateHeader key={day} day={day} />);

    const eventsPerDay = eventDates.map(eventDate => (
        <div key={eventDate.day}>
            {hours.map(hour => {
                const eventTimestamp = `${eventDate.day}T${hour}:00:00Z`;
                const available = registrations
                    .filter(r => r.timeFrameBegin === eventTimestamp)
                    .map(({ quantity }) => quantity)
                    .reduce((prev, current) => {
                        return Math.max(0, prev - current);
                    }, 8);
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
    const asDate = DateTime.fromISO(day).setLocale('de');

    return (
        <div className={styles.header}>
            <div>
                <span className={styles.headerDate}>
                    {asDate.toLocaleString({ month: 'long', day: 'numeric' })}
                </span>
                <span className={style(H1)}> {asDate.toLocaleString({ year: 'numeric' })}</span>
            </div>
            <div className={styles.headerWeekday}>{asDate.toLocaleString({ weekday: 'long' })}</div>
        </div>
    );
}

type EventProps = {
    isHappening: boolean;
    date: string;
    hour: number;
    availableSlots: number;
    onClick: () => void;
};
function Event({ isHappening, date, hour, availableSlots, onClick }: EventProps): ReactElement {
    if (!isHappening) {
        return (
            <div className={classes(styles.eventDisplay, styles.italic)}>
                {hour} Uhr findet keine Veranstaltung statt
            </div>
        );
    } else if (availableSlots === 0) {
        return (
            <div className={classes(styles.eventDisplay, styles.italic)}>alle Plätze belegt</div>
        );
    }

    return (
        <div className={classes(styles.eventDisplay, styles.clickable)} onClick={onClick}>
            <small>{availableSlots} Plätze frei</small>
            <div className={styles.eventImportantText}>{`${dayOfTheWeek(date)} ${hour}:00`}</div>
        </div>
    );
}

function dayOfTheWeek(dateString: string): string {
    const dayIdx = new Date(dateString).getDay();

    switch (dayIdx) {
        case 0:
            return 'So';
        case 1:
            return 'Mo';
        case 2:
            return 'Di';
        case 3:
            return 'Mi';
        case 4:
            return 'Do';
        case 5:
            return 'Fr';
        case 6:
            return 'Sa';
        default:
            throw new Error(`invalid day of the week ${dayIdx}. I only know of 7 days per week`);
    }
}

export default Calendar;
