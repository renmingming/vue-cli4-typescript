import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/grand_ceremony',
        name: 'home',
        component: Home
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.NODE_ENV === 'production' ? '/m/activities/' : process.env.BASE_URL,
    routes
});

export default router;
