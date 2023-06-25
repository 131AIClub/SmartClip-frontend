import {defineStore} from "pinia"

type StoreType = {
  dark: boolean
  is_mobile: boolean
}
export const UseStore = defineStore("main", {
  state: (): StoreType => ({
    dark: false,
    is_mobile: window.innerWidth < 768
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
    }
  }
})
