// import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
import "../../client/layouts/mainLayout.html";

// FlowRouter.route("/", {
//   action() {
//     BlazeLayout.render("mainLayout", { content: "mainPage" });
//   },
// });

// FlowRouter.route("/signup", {
//   action() {
//     BlazeLayout.render("mainLayout", { content: "signup" });
//   },
// });

const renderTemplate = (layout, view, body) => () =>
  BlazeLayout.render(layout, { content: view, bodyContent: body });

const renderLayout = (view, body) => renderTemplate("layout", view, body);

FlowRouter.route("/", {
  name: "home",
  action: renderLayout("mainContainer"),
});
