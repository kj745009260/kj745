// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';

import Goods from 'components/goods/goods';
import Seller from 'components/seller/seller';
import Ratings from 'components/ratings/ratings';

import './common/css/index.scss';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  }
]




const router = new VueRouter({
    routes:routes,
    linkActiveClass: 'active'
});

new Vue({
    router:router,
    template: '<App/>',
    components: { App }
}).$mount('#app');


