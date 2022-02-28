import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from "express";
import resolvers from './resolver/resolver.js';
import typeDefs from './schema/schema.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import mongoDataMethods from './data/db.js';
import { graphqlUploadExpress } from 'graphql-upload';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('database is connected!!');
    })
    .catch((err) => {
        console.log('err: ' + err);
    })

    
app.use(graphqlUploadExpress());
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());
app.use(express.static('public'));

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ mongoDataMethods }) })
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    app.listen(PORT, () => { console.log(`Server ready at http://localhost:4000${server.graphqlPath}`) });
}

startServer();