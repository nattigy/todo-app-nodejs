import {Task, TaskTC} from "../models/task";
import {User, UserTC} from "../models/user";

const TaskQuery = {
  taskById: TaskTC.getResolver("findById"),
  taskByIds: TaskTC.getResolver("findByIds"),
  taskOne: TaskTC.getResolver("findOne"),
  taskMany: TaskTC.getResolver("findMany"),
  taskCount: TaskTC.getResolver("count"),
  taskConnection: TaskTC.getResolver("connection"),
  taskPagination: TaskTC.getResolver("pagination"),
  taskOwner: TaskTC.addRelation("owner", {
    resolver: () => UserTC.getResolver("findById"),
    prepareArgs: {
      _id: (source) => source.owner,
    },
    projection: {owner: 1},
  }),
};

TaskTC.addResolver({
  name: "businessAddToFavorite",
  kind: "mutation",
  type: TaskTC,
  args: {user_id: "String", business_id: "String"},
  resolve: async ({args}) => {
    await Task.updateOne(
      {_id: args.business_id},
      {$addToSet: {favoriteList: args.user_id}}
    ).then(async () => {
      await User.updateOne(
        {_id: args.user_id},
        {$addToSet: {favorites: args.business_id}}
      );
    }).catch((error) => error);
    return Task.findById(args.business_id);
  },
});

const TaskMutation = {
  taskCreateOne: TaskTC.getResolver("createOne"),
  taskCreateMany: TaskTC.getResolver("createMany"),
  taskUpdateById: TaskTC.getResolver("updateById"),
  taskAddToFavorite: TaskTC.getResolver("businessAddToFavorite"),
  // taskRemoveFromFavorite: TaskTC.getResolver("businessRemoveFromFavorite"),
  taskUpdateOne: TaskTC.getResolver("updateOne"),
  taskUpdateMany: TaskTC.getResolver("updateMany"),
  taskRemoveById: TaskTC.getResolver("removeById"),
  taskRemoveOne: TaskTC.getResolver("removeOne"),
  taskRemoveMany: TaskTC.getResolver("removeMany"),
};

export {TaskQuery, TaskMutation};
