import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';
import { classes, stylesheet } from 'typestyle';
import Calendar from './Calendar';
import { Datenschutz, Impressum } from './Impressum';
import { BOLD, H1, SUBTLE_LINK } from './constants';
import { ArtworkDesktop, ArtworkMobile } from './artwork';

// export const HOST = 'http://localhost:8000';
export const HOST = 'https://hstrknpp.uber.space';

const styles = stylesheet({
    fullHeight: { minHeight: '100vh' },
    grayishBackground: { background: '#f9fafb' },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '90px auto 90px',
        gridTemplateRows: '380px auto 50px',
    },
    artworkGridBlock: { gridColumnStart: 1, gridColumnEnd: 4, gridRowStart: 1, gridRowEnd: 2 },
    centralGridBlock: {
        gridColumnStart: 2,
        gridColumnEnd: 3,
    },
    eventInfo: {
        maxWidth: '1000px',
        $nest: {
            '& > p': {
                fontSize: '18px',
            },
        },
    },
    footer: {
        gridColumnStart: 1,
        gridColumnEnd: 4,
        gridRowStart: 3,
        borderTop: '1px solid #e1e4e8',
        display: 'flex',
        $nest: {
            '& > div': {
                margin: 'auto 1em',
            },
        },
    },
});

const App: React.FC = () => {
    return (
        <Router>
            <DeviceSwitch
                Phone={() => (
                    <div
                        className={classes(
                            styles.gridContainer,
                            styles.fullHeight,
                            styles.grayishBackground
                        )}
                    >
                        <ArtworkMobile className={styles.artworkGridBlock} />
                        <Content />
                        <Footer />
                    </div>
                )}
                Desktop={() => (
                    <div
                        className={classes(
                            styles.gridContainer,
                            styles.fullHeight,
                            styles.grayishBackground
                        )}
                    >
                        <ArtworkDesktop className={styles.artworkGridBlock} />
                        <Content />
                        <Footer />
                    </div>
                )}
            />
        </Router>
    );
};

type DeviceSwitchProps = {
    Phone: React.FC;
    Desktop: React.FC;
};
const DeviceSwitch: React.FC<DeviceSwitchProps> = ({ Desktop, Phone }) => {
    const [innerWidth, setInnerWidth] = useState<number | null>(null);
    useEffect(() => {
        const resize = () => setInnerWidth(window.innerWidth);
        window.addEventListener('resize', resize);
        resize();
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    if (!innerWidth) {
        return null;
    } else if (innerWidth < 1024) {
        return <Phone />;
    } else {
        return <Desktop />;
    }
};

const Content: React.FC = () => {
    return (
        <Switch>
            <Route path="/datenschutz">
                <Datenschutz className={styles.centralGridBlock} />
            </Route>
            <Route path="/impressum">
                <Impressum className={styles.centralGridBlock} />
            </Route>
            <Route path="/">
                <div className={styles.centralGridBlock}>
                    <Calendar />
                    <div className={styles.eventInfo}>
                        <h3 className={classes(H1, BOLD)}>Event-Information</h3>
                        <p>
                            Vor 2000 Jahren hat Jesus Christus durch seinen Tod und seine
                            Auferstehung die Weltgeschichte nachhaltig verändert. Doch wie war das
                            eigentlich damals? Eine Reise in die Vergangenheit leitet Sie nach
                            Jerusalem und lässt Sie Ostern mit allen Sinnen erfassen.
                            <br />
                            Eine professionelle Reisebegleitung führt Sie Schritt für Schritt durch
                            die biblischen Ereignisse. Dieser Weg ermöglicht eine lebendige
                            Erfahrung, die bis heute Menschenleben berührt und verändert.
                        </p>
                        <p>
                            Sind Sie neugierig geworden?
                            <br />
                            Haben Sie Mut, sich auf etwas Außergewöhnliches einzulassen!
                        </p>
                        <p>
                            Bitte planen Sie mindestens 90 Minuten für die Rundreise ein.
                            Anschließend gibt es noch offene Angebote zum Verweilen.
                            <br />
                            Sie können sich als Einzelperson oder auch als Gruppe (max. 8 Personen)
                            anmelden.
                        </p>
                        <p>
                            Hinweis: Um Ihre Zeit in Jerusalem so lückenlos und stressfrei wie
                            möglich erleben zu können, möchten wir alle Teilnehmenden bitten,
                            pünktlich zu sein.
                        </p>
                    </div>
                </div>
            </Route>
        </Switch>
    );
};

const Footer: React.FC = () => {
    return (
        <div className={styles.footer}>
            <div>
                <Link to={'/impressum'} className={SUBTLE_LINK}>
                    Impressum
                </Link>
            </div>
            <div>
                <Link to={'/datenschutz'} className={SUBTLE_LINK}>
                    Datenschutz
                </Link>
            </div>
        </div>
    );
};

// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.

export default App;
