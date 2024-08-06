import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
import "../ui/pages/anotherPage.html";

FlowRouter.route("/another", {
  name: "anotherPage",
  action() {
    BlazeLayout.render("mainLayout", { content: "anotherPage" });
  },
});
