import Vue from 'vue';
import App from './App';
import router from './routes';
import Element from 'element-ui';
import './style';

Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
