require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const CUSTOM_OBJECT_TYPE = process.env.HUBSPOT_CUSTOM_OBJECT_TYPE || 'pets';

const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    'Content-Type': 'application/json',
};

// ROUTE 1 - Homepage: fetch the custom object's records and render them in a table.
app.get('/', async (req, res) => {
    const objectsUrl = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}?properties=name,species,favorite_toy`;
    try {
        const resp = await axios.get(objectsUrl, { headers });
        const data = resp.data.results;
        res.render('homepage', { title: 'Pets | Integrating With HubSpot I Practicum', data });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send('Something went wrong fetching the pets.');
    }
});

// ROUTE 2 - Render the form to add a new custom object record.
app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

// ROUTE 3 - Handle the form submission by creating a new custom object record, then redirect home.
app.post('/update-cobj', async (req, res) => {
    const newRecord = {
        properties: {
            name: req.body.name,
            species: req.body.species,
            favorite_toy: req.body.favorite_toy,
        },
    };

    const objectsUrl = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
    try {
        await axios.post(objectsUrl, newRecord, { headers });
        res.redirect('/');
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send('Something went wrong saving the pet.');
    }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
