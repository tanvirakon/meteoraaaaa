import { Template } from "meteor/templating";
import TasksCollection from "../../../common/postDb.js";

Template.mainbody.helpers({
  posts() {
    return TasksCollection.find();
  },
});
