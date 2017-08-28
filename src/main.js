import Vue from 'vue';
import socialSharing from 'vue-social-sharing';

Vue.use(socialSharing);

import fatg from 'components/Home/Home';

import 'src/style.scss';

// eslint-disable-next-line
const app = new Vue({
  el: '#app',
  components: {
    fatg
  },
});
