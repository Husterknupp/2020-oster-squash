import React, { ReactElement } from 'react';
import { stylesheet } from 'typestyle';
import { H1 } from './constants';

const styles = stylesheet({
    centralGridBlock: {
        gridColumnStart: 2,
        gridColumnEnd: 3,
    },
    header: {
        ...H1,
        margin: '16px',
    },
    content: {
        margin: '0 16px',
        $nest: {
            '& > div': {
                margin: '.5em 0',
            },
        },
    },
    bold: {
        fontWeight: 'bold',
    },
    address: {
        margin: '.3em 0',
    },
});

export function Impressum(): ReactElement {
    return (
        <div className={styles.centralGridBlock}>
            <div className={styles.header}>Impressum</div>
            <div className={styles.content}>
                <div>
                    <span className={styles.bold}>Ostern ERlebt</span>
                    <div>
                        Vor 2000 Jahren hat Jesus Christus durch seinen Tod und seine Auferstehung
                        die Weltgeschichte nachhaltig verändert. Doch wie war das eigentlich damals?
                        Eine Reise in die Vergangenheit leitet Sie nach Jerusalem und lässt Sie
                        Ostern mit allen Sinnen erfassen.
                        <br />
                        Eine professionelle Reisebegleitung führt Sie Schritt für Schritt durch die
                        biblischen Ereignisse. Dieser Weg ermöglicht eine lebendige Erfahrung, die
                        bis heute Menschenleben berührt und verändert.
                    </div>
                    <div>
                        Sind Sie neugierig geworden?
                        <br />
                        Haben Sie Mut, sich auf etwas Außergewöhnliches einzulassen!
                    </div>
                    <div>
                        Bitte planen Sie mindestens eine Stunde für die Rundreise ein. Anschließend
                        gibt es noch offene Angebote zum Verweilen.
                        <br />
                        Sie können sich als Einzelperson oder auch als Gruppe (max. 8 Personen)
                        anmelden.
                    </div>
                    <div>
                        Hinweis: Um Ihre Zeit in Jerusalem so lückenlos und stressfrei wie möglich
                        erleben zu können, möchten wir alle Teilnehmenden bitten, pünktlich zu sein
                    </div>
                </div>
                <div>
                    Die St. Georgen-Kirche gehört zur{' '}
                    <span className={styles.bold}>Evangeliumsgemeinde Halle e. V. </span>(
                    <a href={'https://evangeliumsgemeinde.de'}>evangeliumsgemeinde.de</a>):
                    <div>Glauchaer Str. 77</div>
                    <div>06110 Halle/S.</div>
                </div>
                <div>
                    Veranstalter ist der{' '}
                    <span className={styles.bold}>Gemeinsam für Halle e. V. </span>(
                    <a href={'https://gfhalle.de'}>gfHalle.de</a>)
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
                        Entwickelt hat sie Benjamin Schandera aus Halle (husterknupp at outlook.com)
                        mit freier Software, gehostet auf{' '}
                        <a
                            href={'https://github.com/Husterknupp/2020-oster-squash'}
                            target={'_blank'}
                        >
                            GitHub.com
                        </a>{' '}
                        und{' '}
                        <a href={'https://uberspace.de'} target={'_blank'}>
                            Uberspace.de
                        </a>
                    </div>
                </div>
                <div>
                    <span className={styles.bold}>Bildnachweis: </span> Bruno von der Kraan (
                    <a href={'https://unsplash.com/photos/v2HgNzRDfII'} target={'_blank'}>
                        Unsplash.com
                    </a>
                    )
                </div>
            </div>
        </div>
    );
}
