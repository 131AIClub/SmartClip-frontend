import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = []

const router = createRouter({
    history: createWebHistory(),
    routes
})

export const safeBack = function (path: string) {
    return !window.history.state.back && path ? router.replace(path || "/") : router.back()
}

export default router
