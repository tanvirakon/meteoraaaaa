import { Meteor } from "meteor/meteor";
import CommentCollection from "./commentDb.js";

Meteor.publish("commentsWithLikes", function (postId) {
  // Publish comments related to a specific post
  return CommentCollection.find({ postId });
});
