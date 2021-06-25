import dotenv from "dotenv";
import express from "express";
import {ApolloServer} from "apollo-server-express";

import "./utils/db";
import schema from "./schema";

dotenv.config();

//start the express app
const app = express();

/*Initiate the apollo server
add schema from which os built by the mongoose library
enable playground for demonstration purpose only
 */
const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  tracing: true,
  path: "/",
});

//add the express app to the apollo server as a middleware
server.applyMiddleware({
  app,
  path: "/",
  //remove cors policy to enable access from any client app
  // not recommended for production level apps(not secured)
  cors: "no-cors",
});

//Start the server at the specified port from .env file
app.listen({port: process.env.PORT}, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}`);
});
