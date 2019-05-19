const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);

const app = require('express')();

// Read the query from the command line arguments
// const query = process.argv[2];

const ncSchema = require('../schema');
const graphqlHTTP = require('express-graphql');
// const { graphql } = require('graphql');

// // Execute the query against the defined server schema
// graphql(ncSchema, query).then(result => {
//     console.log(result);
// });

const { MongoClient } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

MongoClient.connect(mConfig.url, (err, mPool) => {
    assert.equal(err, null);
    console.log("Connected successfully to mongodb server");
    console.log("mConfig.url " + mConfig.url);

    app.use('/graphql', graphqlHTTP({
        schema: ncSchema,
        graphiql: true,
        context: { pgPool, mPool }
    }));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});


