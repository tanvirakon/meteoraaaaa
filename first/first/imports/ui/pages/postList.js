import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import "../../../client/main.html";

Template.task.events({
  "click li"(event) {
    event.preventDefault();
    FlowRouter.go("/another");
  },
});
