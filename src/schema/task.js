import {Task, TaskTC} from "../models/task";
import {User, UserTC} from "../models/user";

//This query resolvers are defined by the mongoose library
const TaskQuery = {
  taskById: TaskTC.getResolver("findById"),
  taskByIds: TaskTC.getResolver("findByIds"),
  taskOne: TaskTC.getResolver("findOne"),
  taskMany: TaskTC.getResolver("findMany"),
  taskCount: TaskTC.getResolver("count"),
  taskConnection: TaskTC.getResolver("connection"),
  taskPagination: TaskTC.getResolver("pagination"),
  //create connection with the user model during fetch time
  taskOwner: TaskTC.addRelation("owner", {
    resolver: () => UserTC.getResolver("findById"),
    prepareArgs: {
      _id: (source) => source.owner,
    },
    projection: {owner: 1},
  }),
};

//This mutation resolvers are defined by the mongoose library
const TaskMutation = {
  taskCreateOne: TaskTC.getResolver("createOne"),
  taskCreateMany: TaskTC.getResolver("createMany"),
  taskUpdateById: TaskTC.getResolver("updateById"),
  taskUpdateOne: TaskTC.getResolver("updateOne"),
  taskUpdateMany: TaskTC.getResolver("updateMany"),
  taskRemoveById: TaskTC.getResolver("removeById"),
  taskRemoveOne: TaskTC.getResolver("removeOne"),
  taskRemoveMany: TaskTC.getResolver("removeMany"),
};

export {TaskQuery, TaskMutation};
