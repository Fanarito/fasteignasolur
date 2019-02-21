import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/css/tailwind.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  data: {
    isMobile: false,
  },
  methods: {
    mobileMatchMedia() {
      this.isMobile = window.matchMedia('(max-width: 768px)').matches;
    },
  },
  created() {
    this.mobileMatchMedia();
    window.addEventListener('resize', this.mobileMatchMedia);
  },
}).$mount('#app');
