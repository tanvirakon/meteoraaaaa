import { TasksCollection } from "./TasksCollection.js";
import { check } from "meteor/check";

Meteor.methods({
    
  // insert in db
  insertData({ value }) {
    check(value, String); //onno data type asle error
    if (!value) throw new Meteor.Error("cant be empty");
    return TasksCollection.insertAsync({
      text: value,
      createdAt: new Date(),
    });
  },


  //   dlt from db
  dltData({ _id }) {
    return TasksCollection.removeAsync(_id);
  },
});
