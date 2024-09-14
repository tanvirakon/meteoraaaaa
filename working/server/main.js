// btn show more pagination
// import { Meteor } from "meteor/meteor";
// import TasksCollection from "../common/postDb.js";
// import CommentCollection from "../common/commentDb.js";
// import "../imports/startup/server";

// Meteor.publish("tasks", function (limit) {
//   return TasksCollection.find({}, { sort: { createdAt: -1 }, limit: limit });
// });

// 1,2,3..pagination
// import { Meteor } from "meteor/meteor";
// import TasksCollection from "../common/postDb.js";
// import CommentCollection from "../common/commentDb.js";
// import "../imports/startup/server";
// import "../common/taskCountMethod.js";

// Meteor.publish("tasks", function (limit, skip) {
//   return TasksCollection.find({}, { limit: limit, skip: skip });
//   // limit, skip .. 2tai find() e ase
// });

import { Meteor } from "meteor/meteor";
import TasksCollection from "../common/postDb.js";
import CommentCollection from "../common/commentDb.js";
import "../imports/startup/server";
import "../common/taskCountMethod.js";

// Meteor.publish("tasks", function (limit) {
//   return TasksCollection.find({}, { limit: limit });
// });
// Meteor.publish("tasks", function (page, limit) {
//   return TasksCollection.find({}, { skip: (page - 1) * limit, limit: limit });
// });
Meteor.publish("tasks", function (limit, skip) {
  const data = TasksCollection.find({ skip: skip, limit: limit });
  return data;
});
