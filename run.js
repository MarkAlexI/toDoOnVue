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

app.component('todoform', {
  props: ['todos'],
  data() {
    return {
      todo: {title: 'Note', comment: 'Do something.'},
    }
  },
  template: `<div>
              <input type="text" v-model="todo.title" size="5" />
              <input type="text" v-model="todo.comment" size="9" />
              <button v-on:click="todoAdd">Add new task</button>
            </div>`,
  methods: {
    todoAdd(event) {
      this.todos.push({title: this.todo.title, comment: this.todo.comment});
    },
  },
});

app.component('todoitem', {
  props: ['todo', 'index'],
  template: `<div>
              <p><span>Number of record: </span>{{index + 1}}
              <br> <span>Title: </span>{{todo.title}} <br> <span>Text: </span>{{todo.comment}} </p>
              <button v-on:click="todoDelete(index)">Delete</button>
            </div>`,
  methods: {
    todoDelete: function(index) {
      this.$emit('tododelete', index);
    },
  },
});

app.mount('#todoapp');