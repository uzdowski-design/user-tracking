# User Engagement Tracking

App to mock user engagement testing.  
After landing on homepage user's data is generated (fake API used for mock-up) and stored in database. Then after scrolling deep enough this information about user is also stored in database.  
Report with engagement summary and users engagement details is displayed at /report page.

## Backend

Node.js & Express.js

## API

**POST** `/api/users/new` - create new user with fake data fetched from external API (https://random-data-api.com/api/v2/users)

**POST** `/api/users/scroll` - update user's scroll property after scrolling deep enough into the page

**GGET** `/api/users/report` - get report summary

**GGET** `/api/users/users` - get detailed information about users engagement

## Database

MongoDB

## Frontned

React + Typescript + Vite

## Contenerization

Encapsulated with Docker and Docker-Compose

`docker compose up --build` - build and run all containers
