'use strict';

const app = Vue.createApp({
  data() {
     return {
       message: 'Hello from Vue',
       todos: [],
     }
  },
  
  methods: {
    remove: function(index) {
      let removedTodo = this.todos[index].title;
      localStorage.removeItem(removedTodo);
      this.todos.splice(index, 1);
    },
  },
  
  created: function() {
    if (localStorage.length === 0) {
      this.todos.push({id: 'gu3c8lRTm', title: 'First', comment: 'Wright code'}, {id: '8orR6Ki90', title: '17 June', comment: 'Buy flowers'});
      return;
    }
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      const [title, comment] = localStorage.getItem(key).split('%^&');
      this.todos.push({id: key, title: title, comment: comment});
    }
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
              <input type="text" v-model="todo.title" size="4" />
              <button v-on:click="todoAdd">Add new task</button>
              <input type="text" v-model="todo.comment" />
            </div>`,
  methods: {
    todoAdd(event) {
      const newId = setId();
      const glue = '%^&';
      const itemValue = this.todo.title + glue + this.todo.comment;
      this.todos.push({id: newId, title: this.todo.title, comment: this.todo.comment});
      localStorage.setItem(newId, itemValue);
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
