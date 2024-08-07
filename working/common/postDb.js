import { Mongo } from "meteor/mongo";
const TasksCollection = new Mongo.Collection("todos");
export default TasksCollection;


