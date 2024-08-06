// a JavaScript entry point loaded on the client
// import "../imports/ui/app.js";
import { Template } from "meteor/templating";
import "./main.html";
import { TasksCollection } from "../imports/api/TasksCollection.js";

Template.mainContainer.helpers({
  async tasks() {
    return await TasksCollection.find({});
  },
});
