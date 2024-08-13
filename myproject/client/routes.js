import { BlazeLayout } from "meteor/kadira:blaze-layout";
import { FlowRouter } from "meteor/kadira:flow-router";
import "./imports.js";

BlazeLayout.setRoot("body");



FlowRouter.route("/home", {
  name: "home",
  action: BlazeLayout.render("layout", { main: "home" }),
});

FlowRouter.route("/signup", {
    name: "signup",
    action: BlazeLayout.render("layout", { main: "signup" }),
  });

