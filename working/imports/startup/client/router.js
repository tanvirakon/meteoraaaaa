import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
import "../../layouts";
import "../../ui/templates";

FlowRouter.route("/", {
  name: "home",
  action: () => {
    BlazeLayout.render("layout");
  },
});

FlowRouter.route("/signup", {
  name: "signup",
  action: () => {
    BlazeLayout.render("layout", { main: "signup" });
  },
});

FlowRouter.route("/post/:_id", {
  name: "postDetails",
  action: (params) => {
    BlazeLayout.render("postDetailsLayout", { main: "postDetails" });
  },
});
