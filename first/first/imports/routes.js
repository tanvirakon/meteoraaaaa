import { BlazeLayout } from "meteor/kadira:blaze-layout";
import { FlowRouter } from "meteor/kadira:flow-router";
import "./pages/signup";

BlazeLayout.setRoot("body");

FlowRouter.route("/", {
  name: "home",
  action: () => {
    BlazeLayout.render("appLayout", { content: "home" });
  },
});
FlowRouter.route("/signup", {
  name: "signup",
  action: () => {
    // BlazeLayout.render("appLayout", { content: "about" });
    console.log("kire");
  },
});
