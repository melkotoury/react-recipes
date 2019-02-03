const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //needed for json requests and responses
require('dotenv').config({path: '.env'});
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// Bring in graphql Middleware
const {graphqlExpress , graphiqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Create schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

// connects to database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.error(err));

// Initializes application

const app = express();

// Create GraphiQL application
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}
));

// Connect schemas with GraphQl
app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({
    schema,
    context: {
        Recipe,
        User
    }
}));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});