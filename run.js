'use strict';

const app = Vue.createApp({
  data() {
     return {
       message: 'Hello from Vue',
       todos: [{title: 'First', comment: 'Wright code'},
         {title: '17 June', comment: 'Buy flowers'}],
     }
  },
  
  methods: {
    remove: function(index) {
      this.todos.splice(index, 1);
    },
  },
});

app.component('todoitem', {
  props: ['todo', 'index'],
  template: `<div>
              <p>Number of record: {{index + 1}}
              <br> Title: {{todo.title}} <br> Text: {{todo.comment}} </p>
              <button v-on:click="todoDelete(index)">Delete</button>
            </div>`,
  methods: {
    todoDelete: function(index) {
      this.$emit('tododelete', index);
    },
  },
});

app.mount('#todoapp');