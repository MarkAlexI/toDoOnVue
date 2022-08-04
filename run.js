'use strict';

const glue = '%^&';

const app = Vue.createApp({
  data() {
     return {
       message: 'Hello from Vue',
       todos: [],
       page: 1,
       type: 'all',
     }
  },
  
  methods: {
    changeType: function(type) {
      this.type = type;
    },
    remove: function(index) {
      let removedTodo = this.todos[index].id;
      localStorage.removeItem(removedTodo);
      this.todos.splice(index, 1);
      if (this.freshTodos.length === 0) {
        this.page = Math.max(0, --this.page);
      };
    },
    update: function(index, key) {
      let [createdTime, title, comment, isDone] = localStorage.getItem(key).split(glue);
      isDone = (isDone === "false" ? true : false);
      const itemValue = [createdTime, title, comment, isDone].join(glue);
      localStorage.setItem(key, itemValue);
      this.todos.splice(index, 1, {id: key, created: +createdTime, title: title, comment: comment, done: isDone});
    },
  },
  
  created: function() {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (localStorage.getItem(key).indexOf(glue) === -1) continue;
      let [createdTime, title, comment, done] = localStorage.getItem(key).split(glue);
      done = (done === "false" ? false : true);
      this.todos
        .push({
          id: key,
          created: +createdTime,
          title: title,
          comment: comment,
          done: done
        });
    }
    
    if (this.todos.length === 0) {
      this.todos.push({
        id: 'gu3c8lRTm',
        created: 1,
        title: 'First',
        comment: 'Wright code',
        done: false
      }, {
        id: '8orR6Ki90',
        created: 2,
        title: '17 June',
        comment: 'Buy flowers',
        done: true
      });
      return;
    }
    
    this.todos.sort((a, b) => a.created - b.created);
  },

  computed: {
    freshTodos: function() {
      let arr = this.todos.slice();

      if (this.type === 'all') {
        void '@';
      }
      if (this.type === 'done') {
        arr = arr.filter(el => el.done === true);
      }
      if (this.type === 'undone') {
        arr = arr.filter(el => el.done === false);
      }
      return arr;
    },

    paginatedTodos() {
      return this.freshTodos.slice(this.startIndex, this.endIndex);
    },

    startIndex() {
      return (this.page - 1) * 3;
    },

    endIndex() {
      return Math.min(this.page * 3, this.freshTodos.length);
    },

    hasNextPage() {
      return this.freshTodos.length > this.endIndex;
    },
  },
  
  watch: {
    paginatedTodos() {
      if (this.paginatedTodos.length === 0
          && this.page > 1) {
        this.page -= 1;
      }
    }
  },
});

app.component('todoform', {
  props: ['todos'],
  data() {
    return {
      todo: {title: 'Note', comment: 'Do something.'}
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
      const itemValue = [createdTime, this.todo.title, this.todo.comment, isDone].join(glue);
      this.todos.push({id: newId, created: createdTime, title: this.todo.title, comment: this.todo.comment, done: isDone});
      localStorage.setItem(newId, itemValue);
    },
  },
});

app.component('todofilter', {
  props: [],
  data() {
    return {
      type: 'all',
    }
  },
  template: `<div>
              <label for="filter">
                View tasks: 
              </label>
              <select id="filter" v-model="type" v-on:change="selectFilter" >
                <option value="all">All</option>
                <option value="done">Done</option>
                <option value="undone">Undone</option>
              </select>
            </div>`,
  methods: {
    selectFilter: function(event) {
      this.$emit('selectfilter', this.type);
    },
  },
});

app.component('todoitem', {
  props: ['todo', 'index'],
  template: `<div class="todoitem">
              <p><span>Number of record: </span>{{index}}
              <br> <span>Title: </span>{{todo.title}} <br> <span>Text: </span>{{todo.comment}} </p>
              <button v-on:click="todoDelete(index - 1)">Delete</button>
              <button v-on:click="todoupdate(index - 1, todo.id)">{{todo.done ? "Task done" : "Task undone"}}</button>
            </div>`,
  methods: {
    todoDelete: function(index) {
      this.$emit('tododelete', index);
    },
    todoupdate: function(index, key) {
      this.$emit('todoupdate', index, key);
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
