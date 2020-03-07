# Todos Oster-App

Prioritized task list + backlog

## Prio

* [ ] kein U12
* [ ] Datenschutz schreiben
* [ ] url "verlinken" (HTTPS + incl. CORS)
* [ ] popup failure case: please write email to adlknwld
* [ ] a11y? Tab indices?
* [ ] Schrift einarbeiten

## Backlog

* [ ] /version
* [ ] favicon
* [ ] footer sticky?
* [ ] mobile-freundlich
* [ ] loading placeholder (for available spots)
* [ ] registration state: show only "WAITING_FOR_SANITY_CHECK"|"CHECKED" - not "DELETED"
* [ ] uber.space "-bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory"
* [ ] deploy.sh: after pull, if code changed, start all over again
* [ ] deploy.sh: try to 'kill -9' only when there are processes running
* [ ] gh-pages: pipeline that deploys frontend on every commit (see maahdh)
* [ ] repair broken css in /admin django pages (broke it with `DEBUG=False` setting)
* [ ] Impressum: Tech Stack (kudos to uber.space + GitHub + header image)
* [ ] daily overview over (new) registrations (people per eventDate + registrations for date~now())
* [ ] Flyer-info is more than Header shows - make complete info available somewhere

## Done

* [x] proper Footer/disclaimer (react-router)
* [x] save url
* [x] deploy somewhere
* [x] Header Bild kleiner!
* [x] prettier w/ formatting like fsuite
* [x] pip requirements.txt file
* [x] django security settings
* [x] django admin user
* [x] datenbank-Abfrage (für Email-Adressen)
* [x] get email addresses not saved anymore?
* [x] is timezone a problem? (GIVEN I am in CET WHEN I register for 'Monday, 15:00' THEN I expect the db `timeFrameBegin` to be 'Monday, 15:00', not 'Monday, 14:00')
* [x] Preis einarbeiten
* [x] Titel - Text kürzen/einarbeiten
