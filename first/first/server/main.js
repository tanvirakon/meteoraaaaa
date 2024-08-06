import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/api/TasksCollection.js";

Meteor.startup(async () => {
  const count = await TasksCollection.find().countAsync();
  const data = await TasksCollection.find();
  console.log("count---", count);
  data.forEach((i, j) => {
    console.log(i);
  });

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
