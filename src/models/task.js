import mongoose, {Schema} from "mongoose";
import timestamps from "mongoose-timestamp";
import {composeWithMongoose} from "graphql-compose-mongoose";

export const TaskSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["NOT_STARTED", "STARTED", "DONE"],
      default: "NOT_STARTED",
    },
    isDaily: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
    },
    dueDate: {
      type: Date,
      index: true,
    },
    reminderTime: {
      type: String,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "tasks",
  }
);

TaskSchema.plugin(timestamps);

TaskSchema.index({createdAt: 1, updatedAt: 1});

export const Task = mongoose.model("Task", TaskSchema);
export const TaskTC = composeWithMongoose(Task);
