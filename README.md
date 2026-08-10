# Welcome to the Integrating With HubSpot I: Foundations Practicum

This repository is for the Integrating With HubSpot I: Foundations course. This practicum is one of two requirements for receiving your Integrating With HubSpot I: Foundations certification. You must also take the exam and receive a passing grade (at least 75%).

To read the full directions, please go to the [practicum instructions](https://app.hubspot.com/academy/l/tracks/1092124/1093824/5493?language=en).

**Put your HubSpot developer test account custom objects URL link here:** https://app.hubspot.com/contacts/&lt;test-account-id&gt;/objects/&lt;custom-object-id&gt;/views/all/list

___
## What this app does

A small Node/Express app backed by a HubSpot custom object called **Pets** (name, species, favorite toy — "name" is the required string property). It has three routes:

- `GET /` — fetches every Pet record from HubSpot and renders them in a table (`views/homepage.pug`).
- `GET /update-cobj` — renders a form for adding a new Pet (`views/updates.pug`).
- `POST /update-cobj` — creates the new Pet record via the HubSpot API, then redirects back to `/`.

## Setup

1. Create a HubSpot developer test account, then a private app titled **"&lt;first name&gt;'s Practicum Private App"** with these scopes:
   - `crm.schemas.custom` (read and write)
   - `crm.objects.custom` (read and write)
   - `crm.objects.contacts` (read and write)
2. Copy `.env.example` to `.env` and paste the private app's access token in as `HUBSPOT_PRIVATE_APP_TOKEN`.
3. `npm install`
4. `node setup-custom-object.js` — creates the Pets custom object schema (associated with Contacts) and three sample records. It prints an `objectTypeId` — add it to `.env` as `HUBSPOT_CUSTOM_OBJECT_TYPE` (this defaults to `pets`, which also works once the schema exists).
5. `node index.js`, then visit http://localhost:3000.

___
## Tips:
- Commit to your repository often. Even if you make small tweaks to your code, it’s best to be committing to your repository frequently.
- The subject of the custom object is up to you. Feel free to get creative!
- Please create a test account, but DO NOT include your private app access token in your repo.
- Ensure you re-merge any working branches into the main branch.
- DO NOT ADD YOUR PRIVATE APP TOKEN TO YOUR REPOSITORY.

## Pre-requisites:
- Using [Node](https://nodejs.org/en/download) and node packages
- Using [Express](https://expressjs.com/en/starter/installing.html)
- Using [Axios](https://axios-http.com/docs/intro)
- Using [Pug templating system](https://pugjs.org/api/getting-started.html)
- Using the command line
- Using [Git and GitHub](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners)

## Requirements
- All work must be your own. During the grading process we will check the revision history. Submissions that do not meet this requirement will not be considered.
- You must have at least three new routes in your index.js file and two new pug templates, one for the homepage and one for the form.
- You must create a developer test account and link to the custom object list page in your README.md file (see above). Submissions that do not meet this requirement will not be considered.
