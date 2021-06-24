import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

export const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    firebaseId: {
      type: String,
    },
    tasks: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Task",
        },
      ],
      default: [],
    },
  },
  {
    collection: "users",
  }
);

UserSchema.plugin(timestamps);

UserSchema.index({createdAt: 1, updatedAt: 1});

export const User = mongoose.model("User", UserSchema);
export const UserTC = composeWithMongoose(User);
