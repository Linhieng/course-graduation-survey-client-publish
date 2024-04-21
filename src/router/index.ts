import { createRouter, createWebHistory } from 'vue-router';
import FillAnswer from '@/views/fill-answer.vue';
import NotFount from '@/views/not-found.vue';

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
            component: NotFount,
        },
    ],
});

export default router;
