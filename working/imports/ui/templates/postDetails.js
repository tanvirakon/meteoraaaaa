import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import TasksCollection from "../../../common/postDb.js";
import CommentCollection from "../../../common/commentDb.js";

Template.postDetails.onCreated(function () {
  // subscribe
  const postId = FlowRouter.getParam("_id");
  this.subsToPost = this.subscribe("commentsWithLikes", postId);
});

Template.postDetails.helpers({
  // actudal post details send kra
  post() {
    const _id = FlowRouter.getParam("_id");
    const data = TasksCollection.findOne(_id);
    return data;
  },
  // send comments by postId
  comments() {
    const postId = FlowRouter.getParam("_id");
    return CommentCollection.find({ postId });
  },
});

// comment store by postId
Template.postDetails.events({
  // btn click e comment get
  "submit .comment_section"(e) {
    e.preventDefault();
    let comment = document.getElementById("comment");
    const postId = e.target.dataset.postId;
    // store comment in CommentCollection db
    CommentCollection.insert({
      postId: postId,
      commentText: comment.value,
      like: 0,
    });
    comment.value = " ";
  },

  // like btn e tip dle like barano
  "click .likeBtn"(e) {
    const postId = FlowRouter.getParam("_id");
    const _id = e.target.dataset.commentId;
    let likeCount = CommentCollection.findOne({ postId, _id }).like;
    likeCount++;
    CommentCollection.update({ _id }, { $set: { like: likeCount } });
  },
});
