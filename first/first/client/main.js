// err
import { Template } from "meteor/templating";
import "./main.html";
import { TasksCollection } from "../imports/api/TasksCollection.js";
import { Meteor } from "meteor/meteor";

// return todo from db
Template.mainContainer.helpers({
  async tasks() {
    return await TasksCollection.find({});
    // why not async..server was async
  },
});

// form submit
Template.form.events({
  "submit .task-form": async (e) => {
    e.preventDefault();
    let value = e.target.text.value; //how..destructating works
    await Meteor.call("insertData", { value }, (err) => {
      alert(err.error);
      console.log("err--", err.error);
    });
    // value = " "; only eta dle hbe na. ete local "value" ta clear hy, actual dom clear krte hbe
    e.target.text.value = "";
  },
});

// dlt
Template.task.events({
  "click .dlt-tdo"() {
    TasksCollection.remove(this._id);
  },
});
