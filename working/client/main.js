import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import TasksCollection from "../common/postDb.js";
import "./main.html";

Template.form.events({
  "submit .form-class"(e) {
    e.preventDefault();
    let title = e.target.title.value;
    let body = e.target.body.value;
    TasksCollection.insert({ title, body, createdAt: new Date() });
    e.target.title.value = "";
    e.target.body.value = "";
  },
});

Template.mainbody.helpers({
  posts() {
    return TasksCollection.find();
  },
});
