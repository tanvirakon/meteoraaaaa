// imports/api/tasksPublications.js
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";


Meteor.publish("todoPublication", function publishTasks() {
  return TasksCollection.find();
});
