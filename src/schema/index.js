import {SchemaComposer} from "graphql-compose";
import {UserMutation, UserQuery} from "./user";
import {TaskMutation, TaskQuery} from "./task";

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...UserQuery,
  ...TaskQuery,
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...TaskMutation,
});

export default schemaComposer.buildSchema();
