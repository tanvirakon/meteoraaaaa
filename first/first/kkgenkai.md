> [!NOTE]
> subscribe,loading state,hook

notion link : [notion](https://tasty-van-095.notion.site/meteor-js-ea11b45a47354156899d8681562b72a1?pvs=4)

1. do we still need usetracker to update ui when data changes in bg?!

2. till fetch data, how it shows loading and then renders the data , after finish fetching? <br>
   in main.js

```
Template.mainContainer.onCreated(function () {
  this.todoSub = this.subscribe("todoPublication");
});

Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find();
  },
  isLoading() {
    return !Template.instance().todoSub.ready();
  },
});
```

in html

````
{{#if isLoading}}
    <p>Loading...</p>
    {{else}}
    <ul>
      {{#each tasks}}
      {{>task}}
      {{/each}}
    </ul>
    {{/if}}
    ```
````
