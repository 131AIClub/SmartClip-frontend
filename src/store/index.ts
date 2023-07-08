import {defineStore} from "pinia"
import {client} from "@/assets/lib/request";

type StoreType = {
  dark: boolean
  initialized: boolean
  is_mobile: boolean
  show_sign_modal: boolean
  is_login: boolean
  user: User | null
  loading: boolean
}
export const UseStore = defineStore("main", {
  state: (): StoreType => ({
    dark: false,
    initialized: false,
    is_mobile: window.innerWidth < 768,
    show_sign_modal: false,
    is_login: false,
    user: null,
    loading: false
  }),
  getters: {},
  actions: {
    toggleTheme() {
      this.dark = !this.dark
      if (this.dark) {
        document.body.setAttribute("arco-theme", "dark")
      } else {
        document.body.removeAttribute("arco-theme");
      }
    },
    async initUser() {
      const res = await client.get<{ user: User }>({url: "user/"})
      if (res.code === 9000) {
        this.is_login = true
        this.user = res.data.user
      }
      this.initialized = true
    }
  }
})
