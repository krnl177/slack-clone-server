import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
// import typeDefs from './schema';
import fs from 'fs';
import resolvers from './resolvers';
import { sequelize } from './models'
require("dotenv").config;

const PORT = process.env.PORT || 3000;
const path = '/graphql'
const app = express();
app.use(express.json())

const typeDefs = gql(fs.readFileSync('./schema.graphql', {encoding: 'utf8'}))

const server = new ApolloServer({
    typeDefs,
    resolvers
})
server.applyMiddleware({ app, path })

app.listen(PORT, async () => {
    console.log('server is running on', PORT);
    await sequelize.sync({})
    console.log('Database Connected...');
})
