// One-time setup script — run with `node setup-custom-object.js` after you've
// created your HubSpot developer test account, a private app with the
// crm.schemas.custom, crm.objects.custom, and crm.objects.contacts scopes,
// and dropped that app's access token into a local .env file as
// HUBSPOT_PRIVATE_APP_TOKEN.
//
// Creates a "Pets" custom object schema (associated with the Contact object
// type), then adds three sample records. Prints the objectTypeId you need to
// paste into .env as HUBSPOT_CUSTOM_OBJECT_TYPE for index.js to use.

require('dotenv').config();
const axios = require('axios');

const TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
if (!TOKEN) {
    console.error('Missing HUBSPOT_PRIVATE_APP_TOKEN in .env — see .env.example.');
    process.exit(1);
}

const headers = {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
};

const OBJECT_NAME = 'pets';

const SCHEMA_BODY = {
    name: OBJECT_NAME,
    labels: { singular: 'Pet', plural: 'Pets' },
    primaryDisplayProperty: 'name',
    requiredProperties: ['name'],
    searchableProperties: ['name', 'species'],
    properties: [
        { name: 'name', label: 'Name', type: 'string', fieldType: 'text' },
        { name: 'species', label: 'Species', type: 'string', fieldType: 'text' },
        { name: 'favorite_toy', label: 'Favorite Toy', type: 'string', fieldType: 'text' },
    ],
    associatedObjects: ['CONTACT'],
};

const SAMPLE_RECORDS = [
    { name: 'Biscuit', species: 'Dog', favorite_toy: 'Tennis ball' },
    { name: 'Whiskers', species: 'Cat', favorite_toy: 'Feather wand' },
    { name: 'Peanut', species: 'Rabbit', favorite_toy: 'Cardboard tube' },
];

async function findExistingSchema() {
    try {
        const res = await axios.get(`https://api.hubapi.com/crm/v3/schemas/${OBJECT_NAME}`, { headers });
        return res.data;
    } catch (err) {
        if (err.response && err.response.status === 404) return null;
        throw err;
    }
}

async function createSchema() {
    const res = await axios.post('https://api.hubapi.com/crm/v3/schemas', SCHEMA_BODY, { headers });
    return res.data;
}

async function createRecord(properties) {
    const res = await axios.post(`https://api.hubapi.com/crm/v3/objects/${OBJECT_NAME}`, { properties }, { headers });
    return res.data;
}

(async () => {
    let schema = await findExistingSchema();
    if (schema) {
        console.log(`Schema "${OBJECT_NAME}" already exists — skipping creation.`);
    } else {
        console.log(`Creating "${OBJECT_NAME}" custom object schema...`);
        schema = await createSchema();
        console.log('Schema created.');
    }

    console.log(`\nobjectTypeId: ${schema.objectTypeId}`);
    console.log('Add this to your .env file as HUBSPOT_CUSTOM_OBJECT_TYPE, e.g.:');
    console.log(`HUBSPOT_CUSTOM_OBJECT_TYPE=${schema.objectTypeId}\n`);

    console.log('Creating sample records...');
    for (const record of SAMPLE_RECORDS) {
        const created = await createRecord(record);
        console.log(`  Created "${record.name}" (id ${created.id})`);
    }

    console.log('\nDone. Once index.js is running, visit http://localhost:3000 to see the table.');
})().catch((err) => {
    console.error(err.response ? err.response.data : err.message);
    process.exit(1);
});
