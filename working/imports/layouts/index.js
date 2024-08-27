import "./layout.html";
import "../ui/templates";

// Template.layout.onCreated(function() {
//     this.posts = new ReactiveVar([]);
//     this.loadedPosts = new ReactiveVar(0);
//     this.postsLimit = 2; // Number of posts to load at a time
  
//     this.autorun(() => {
//       const offset = this.loadedPosts.get();
//       const limit = this.postsLimit;
  
//       Meteor.call("getPosts", limit, offset, (error, result) => {
//         if (!error) {
//           const currentPosts = this.posts.get();
//           this.posts.set([...currentPosts, ...result]);
//         }
//       });
//     });
//   });
  
//   Template.layout.helpers({
//     posts() {
//       return Template.instance().posts.get();
//     }
//   });
  
//   Template.layout.events({
//     "click .show-more"(event, instance) {
//       const loadedPosts = instance.loadedPosts.get();
//       instance.loadedPosts.set(loadedPosts + instance.postsLimit);
//     }
//   });
  
