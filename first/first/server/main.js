import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/api/TasksCollection.js";

// const insertTask = (taskText) => TasksCollection.insert({ text: taskText });
const insertTask = [];

Meteor.startup(() => {
  if (TasksCollection.find().countAsync() === 0) {
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
