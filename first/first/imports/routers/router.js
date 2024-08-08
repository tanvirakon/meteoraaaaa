import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

FlowRouter.route("/", {
  action() {
    BlazeLayout.render("mainLayout", { content: "mainPage" });
  },
});

FlowRouter.route("/signup", {
  action() {
    BlazeLayout.render("mainLayout", { content: "signup" });
  },
});
