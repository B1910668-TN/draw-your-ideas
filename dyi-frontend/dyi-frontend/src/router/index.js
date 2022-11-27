import { createWebHistory, createRouter } from 'vue-router';
import HomeDyi from '@/views/HomeDyi.vue';
import PlantDyi from '@/views/PlantDyi.vue';

const routes = [
    {
        path: '/',
        name: 'HomeDyi',
        component: HomeDyi,
    },
    {
        path: '/plantdyi',
        name: 'PlantDyi',
        component: PlantDyi
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/NotFound.vue'),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;