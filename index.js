import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
// import typeDefs from './schema';
import fs from 'fs';
import { sequelize, models } from './models'
import path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { print } from 'graphql'
import cors from 'cors';
require("dotenv").config;

const PORT = process.env.PORT || 3005;
const graphQLPath = '/graphql'
const app = express();
app.use(express.json())
app.use(cors())
const typesArray = loadFilesSync(path.join(__dirname, './schemas'), { recursive: true })
const typeDefs = mergeTypeDefs(typesArray)

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolversArray);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        models,
        user: {
            id: 1
        }
    },
})
server.applyMiddleware({ app, path: graphQLPath })

app.listen(PORT, async () => {
    console.log('server is running on', PORT);
    await sequelize.sync({})
    console.log('Database Connected...');
})
