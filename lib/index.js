const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

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

app.use('/graphql', graphqlHTTP({
    schema: ncSchema,
    graphiql: true
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});