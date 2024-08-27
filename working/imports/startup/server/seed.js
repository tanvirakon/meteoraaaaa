import todosData from "../../api/todos.json";
import TasksCollection from "../../../common/postDb.js";

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    todosData.forEach((todo) => {
      TasksCollection.insert({
        title: todo.title,
        body: todo.body,
        createdAt: new Date(todo.createdAt),
      });
    });
    console.log("Database seeded with initial todos data");
  }
});
