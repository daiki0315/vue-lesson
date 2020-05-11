import Vue from 'vue';
// :keyには一意な値を使用しなければいけない
// 他の:keyの値と重複してしまうと「console」に警告が出るためユニークな乱数を生成する「uuid」や、「vue-uuid」を使用して:keyの値を乱数で指定する
import uuid from 'vue-uuid';

Vue.use(uuid);

new Vue({
  el: '#app',
  components: {
    MyApp
  },
  template: '<my-app></my-app>',
});