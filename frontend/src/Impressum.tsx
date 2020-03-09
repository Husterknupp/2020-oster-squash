import React, { ReactElement } from 'react';
import { stylesheet } from 'typestyle';
import { H1, SUBTLE_LINK } from './constants';

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

export function Datenschutz(): ReactElement {
    return (
        <div className={styles.centralGridBlock}>
            <h2>Datenschutz</h2>
            <p>
                Zweck des Datenschutzes ist, Sie als Einzelnen davor zu schützen, durch
                willkürlichen Umgang mit Ihren personenbezogenen Daten in Ihrem „Grundrecht auf
                informationelle Selbstbestimmung“ beeinträchtigt zu werden. Dahinter steht der
                Grundsatz, dass jeder Mensch selbst entscheidet, wem wann welche seiner persönlichen
                Daten zugänglich sein sollen.
            </p>
            <p>
                <div>
                    Verhindert werden soll, dass wir als Betreiber Wissen über den Nutzer unserer
                    Website erlangen mit dem er/sie z.B. bedrängt, manipuliert oder gar ausgegrenzt
                    werden könnte.
                </div>
                <div>
                    Ein paar Informationen brauchen wir allerdings, sonst funktioniert die Anmeldung
                    zum Event nicht.
                </div>
            </p>
            <h3>Inhalt</h3>
            <p>
                <ol>
                    <li>
                        <a href={'#Browserinformationen'} className={SUBTLE_LINK}>
                            Browserinformationen
                        </a>
                    </li>
                    <li>
                        <a href={'#Speichern-der-Emailadresse'} className={SUBTLE_LINK}>
                            Speichern der Emailadresse
                        </a>
                    </li>
                    <li>
                        <a href={'#Cookies'} className={SUBTLE_LINK}>
                            Cookies
                        </a>
                    </li>
                    <li>
                        <a href={'#Webtracking'} className={SUBTLE_LINK}>
                            Webtracking
                        </a>
                    </li>
                    <li>
                        <a href={'#Rechte-der-betroffenen-Person'} className={SUBTLE_LINK}>
                            Rechte der betroffenen Person
                        </a>
                    </li>
                    <li>
                        <a href={'#Datenschutzbeauftragter'} className={SUBTLE_LINK}>
                            Datenschutzbeauftragter
                        </a>
                    </li>
                </ol>
            </p>

            <h3 id={'Browserinformationen'}>Browserinformationen</h3>
            <p>
                Die Provider dieser Seite (
                <a href={'https://uberspace.de/en/about/'} target={'_blank'}>
                    Uberspace.de
                </a>{' '}
                und{' '}
                <a href={'https://github.com/about'} target={'_blank'}>
                    GitHub.com
                </a>
                ) erheben und speichern automatisch Informationen in so genannten Server-Log Files,
                die Ihr Browser automatisch an sie übermittelt.
            </p>
            <p>
                Dies sind:
                <ul>
                    <li>Browsertyp und -version</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Website, von der Sie uns aus besuchen (Referrer URL)</li>
                    <li>Webseite, die Sie besuchen</li>
                    <li>IP-Adresse (anonymisiert)</li>
                    <li>Datum und Uhrzeit Ihres Zugriffs</li>
                </ul>
            </p>
            <p>
                Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser
                Daten mit anderen Datenquellen wird nicht vorgenommen. Sie werden zu statistischen
                Zwecken ausgewertet, um die Website korrekt ausliefern zu können, und um
                gegebenenfalls Fehler im Programm beheben zu können. Im Falle einer Strafverfolgung
                müssen wir solche Informationen auch den Behörden zur Verfügung stellen können.
            </p>

            <h3 id={'Speichern-der-Emailadresse'}>Speichern der Emailadresse</h3>

            <p>
                Bei der Registrierung speichern wir Ihre Emailadresse, damit wir ggf. Kontakt
                aufnehmen können, falls eine Veranstaltung ausfällt oder sonst bezogen auf die
                Registrierung etwas dringend mitzuteilen ist.
            </p>
            <p>
                Es erfolgt keine Weitergabe der Emailadresse an Dritte. Auch gibt es keine sonstigen
                Überraschungen. Keine Newsletter, keine Angebote, kein Spam. Nach dem letzten Ostern
                ERlebt-Termin löschen wir die Emailadressen wieder.
            </p>

            <h3 id={'Cookies'}>Cookies</h3>
            <p>Wir benutzen keine Cookies.</p>
            <h3 id={'Webtracking'}>Webtracking / Web Analytics</h3>
            <p>Wir tracken kein Benutzerverhalten.</p>
            <h3 id={'Rechte-der-betroffenen-Person'}>Ihr Recht an Ihren Daten</h3>
            <p>
                Bei Fragen zu Ihren personenbezogenen Daten auf unserer Website haben Sie
                grundsätzlich ein Recht (
                <a href={'https://dejure.org/gesetze/DSGVO/15.html'} target={'_blank'}>
                    Art. 15ff. DSGVO
                </a>
                ) auf:
                <ul>
                    <li>Auskunft</li>
                    <li>Berichtigung</li>
                    <li>Widerspruch</li>
                    <li>Löschung</li>
                    <li>Einschränkung der Verarbeitung</li>
                    <li>Datenübertragbarkeit</li>
                </ul>
                Bitte wenden Sie sich dazu an den Datenschutzbeauftragten.
            </p>
            <h3 id={'Datenschutzbeauftragter'}>Datenschutzbeauftragter</h3>
            <p>
                <div>Verantwortlicher im Sinne der Datenschutz-Grundverordnung ist:</div>
                <div>
                    Gemeinsam für Halle e. V., Henry Marten, Richard-Wagner-Str. 55, 06114 Halle
                    Saale
                </div>
            </p>
        </div>
    );
}
