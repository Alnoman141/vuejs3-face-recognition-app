import { createRouter, createWebHistory } from 'vue-router';
import userRoutes from './modules/user';

const HomeComponent = () => import('@/views/index.vue');


const routes = [
    {
        path: '/',
        name: 'index',
        component: HomeComponent,
    },
    userRoutes
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;