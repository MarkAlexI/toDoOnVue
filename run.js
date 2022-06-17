'use strict';

const app = Vue.createApp({
  data() {
     return {
       message: 'Hello from Vue',
     }
  },
});

app.mount('#todoapp');