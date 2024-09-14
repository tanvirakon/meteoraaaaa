import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
import "../../layouts";
import "../../ui/templates";

// FlowRouter.route("/", {
//   name: "home",
//   action: () => {
//      console.log("Home route triggered");
//     BlazeLayout.render("layout",{main:"mainbody"});
//   },
// });
FlowRouter.route("/", {
  name: "home",
  action() {
    BlazeLayout.render("layout", { main: "mainbody" });
  },
  triggersEnter: [(context, redirect) => {
    const page = context.queryParams.page;
    const limit = context.queryParams.limit;

    // Only redirect if page or limit is missing from the URL
    if (!page || !limit) {
      redirect(`/?page=${page || 1}&limit=${limit || 10}`);
    }
  }],
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
// FlowRouter.route("/?page&limit", {
//   name: "postDetails",
//   action: (params) => {
//     BlazeLayout.render("postDetailsLayout", { main: "postDetails" });
//   },
// });
