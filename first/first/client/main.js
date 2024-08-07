// err
import { Template } from "meteor/templating";
import "./main.html";
import { TasksCollection } from "../imports/api/TasksCollection.js";
import { Meteor } from "meteor/meteor";
import "../imports/templates/mainContainer.html";
import "../imports/templates/task.html";
import "../imports/templates/form.html";

// // return todo from db
Template.mainContainer.onCreated(function () {
  this.todoSub = this.subscribe("todoPublication");
});

Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find();
  },
  isLoading() {
    return !Template.instance().todoSub.ready();
  },
});

// form submit
Template.form.events({
  "submit .task-form": async (e) => {
    e.preventDefault();
    let value = e.target.text.value; //how..destructating works
    await Meteor.call("insertData", { value }, (err) => {
      if (err) {
        alert(err.error);
      }
    });
    // value = " "; only eta dle hbe na. ete local "value" ta clear hy, actual dom clear krte hbe
    e.target.text.value = "";
  },
});

// dlt
Template.task.events({
  async "click .dlt-tdo"() {
    await Meteor.call("dltData", { _id: this._id });
  },
});
