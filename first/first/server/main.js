import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/api/TasksCollection.js";
import "../imports/api/methods";

Meteor.startup(async () => {
  if ((await TasksCollection.find().countAsync()) <= 1) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach(insertTask);
  }
});

const insertTask = async (taskText) =>
  await TasksCollection.insertAsync({ text: taskText });
