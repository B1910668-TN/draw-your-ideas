import { createWebHistory, createRouter } from 'vue-router';
import HomeDyi from '@/views/HomeDyi.vue';

const routes = [
    {
        path: '/',
        name: 'contactbook',
        component: HomeDyi,
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;