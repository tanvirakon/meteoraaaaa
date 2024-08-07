import { error } from "jquery";
import { TasksCollection } from "./TasksCollection.js";

Meteor.methods({
  insertData({ value }) {
    if (!value) throw new Meteor.Error("cant be empty");

    return TasksCollection.insertAsync({
      text: value,
      createdAt: new Date(),
    });
  },
});
