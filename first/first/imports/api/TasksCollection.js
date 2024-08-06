// Notice that we stored the file in the imports/api directory, which is a place to store API-related code, like publications and methods. You can name this folder as you want, this is just an optional way to name it.
import { Mongo } from "meteor/mongo";

export const TasksCollection = new Mongo.Collection("todos");
