import { Template } from "meteor/templating";
import TasksCollection from "../../../common/postDb.js";

Template.form.events({
  "submit .form-class"(e) {
    e.preventDefault();
    let title = e.target.title.value;
    let body = e.target.body.value;
    TasksCollection.insert({ title, body, createdAt: new Date() }); //returns an unique id
    e.target.title.value = "";
    e.target.body.value = "";
  },
});
