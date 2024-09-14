// btn show more pagination
// import { Template } from "meteor/templating";
// import TasksCollection from "../../../common/postDb.js";
// import { ReactiveVar } from "meteor/reactive-var";

// Template.mainbody.onCreated(function () {
//   this.limit = new ReactiveVar(2); // Initial limit of 2 todos
//   // This reactive variable makes the number of posts loaded dynamic.
//   this.autorun(() => {
//     const limit = this.limit.get();
//     this.subscribe("tasks", limit);
//   });
//   //This ensures that whenever limit changes, the subscription re-runs, fetching the latest set of posts.
// });

// Template.mainbody.helpers({
//   posts() {
//     const instance = Template.instance();
//     const limit = instance.limit.get();
//     return TasksCollection.find({}, { sort: { createdAt: -1 }, limit: limit });
//   },
// });

// Template.mainbody.events({
//   "click .load-more"(event, instance) {
//     event.preventDefault();

//     const currentLimit = instance.limit.get(); // Get the current limit and increase it by 2
//     instance.limit.set(currentLimit + 2); //Increasing the limit triggers the autorun to re-subscribe and fetch more posts.
//   },
// });

// 1,2,3..pagination
// import { Template } from "meteor/templating";
// import TasksCollection from "../../../common/postDb.js";
// import { ReactiveVar } from "meteor/reactive-var";

// Template.mainbody.onCreated(function () {
//   this.limit = new ReactiveVar(10); // Show 10 todos per page
//   this.currentPage = new ReactiveVar(1);
//   this.totalTasks = new ReactiveVar(0);

//   // Fetch the total task count when the template is created
//   Meteor.call("getTotalTasksCount", (error, result) => {
//     if (!error) {
//       // mot tasks //54
//       this.totalTasks.set(result);
//     }
//   });

//   this.autorun(() => {
//     const limit = this.limit.get(); //10
//     const currentPage = this.currentPage.get(); //1,2,..,5
//     const skip = (currentPage - 1) * limit; //0,10,..,40
//     this.subscribe("tasks", skip, limit);
//   });
// });

// Template.mainbody.helpers({
//   posts() {
//     const instance = Template.instance();
//     const limit = instance.limit.get(); //10
//     const currentPage = instance.currentPage.get(); //1
//     const skip = (currentPage - 1) * limit; //0
//     // Use limit and skip in the query to get the correct slice of tasks
//     return TasksCollection.find({}, { limit: limit, skip: skip }).fetch();
//   },
//   totalPages() {
//     const totalTasks = Template.instance().totalTasks.get(); //54
//     const limit = Template.instance().limit.get(); //10
//     // return Math.ceil(totalTasks / limit); //6
//     const totalPages = Math.ceil(totalTasks / limit);

//     // Return an array of numbers [1, 2, ..., totalPages]
//     return Array.from({ length: totalPages }, (_, i) => i + 1);
//   },
//   // currentPage() {
//   //   return Template.instance().currentPage.get();
//   // },
// });

// Template.mainbody.events({
//   "click .page-link"(event, instance) {
//     //instance: This refers to the current template instance. It allows access to reactive variables and other instance-specific data.
//     const page = parseInt(event.target.dataset.page, 10); //page number 1,2,3.. pay & int e convert kre
//     instance.currentPage.set(page); //Updates the reactive variable currentPage in the template instance to the clicked page number. This update triggers reactivity, causing any computations or helpers that depend on currentPage to re-run and update the displayed content accordingly.
//   },
// });

// // //1, 2 , 3 pagination with query params
// import { Template } from "meteor/templating";
// import { ReactiveVar } from "meteor/reactive-var";
// import TasksCollection from "../../../common/postDb.js";
// import { FlowRouter } from "meteor/kadira:flow-router";

// Template.mainbody.onCreated(function () {
//   // Get page and limit from the URL query parameters or set default values
//   const page = parseInt(FlowRouter.getQueryParam("page")) || 1;
//   const limit = parseInt(FlowRouter.getQueryParam("limit")) || 10;

//   // Initialize reactive variables
//   this.currentPage = new ReactiveVar(page);
//   this.limit = new ReactiveVar(limit);
//   this.totalTasks = new ReactiveVar(0);

//   // Reactively subscribe to tasks based on current page and limit
//   this.autorun(() => {
//     const skip = (this.currentPage.get() - 1) * this.limit.get();

//     // Subscribe to the tasks publication
//     this.subscribe("tasks", this.limit.get(), skip);

//     // Fetch the total task count
//     Meteor.call("getTotalTasksCount", (error, result) => {
//       if (!error) {
//         this.totalTasks.set(result);
//       }
//     });
//   });
// });

