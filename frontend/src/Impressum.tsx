import React, { ReactElement } from 'react';
import { stylesheet } from 'typestyle';
import { SUBTLE_LINK } from './constants';

const styles = stylesheet({
    centralGridBlock: {
        gridColumnStart: 2,
        gridColumnEnd: 3,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export function Impressum(): ReactElement {
    return (
        <div className={styles.centralGridBlock}>
            <h2>Impressum</h2>
            Wer ist wofür verantwortlich?
            <h3 className={styles.bold}>Ostern ERlebt</h3>
            <p>
                Vor 2000 Jahren hat Jesus Christus durch seinen Tod und seine Auferstehung die
                Weltgeschichte nachhaltig verändert. Doch wie war das eigentlich damals? Eine Reise
                in die Vergangenheit leitet Sie nach Jerusalem und lässt Sie Ostern mit allen Sinnen
                erfassen.
                <br />
                Eine professionelle Reisebegleitung führt Sie Schritt für Schritt durch die
                biblischen Ereignisse. Dieser Weg ermöglicht eine lebendige Erfahrung, die bis heute
                Menschenleben berührt und verändert.
            </p>
            <p>
                Sind Sie neugierig geworden?
                <br />
                Haben Sie Mut, sich auf etwas Außergewöhnliches einzulassen!
            </p>
            <p>
                Bitte planen Sie mindestens eine Stunde für die Rundreise ein. Anschließend gibt es
                noch offene Angebote zum Verweilen.
                <br />
                Sie können sich als Einzelperson oder auch als Gruppe (max. 8 Personen) anmelden.
            </p>
            <p>
                Hinweis: Um Ihre Zeit in Jerusalem so lückenlos und stressfrei wie möglich erleben
                zu können, möchten wir alle Teilnehmenden bitten, pünktlich zu sein.
            </p>
            <h3>Ort & Veranstalter</h3>
            <p>
                Die St. Georgen-Kirche gehört zur{' '}
                <span className={styles.bold}>Evangeliumsgemeinde Halle e. V. </span>(
                <a href={'https://evangeliumsgemeinde.de'}>evangeliumsgemeinde.de</a>):
                <br />
                Glauchaer Str. 77
                <br />
                06110 Halle/S.
            </p>
            <p>
                Veranstalter ist der <span className={styles.bold}>Gemeinsam für Halle e. V. </span>
                (<a href={'https://gfhalle.de'}>gfHalle.de</a>)
            </p>
            <h3 className={styles.bold}>Internetauftritt</h3>
            <p>Anbieter und verantwortlich für den Inhalt dieser Seite ist</p>
            <p>
                Antonia Gerdemann
                <br />
                Wörmlitzer Str. 101
                <br />
                06110 Halle/S.
            </p>
            <p>
                Entwickelt hat sie Benjamin Schandera aus Halle (husterknupp at outlook.com) mit{' '}
                <a href={'https://github.com/Husterknupp/2020-oster-squash'} target={'_blank'}>
                    freier Software
                </a>
                , gehostet auf GitHub.com und{' '}
                <a href={'https://uberspace.de'} target={'_blank'}>
                    Uberspace.de
                </a>
            </p>
            <h3 className={styles.bold}>Das krasse Bild</h3>
            <p>
                .. im Titel hat uns frei zur Verfügung gestellt: Bruno von der Kraan (
                <a href={'https://unsplash.com/photos/v2HgNzRDfII'} target={'_blank'}>
                    Unsplash.com
                </a>
                )
            </p>
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
                Verhindert werden soll, dass wir als Betreiber Wissen über den Nutzer unserer
                Website erlangen mit dem er/sie z.B. bedrängt, manipuliert oder gar ausgegrenzt
                werden könnte. <br />
                Ein paar Informationen brauchen wir allerdings, sonst funktioniert die Anmeldung zum
                Event nicht.
            </p>
            <h3>Inhalt</h3>
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
            <p>Dies sind:</p>
            <ul>
                <li>Browsertyp und -version</li>
                <li>verwendetes Betriebssystem</li>
                <li>Website, von der Sie uns aus besuchen (Referrer URL)</li>
                <li>Webseite, die Sie besuchen</li>
                <li>IP-Adresse (anonymisiert)</li>
                <li>Datum und Uhrzeit Ihres Zugriffs</li>
            </ul>
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
            </p>
            <ul>
                <li>Auskunft</li>
                <li>Berichtigung</li>
                <li>Widerspruch</li>
                <li>Löschung</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
            </ul>
            <p>Bitte wenden Sie sich dazu an den Datenschutzbeauftragten.</p>
            <h3 id={'Datenschutzbeauftragter'}>Datenschutzbeauftragter</h3>
            <p>
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung ist:
                <br />
                Gemeinsam für Halle e. V., Henry Marten, Richard-Wagner-Str. 55, 06114 Halle Saale
            </p>
        </div>
    );
}
