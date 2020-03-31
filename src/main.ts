import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'lib-flexible';
import '@/assets/scss/reset.scss';

Vue.config.productionTip = false;
let sid: string = (document.getElementById('user_sid') as HTMLInputElement).value;
window.USER_SID = sid;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
