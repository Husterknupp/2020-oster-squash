import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';
import { classes, stylesheet } from 'typestyle';
import Calendar from './Calendar';
import headerImage from './assets/bruno-van-der-kraan-v2HgNzRDfII-unsplash-cropped.png';
import { Datenschutz, Impressum } from './Impressum';
import { SUBTLE_LINK } from './constants';

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
        backgroundImage: `url(${headerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        borderBottom: '1px solid rgba(206, 175, 142, 0.41)',
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
    footer: {
        gridColumnStart: 1,
        gridColumnEnd: 4,
        gridRowStart: 3,
        borderTop: '1px solid #e1e4e8',
        display: 'flex',
        $nest: {
            '& > div': {
                fontSize: 'small',
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
    return (
        <div className={styles.artwork}>
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
                <Datenschutz />
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

export default App;
