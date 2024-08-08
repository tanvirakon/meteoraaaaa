import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const TasksCollection = new Mongo.Collection("todos");

const TaskSchema = new SimpleSchema({
  text: { type: String, required: true, min: 1 },
  //   khali box o empty hisebe chle ase. tai minimum string lenght 1 kre dlm..
  createdAt: Date,
});

TasksCollection.schema = TaskSchema;
