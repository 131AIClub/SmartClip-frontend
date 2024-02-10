import { isAuthenticated } from "@/assets/lib/utils";
import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "home"
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/HomePage.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginPage.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterPage.vue")
  },
  {
    path: "/task",
    component: () => import("@/views/TaskPage.vue"),
    children: [
      {
        path: "",
        redirect: "/task/all"
      },
      {
        path: "all",
        name: "task-all",
        component: () => import("@/views/task/AllTask.vue"),
      },
      {
        path: "create",
        name: "task-create",
        component: () => import("@/views/task/CreateTask.vue"),
      },
      {
        path: "source",
        name: "task-source",
        component: () => import("@/views/task/SourcePage.vue"),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from) => {
  if (
    !isAuthenticated() &&
    to.name !== 'login' && to.name !== 'home'
  ) {
    return { name: 'login', query: { next: to.path } }
  }
})

export const safe_back = function (path: string) {
  return !window.history.state.back && path ? router.replace(path || "/") : router.back()
}

export default router
