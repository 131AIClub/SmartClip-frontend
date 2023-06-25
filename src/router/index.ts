import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/HomePage.vue")
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
          dashboard_menu: "0"
        }
      },
      {
        path: "persona",
        component: () => import("@/components/dashboard/UserPersona.vue"),
        meta: {
          dashboard_menu: "1"
        }
      },
      {
        path: "caption",
        component: () => import("@/components/dashboard/AllCaption.vue"),
        meta: {
          dashboard_menu: "2_0"
        }
      },
      {
        path: "create-caption",
        component: () => import("@/components/dashboard/CreateCaption.vue"),
        meta: {
          dashboard_menu: "2_1"
        }
      },
      {
        path: "video",
        component: () => import("@/components/dashboard/AllVideo.vue"),
        meta: {
          dashboard_menu: "3_0"
        }
      },
      {
        path: "create-video",
        component: () => import("@/components/dashboard/CreateVideo.vue"),
        meta: {
          dashboard_menu: "3_1"
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export const safeBack = function (path: string) {
  return !window.history.state.back && path ? router.replace(path || "/") : router.back()
}

export default router
