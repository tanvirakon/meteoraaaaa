// // a JavaScript entry point loaded on the client
// // import "../imports/ui/app.js";
// import { Template } from "meteor/templating";
// import "./main.html";
// import { Todos } from "../lib/collection.js";


// // Todos = new Mongo.Collection("todos");

// Template.mainContainer.helpers({
//   tasks: () => Todos.find(),
// });
// // Template.mainContainer.events({
// //   "click .add-btn": () => {
// //     var oldTodo = Session.get("tasks");
// //     oldTodo.push("NEW todo");
// //     console.log(oldTodo);
// //     Session.set("tasks", oldTodo);
// //   },
// // });

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Todos } from '../lib/collection.js'; // Ensure this path is correct
import './main.html';

Template.mainContainer.helpers({
  tasks: () => Todos.find(),
});
