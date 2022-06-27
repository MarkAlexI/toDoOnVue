'use strict';

const app = Vue.createApp({
  data() {
     return {
       message: 'Hello from Vue',
       todos: [],
       page: 1,
     }
  },
  
  methods: {
    remove: function(index) {
      let removedTodo = this.todos[index].id;
      localStorage.removeItem(removedTodo);
      this.todos.splice(index, 1);
    },
  },
  
  created: function() {
    if (localStorage.length === 0) {
      this.todos.push({id: 'gu3c8lRTm', created: 1, title: 'First', comment: 'Wright code', done: false}, {id: '8orR6Ki90', created: 2, title: '17 June', comment: 'Buy flowers', done: true});
      return;
    }
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      const [createdTime, title, comment, done] = localStorage.getItem(key).split('%^&');
      this.todos.push({id: key, created: createdTime, title: title, comment: comment, done: done});
    }
  },

  computed: {
    freshTodos: function() {
      return this.todos.slice(this.startIndex, this.endIndex);
    },

    startIndex() {
      return (this.page - 1) * 3;
    },

    endIndex() {
      return this.page * 3;
    },

    hasNextPage() {
      return this.todos.length > this.endIndex;
    },
  }
});

app.component('todoform', {
  props: ['todos'],
  data() {
    return {
      todo: {title: 'Note', comment: 'Do something.'},
    }
  },
  template: `<div>
              <input v-on:keyup.enter="todoAdd" type="text" v-model="todo.title" size="4" v-bind:class="{warning: this.todo.title.length === 0}" />
              <button v-on:click="todoAdd">Add new task</button>
              <input v-on:keyup.enter="todoAdd" type="text" v-model="todo.comment" v-bind:class="{warning: this.todo.comment.length === 0}" />
            </div>`,
  methods: {
    todoAdd(event) {
      if (this.todo.title === "") {
        this.todo.title = "Title";
        return;
      }
      if (this.todo.comment === "") {
        this.todo.comment = "Do something.";
        return;
      }
      const createdTime = Date.now();
      const newId = setId();
      const isDone = false;
      const glue = '%^&';
      const itemValue = createdTime + glue + this.todo.title + glue + this.todo.comment + glue + isDone;
      this.todos.push({id: newId, created: createdTime, title: this.todo.title, comment: this.todo.comment, done: isDone});
      localStorage.setItem(newId, itemValue);
    },
  },
});

app.component('todoitem', {
  props: ['todo', 'index'],
  template: `<div v-bind:class="{done: todo.done}">
              <p><span>Number of record: </span>{{startIndex + index + 1}}
              <br> <span>Title: </span>{{todo.title}} <br> <span>Text: </span>{{todo.comment}} </p>
              <button v-on:click="todoDelete(index)">Delete</button>
              <button v-on:click="todo.done = !todo.done">Done</button>
            </div>`,
  methods: {
    todoDelete: function(index) {
      this.$emit('tododelete', index);
    },
  },
});

app.mount('#todoapp');

function setId() {
  const dict = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const rand = () => {
    const index = Math.floor(Math.random() * dict.length);
    return dict[index];
  };

  const repeat = (f, times) => {
    let result = '';
    for (let i = 0; i < times; i++) {
      result += f();
    }
    return result;
  }

  return repeat(rand, 9);
}
