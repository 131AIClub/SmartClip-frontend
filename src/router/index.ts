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
        path: "caption",
        component: () => import("@/components/dashboard/AllCaption.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "2_0",
          dashboard_breadcrumb: ["文案", "全部文案"]
        }
      },
      {
        path: "create-caption",
        component: () => import("@/components/dashboard/CreateCaption.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "2_1",
          dashboard_breadcrumb: ["文案", "生成文案"]
        }
      },
      {
        path: "video",
        component: () => import("@/components/dashboard/AllVideo.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "3_0",
          dashboard_breadcrumb: ["视频", "全部视频"]
        }
      },
      {
        path: "create-video",
        component: () => import("@/components/dashboard/CreateVideo.vue"),
        meta: {
          auth: true,
          depth: 1,
          dashboard_menu: "3_1",
          dashboard_breadcrumb: ["视频", "生成视频"]
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
