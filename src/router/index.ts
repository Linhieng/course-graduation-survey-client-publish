import { createRouter, createWebHistory } from 'vue-router';
import FillAnswer from '@/views/answer/index.vue';
import NotFount from '@/views/not-found/index.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/fill/:id',
            component: FillAnswer,
            props: true,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFount,
        },
    ],
});

export default router;
