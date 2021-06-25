import {SchemaComposer} from "graphql-compose";
import {UserMutation, UserQuery} from "./user";
import {TaskMutation, TaskQuery} from "./task";

const schemaComposer = new SchemaComposer();

//import and merger all queries from the model
schemaComposer.Query.addFields({
  ...UserQuery,
  ...TaskQuery,
});

//import and merger all mutations from the model
schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...TaskMutation,
});

export default schemaComposer.buildSchema();
