# Oster Anmeldung

Backend and frontend for registration website for local event in easter season.

## Backend

`$ python manage.py migrate` to create/update database schema (sqlite)

`$ python manage.py runserver` to start the backend

## Frontend

`frontend $ npm start` maps backend model [`OsterAnmeldung/models.py`](OsterAnmeldung/models.py) and starts webpack in hot reload

## After Model Change

`$ python manage.py makemigrations OsterAnmeldung`
