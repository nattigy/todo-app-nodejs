import {User, UserTC} from "../models/user";
import {TaskTC} from "../models/task";

//This query resolvers are defined by the mongoose library
const UserQuery = {
  userById: UserTC.getResolver("findById"),
  userByIds: UserTC.getResolver("findByIds"),
  userOne: UserTC.getResolver("findOne"),
  userMany: UserTC.getResolver("findMany"),
  userCount: UserTC.getResolver("count"),
  userConnection: UserTC.getResolver("connection"),
  userPagination: UserTC.getResolver("pagination"),
  //create connection with the task model during fetch time
  userTasks: UserTC.addRelation("tasks", {
    resolver: () => TaskTC.getResolver("findByIds"),
    prepareArgs: {
      _ids: (source) => source.tasks,
    },
    projection: {tasks: 1},
  }),
};

//sample user resolver to add a task to list of user tasks in user model
UserTC.addResolver({
  name: "userAddTask",
  kind: "mutation",
  type: UserTC,
  args: {task_id: "MongoID", user_id: "MongoID"},
  resolve: async ({args}) => {
    await User.updateOne(
      {_id: args.user_id},
      {$addToSet: {tasks: args.task_id}}
    ).catch((error) => error);
    return User.findById(args.id);
  },
});

//sample user resolver to remove a task from the list of user tasks in user model
UserTC.addResolver({
  name: "userRemoveTask",
  kind: "mutation",
  type: UserTC,
  args: {task_id: "MongoID", user_id: "MongoID"},
  resolve: async ({args}) => {
    await User.updateOne(
      {_id: args.user_id},
      {pull: {tasks: args.task_id}}
    ).catch((error) => error);
    return User.findById(args.id);
  },
});

//This mutations resolvers are defined by the mongoose library
const UserMutation = {
  userCreateOne: UserTC.getResolver("createOne"),
  userCreateMany: UserTC.getResolver("createMany"),
  userUpdateById: UserTC.getResolver("updateById"),
  userUpdateOne: UserTC.getResolver("updateOne"),
  userAddCoupon: UserTC.getResolver("userAddTask"),
  userRemoveCoupon: UserTC.getResolver("userRemoveTask"),
  userUpdateMany: UserTC.getResolver("updateMany"),
  userRemoveById: UserTC.getResolver("removeById"),
  userRemoveOne: UserTC.getResolver("removeOne"),
  userRemoveMany: UserTC.getResolver("removeMany"),
};

export {UserQuery, UserMutation};