// Template.mainbody.helpers({
//   posts() {
//     // Fetch tasks based on the current limit
//     return TasksCollection.find(
//       {},
//       { limit: Template.instance().limit.get() }
//     ).fetch();
//   },
//   totalPages() {
//     // Calculate the total number of pages
//     const totalTasks = Template.instance().totalTasks.get();
//     const limit = Template.instance().limit.get();
//     const totalPages = Math.ceil(totalTasks / limit);
//     return Array.from({ length: totalPages }, (_, i) => i + 1);
//   },
//   isActivePage(page) {
//     // Return 'active' class if the page is the current page
//     return Template.instance().currentPage.get() === page ? "active" : "";
//   },
// });

// Template.mainbody.events({
//   "click .page-link"(event, instance) {
//     event.preventDefault();
//     const page = parseInt(event.currentTarget.dataset.page, 10);
//     // Update the URL with the new page number
//     FlowRouter.setQueryParams({ page });

//     // Update the current page reactive variable
//     instance.currentPage.set(page);
//     console.log(
//       "ah",
//       page,
//       FlowRouter.getQueryParam("page"),
//       FlowRouter.setQueryParams({ page: page })
//     );
//   },
// });

import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import TasksCollection from "../../../common/postDb.js";
import { FlowRouter } from "meteor/kadira:flow-router";

Template.mainbody.onCreated(function () {
  // Read the initial page and limit from the URL using FlowRouter
  FlowRouter.watchPathChange();
  let page = parseInt(FlowRouter.getQueryParam("page")) || 1;
  let limit = parseInt(FlowRouter.getQueryParam("limit")) || 10;

  this.currentPage = new ReactiveVar(page);
  this.limit = new ReactiveVar(limit);
  this.totalTasks = new ReactiveVar(0);

  // Automatically run when currentPage or limit changes
  this.autorun(() => {
    const skip = (this.currentPage.get() - 1) * this.limit.get();
    page = parseInt(FlowRouter.getQueryParam("page")) || 1;
     limit = parseInt(FlowRouter.getQueryParam("limit")) || 10;
    console.log(FlowRouter.getQueryParam("page"));

    this.subscribe("tasks", this.limit.get(), skip);
    Meteor.call("getTotalTasksCount", (error, result) => {
      if (!error) {
        this.totalTasks.set(result);
      }
    });
  });
});

Template.mainbody.helpers({
  posts() {
    const instance = Template.instance();
    const limit = instance.limit.get();
    const skip = (instance.currentPage.get() - 1) * limit; // Calculate skip based on current page

    // Fetch tasks with both limit and skip
    return TasksCollection.find({}, { limit, skip }).fetch();
  },
  totalPages() {
    const totalTasks = Template.instance().totalTasks.get();
    const limit = Template.instance().limit.get();
    const totalPages = Math.ceil(totalTasks / limit);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  },
  isActivePage(page) {
    return Template.instance().currentPage.get() === page ? "active" : "";
  },
});

Template.mainbody.events({
  "click .page-link"(event, instance) {
    event.preventDefault(); // Prevent default anchor behavior

    const page = parseInt(event.target.dataset.page, 10);
    const limit = instance.limit.get();

    // Update the URL using history.pushState
    const newUrl = `/?page=${page}&limit=${limit}`;
    history.pushState(null, null, newUrl);

    // Update the currentPage ReactiveVar
    instance.currentPage.set(page);
  },
});

// infinite pagination
// import { Template } from "meteor/templating";
// import TasksCollection from "../../../common/postDb.js";
// import { ReactiveVar } from "meteor/reactive-var";

// Template.mainbody.onCreated(function () {
//   this.limit = new ReactiveVar(15); // Show 15 todos per page
//   this.isLoading = new ReactiveVar(false);
//   this.autorun(() => {
//     const limit = this.limit.get(); //15
//     this.subscribe("tasks", limit);
//   });
// });

// Template.mainbody.helpers({
//   posts() {
//     return TasksCollection.find(
//       {},
//       { limit: Template.instance().limit.get() }
//     ).fetch();
//   },
//   isLoading() {
//     return Template.instance().isLoading.get();
//   },
// });
// Template.mainbody.onRendered(function () {
//   const instance = this;

//   $(window).on("scroll", function () {
//     if (
//       $(window).scrollTop() + $(window).height() >
//       $(document).height() - 100
//     ) {
//       if (!instance.isLoading.get()) {
//         instance.isLoading.set(true);
//         const currentLimit = instance.limit.get();
// console.log(currentLimit, TasksCollection.find().count());
//         if (!(currentLimit > TasksCollection.find().count())) {
//           //data fetch over hye gle r loading dtate tkbe na
//           setTimeout(() => {
//             instance.limit.set(currentLimit + 10);
//             instance.subscribe("tasks", instance.limit.get(), {
//               onReady: function () {
//                 instance.isLoading.set(false); // Set loading to false once data is ready
//               },
//             });
//           }, 1000); // 2-second delay
//         } else {
//           instance.isLoading.set(false);
//         }
//       }
//     }
//   });
// });

// Template.mainbody.onDestroyed(function () {
//   $(window).off("scroll"); // Remove the scroll event listener
// });
