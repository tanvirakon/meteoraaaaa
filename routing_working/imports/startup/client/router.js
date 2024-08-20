import { BlazeLayout } from "meteor/kadira:blaze-layout";
import { FlowRouter } from "meteor/kadira:flow-router";
import "../../ui";
import "../../layouts";

BlazeLayout.setRoot("body");

FlowRouter.route("/", {
  name: "home",
  action: () => {
    BlazeLayout.render("appLayout", { content: "home" });
  },
});
FlowRouter.route("/about", {
  name: "home",
  action: () => {
    BlazeLayout.render("appLayout", { content: "about" });
  },
});
