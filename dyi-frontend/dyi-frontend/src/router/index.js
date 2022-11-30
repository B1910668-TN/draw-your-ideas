import { createWebHistory, createRouter } from 'vue-router';
import HomeDyi from '@/views/HomeDyi.vue';
import PlantDyi from '@/views/PlantDyi.vue';
import AnimalDyi from '@/views/AnimalDyi.vue';
import InteriorDyi from '@/views/InteriorDyi.vue'

const routes = [
    {
        path: '/',
        name: 'HomeDyi',
        component: HomeDyi,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/NotFound.vue'),
    },
    {
        path: '/plantdyi',
        name: 'PlantDyi',
        component: PlantDyi
    },
    {
        path:'/plants/:id',
        name: 'plant.edit',
        component: () => import('@/views/PlantEdit.vue'),
        props: (route) => ({plantId: parseInt(route.params.id)})
    },
    {
        path: '/plants/',
        name: 'plant.create',
        component: () => import('@/views/PlantAdd.vue')
    },
    {
        path: '/animaldyi',
        name: 'AnimalDyi',
        component: AnimalDyi
    },
    {
        path:'/animals/:id',
        name: 'animal.edit',
        component: () => import('@/views/AnimalEdit.vue'),
        props: (route) => ({animalId: parseInt(route.params.id)})
    },
    {
        path: '/animals/',
        name: 'animal.create',
        component: () => import('@/views/AnimalAdd.vue')
    },
    {
        path: '/interiordyi',
        name: 'InteriorDyi',
        component: InteriorDyi
    },
    {
        path:'/interiors/:id',
        name: 'interior.edit',
        component: () => import('@/views/InteriorEdit.vue'),
        props: (route) => ({interiorId: parseInt(route.params.id)})
    },
    {
        path: '/interiors/',
        name: 'interior.create',
        component: () => import('@/views/InteriorAdd.vue')
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;