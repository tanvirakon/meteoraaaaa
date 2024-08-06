import { Meteor } from 'meteor/meteor';
import { Todos } from '../lib/collections.js'; // Ensure this path is correct

Meteor.startup(() => {
  // Allow rules for the Todos collection
  Todos.allow({
    insert() {
      return true;
    },
    update() {
      return true;
    },
    remove() {
      return true;
    },
  });
});
