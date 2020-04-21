# Todos Oster-App

Prioritized task list + backlog

## Prio

- [ ] #traceability: log registration events
- [ ] a11y? Tab indices?
- [ ] mobile-freundlich (https://github.com/faisalman/ua-parser-js | request.META['HTTP_USER_AGENT'] | "Desktop-Seite anfordern" | UA b/c pixel density gets considered: tablet and desktop might have same screen res, but on tablet you go with 2-column, on desktop with 3-column)

## Backlog

- [ ] /version
- [ ] popup failure case: please write email to adlknwld
- [ ] footer sticky?
- [ ] loading placeholder (for available spots)
- [ ] uber.space "-bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory"
- [ ] deploy.sh: after pull, if code changed, start all over again
- [ ] deploy.sh: try to 'kill -9' only when there are processes running
- [ ] gh-pages: pipeline that deploys frontend on every commit (see maahdh)
- [ ] repair broken css in /admin django pages (broke it with `DEBUG=False` setting)
- [ ] daily overview over (new) registrations (people per eventDate + registrations for date~now())
- [ ] model-translator: start off from json/xml and create DTOs/django model/views/admin fields
- [ ] manifest.json - kill it?
- [ ] GitHub: is it routing my other GitHub pages sites?
- [ ] webpack to configure backend url
- [ ] react-router: append to existing path, don't replace everything in path (only relevant when coming already w/ path, eg, GitHub pages url)

## Done

- [x] proper Footer/disclaimer (react-router)
- [x] save url
- [x] deploy somewhere
- [x] Header Bild kleiner!
- [x] prettier w/ formatting like fsuite
- [x] pip requirements.txt file
- [x] django security settings
- [x] django admin user
- [x] datenbank-Abfrage (für Email-Adressen)
- [x] get email addresses not saved anymore?
- [x] is timezone a problem? (GIVEN I am in CET WHEN I register for 'Monday, 15:00' THEN I expect the db `timeFrameBegin` to be 'Monday, 15:00', not 'Monday, 14:00')
- [x] Preis einarbeiten
- [x] Titel - Text kürzen/einarbeiten
- [x] kein U12
- [x] registration state: show only "WAITING_FOR_SANITY_CHECK"|"CHECKED" - not "DELETED"
- [x] favicon
- [x] Impressum: Tech Stack (kudos to uber.space + GitHub + header image)
- [x] Datenschutz schreiben
- [x] Schrift einarbeiten (Open Sans Condensed b/c it has regular+b+i) (https://fonts.google.com/specimen/Open+Sans+Condensed?preview.text=Penultimate&preview.text_type=custom&selection.family=Abel|Open+Sans+Condensed:wght@700|Wire+One&sidebar.open&query=abe)
- [->] weißer Text in Header nicht lesbar vor weißem Licht Hintergrund (-> responsive/mobile)
- [x] url "verlinken" ostern-erlebt-halle.de (HTTPS + incl. CORS) -> Learnings siehe Notes
- [x] qr code an Miriam + www.url.de -> url.de + http(s) ?
- [x] Impressum: 90 Minuten statt 60
- [x] Flyer-info is more than Header shows - make complete info available somewhere
- [x] Genaue Adresse auf Frontseite
- [x] Toni: Bitte keine Feedback-Emails oder so mithilfe der Registrierungs-Email
- [x] Inhalte finden/Impressum umbenennen mit Toni klären (ggf. verlinken auf https://www.gfhalle.de/-Veranstaltungen--Ostern-ERlebt.php6) -> kein verlinken notwendig
- [x] Event-Information à la eventim direkt unter Kalender?
- [x] Browser/Whatsapp preview
- [x] apple touch icon? is that being used for whatsapp preview? -> yes it is
- [x] lighthouse test -> includ fonts + minimize image size (webp/jpg2000) - thanks https://ezgif.com/png-to-webp
