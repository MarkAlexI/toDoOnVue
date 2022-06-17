'use strict';

const app = Vue.createApp({
  data() {
     return {
       message: 'Hello from Vue',
       todos: [{title: 'First', comment: 'Wright code'},
         {title: '17 June', comment: 'Buy flowers'}],
     }
  },
});

app.mount('#todoapp');