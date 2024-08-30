import { Meteor } from 'meteor/meteor';
import TasksCollection from "./postDb.js";
Meteor.methods({
  getTotalTasksCount() {
    return TasksCollection.find().count();
  },
});
