import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import {UseStore} from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/HomePage.vue"),
    meta: {
      depth: 0
    }
  },
  {
    path: "/dashboard",
    component: () => import("@/views/DashboardPage.vue"),
    children: [
      {
        path: "",
        redirect: "/dashboard/profile"
      },
      {
        path: "profile",
        component: () => import("@/components/dashboard/UserProfile.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "0",
          dashboard_breadcrumb: ["账号信息"]
        }
      },
      {
        path: "persona",
        component: () => import("@/components/dashboard/UserPersona.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "1",
          dashboard_breadcrumb: ["账号档案"]
        }
      },
      {
        path: "create-task",
        component: () => import("@/components/dashboard/CreateTask.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "2",
          dashboard_breadcrumb: ["创建任务"]
        }
      },
      {
        path: "create-task/:task_id",
        component: () => import("@/components/dashboard/CreateTask.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "2",
          dashboard_breadcrumb: ["创建任务", "编辑草稿"]
        }
      },
      {
        path: "task",
        component: () => import("@/components/dashboard/AllTask.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "3",
          dashboard_breadcrumb: ["全部任务"]
        }
      },
      {
        path: "task/:task_id",
        component: () => import("@/components/dashboard/TaskDetail.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "3",
          dashboard_breadcrumb: ["全部任务", "任务详情"]
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = UseStore()
  if (!store.initialized) {
    const inter = setInterval(() => {
      if (store.initialized) {
        if (to.meta.auth && !store.is_login) {
          next(`/?next=${to.path}`)
          store.show_sign_modal = true
        } else {
          next()
        }
        clearInterval(inter)
      }
    }, 50)
  } else {
    if (to.meta.auth && !store.is_login) {
      next(`/?next=${to.path}`)
      store.show_sign_modal = true
      return
    }
    next()
  }


})

export const safeBack = function (path: string) {
  return !window.history.state.back && path ? router.replace(path || "/") : router.back()
}

export default router
