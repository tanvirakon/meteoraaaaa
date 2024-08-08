// err
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import "./main.html";
import { TasksCollection } from "../imports/api/TasksCollection.js";
import { Meteor } from "meteor/meteor";
import "../imports/templates/mainContainer.html";
import "../imports/templates/task.html";
import "../imports/templates/form.html";
import "../imports/templates/signup.html";
import "./layouts/mainLayout.html";

// return todo from db step 1 : subscribe
Template.mainContainer.onCreated(function () {
  this.todoSub = this.subscribe("todoPublication");
});

// return todo from db step 2 : data fetch hye gle render, na hle loading
Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find();
  },
  isLoading() {
    return !Template.instance().todoSub.ready();
  },
});

// new task add form
Template.form.events({
  "submit .task-form": async (e) => {
    e.preventDefault();
    let value = e.target.text.value; //how..destructating works
    await Meteor.call("insertData", { value }, (err) => {
      if (err) {
        console.log("err-", err.error);
        alert("error : " + err.error);
      }
    });
    // value = " ";
    // only eta dle hbe na. ete local "value" ta clear hy, actual dom clear krte hbe
    e.target.text.value = "";
  },
});

// dlt task
Template.task.events({
  async "click .dlt-tdo"() {
    await Meteor.call("dltData", { _id: this._id });
  },
});

Template.signup.events({
  "submit .signup-form"(event) {
    event.preventDefault();
    FlowRouter.go("/signup");
    console.log(event.target.email.value);
    console.log(event.target.password.value);

    console.log("lgse");
  },
});
