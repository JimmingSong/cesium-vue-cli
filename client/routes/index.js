import VueRouter from 'vue-router';
import Vue from 'vue';

import Home from '../src/page/home';

Vue.use(VueRouter);


export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '*',
            component: Home
        }
    ]
});
