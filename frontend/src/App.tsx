import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';
import { classes, stylesheet } from 'typestyle';
import Calendar from './Calendar';
import webPImage from './assets/bruno-van-der-kraan-v2HgNzRDfII-unsplash-cropped.webp';
import jpg2000Image from './assets/bruno-van-der-kraan-v2HgNzRDfII-unsplash-cropped.jp2';
import { Datenschutz, Impressum } from './Impressum';
import { BOLD, H1, SUBTLE_LINK } from './constants';

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
    artwork: {
        gridColumnStart: 1,
        gridColumnEnd: 4,
        gridRowStart: 1,
        gridRowEnd: 2,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        borderBottom: '1px solid rgba(206, 175, 142, 0.41)',
    },
    safariImage: {
        backgroundImage: `url(${jpg2000Image})`,
    },
    defaultImage: {
        backgroundImage: `url(${webPImage})`,
    },
    description: {
        margin: '70px 0 0 90px',
        color: 'white',
        maxWidth: '310px',
        filter: 'drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.28))',
        fontWeight: 'bold',
    },
    descriptionDate: {
        marginTop: '1em',
    },
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
    const [webP, setwebP] = useState(true);
    useEffect(() => {
        (async () => {
            if (!(await isWebPUsable())) {
                setwebP(false);
            }
        })();
    }, []);

    return (
        <div
            className={classes(
                styles.artwork,
                webP && styles.defaultImage,
                !webP && styles.safariImage
            )}
        >
            <div className={styles.description}>
                <h1>
                    <Link to={'/'} className={SUBTLE_LINK}>
                        Zurück in die Zukunft: Ostern ERlebt
                    </Link>
                </h1>
                <div>
                    Jerusalem vor 2000 Jahren - tauchen Sie ein mit uns in das Leben und den Alltag
                    zur Zeit um Jesu Tod und Auferstehung.
                </div>
                <div className={styles.descriptionDate}>
                    7.04. – 11.04.2020 |{' '}
                    <a
                        href={'https://goo.gl/maps/UYABGJvm6A2YCKXH9'}
                        target={'_blank'}
                        title={'06110 Halle Saale - Google Maps'}
                        className={SUBTLE_LINK}
                    >
                        Glauchaer Str. 77
                    </a>
                </div>
                <div className={styles.descriptionDate}>
                    € 5 p.P. | Dauer: ca. 90 min | ab 12 Jahren
                </div>
            </div>
        </div>
    );
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

function isWebPUsable() {
    return Promise.all([
        check_webp_feature('alpha'),
        check_webp_feature('animation'),
        check_webp_feature('lossless'),
        check_webp_feature('lossy'),
    ]).then(anyWebPFeature => {
        return anyWebPFeature.some(featureEnabled => featureEnabled === true);
    });
}

// check_webp_feature:
//   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
//   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)
function check_webp_feature(feature: 'lossy' | 'lossless' | 'alpha' | 'animation') {
    return new Promise(resolve => {
        const kTestImages = {
            lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
            lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
            alpha:
                'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
            animation:
                'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
        };
        const img = new Image();
        img.onload = function() {
            resolve(img.width > 0 && img.height > 0);
        };
        img.onerror = function() {
            resolve(false);
        };
        img.src = 'data:image/webp;base64,' + kTestImages[feature];
    });
}

export default App;
