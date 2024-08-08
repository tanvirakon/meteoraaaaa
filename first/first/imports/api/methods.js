import { TasksCollection } from "./TasksCollection.js";
// import { check } from "meteor/check";

Meteor.methods({
  // insert in db
  insertData({ value }) {
    // check(value, String); //onno data type asle error
    // if (!value) throw new Meteor.Error("cant be empty");
    // ei checking r drkr cai.  cz ekhn schema define krc. oikahne ble dc empty hte prbe na
    const newTodo = {
      text: value,
      createdAt: new Date(),
    };

    try {
      TasksCollection.schema.validate(newTodo);
      // schema r sathe mile kina check
      // Define a hook to run after inserting a document
      TasksCollection.after.insert(console.log(`Inserted task`));
      return TasksCollection.insertAsync(newTodo);
    } catch (error) {
      throw new Meteor.Error(error.message);
    }

    // Insert the document
  },

  //   dlt from db
  dltData({ _id }) {
    return TasksCollection.removeAsync(_id);
  },
});
