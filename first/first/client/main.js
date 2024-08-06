// err
import { Template } from "meteor/templating";
import "./main.html";
import { TasksCollection } from "../imports/api/TasksCollection.js";

Template.mainContainer.helpers({
  async tasks() {
    return await TasksCollection.find({});
    // why not async..server was async
  },
});

Template.form.events({
  "submit .task-form": async (e) => {
    e.preventDefault();
    let value = e.target.text.value; //how..destructating works
    const newdd = TasksCollection.insert({
      text: value,
      createdAt: new Date(),
    });
    // value = " "; only eta dle hbe na. ete local "value" ta clear hy, actual dom clear krte hbe
    e.target.text.value = "";
  },
});

Template.task.events({
  "click .dlt-tdo"() {
    TasksCollection.remove(this._id);
  },
});
