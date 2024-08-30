//// btn show more pagination
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

// infinite pagination
import { Template } from "meteor/templating";
import TasksCollection from "../../../common/postDb.js";
import { ReactiveVar } from "meteor/reactive-var";

Template.mainbody.onCreated(function () {
  this.limit = new ReactiveVar(15); // Show 15 todos per page
  this.isLoading = new ReactiveVar(false);
  this.autorun(() => {
    console.log(
      $(window).scrollTop(),
      $(window).height(),
      $(document).height()
    );

    const limit = this.limit.get(); //15
    this.subscribe("tasks", limit);
  });
});

Template.mainbody.helpers({
  posts() {
    return TasksCollection.find(
      {},
      { limit: Template.instance().limit.get() }
    ).fetch();
  },
  isLoading() {
    return Template.instance().isLoading.get();
  },
});

// Template.mainbody.onRendered(function () {
//   const instance = this;

//   // Listener for scroll events
//   $(window).on("scroll", function () {
//     // Check if scrolled near bottom of the page
//     if (
//       $(window).scrollTop() + //returns the current vertical position of the scroll bar. It tells you how far the user has scrolled down.
//         $(window).height() > // height of the browser's viewport
//       $(document).height() - 100 // total height of the entire document (the full webpage, including the parts that are not visible).
//     ) {
//       // Load more posts when near bottom
//       const currentLimit = instance.limit.get();
//       instance.limit.set(currentLimit + 10); // Increase by 10 or any number you want
//     }
//   });
// });

//showing with 1 sec delay
Template.mainbody.onRendered(function () {
  const instance = this;

  // Listener for scroll events
  $(window).on("scroll", function () {
    if (
      $(window).scrollTop() + $(window).height() >
      $(document).height() - 100
    ) {
      if (!instance.isLoading.get()) {
        instance.isLoading.set(true); // Set loading to true

        // Introduce a delay of 2 seconds before loading more data
        setTimeout(() => {
          const currentLimit = instance.limit.get();
          instance.limit.set(currentLimit + 10); // Increase by 10 or any number you want

          // Subscribe to tasks with the updated limit
          instance.subscribe("tasks", instance.limit.get(), {
            onReady: function () {
              instance.isLoading.set(false); // Set loading to false once data is ready
            },
          });
        }, 1000); // 2-second delay
      }
    }
  });
});

Template.mainbody.onDestroyed(function () {
  $(window).off("scroll"); // Remove the scroll event listener
});
