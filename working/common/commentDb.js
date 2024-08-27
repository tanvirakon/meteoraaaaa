import { Mongo } from "meteor/mongo";
const CommentCollection = new Mongo.Collection("comments");
export default CommentCollection;
