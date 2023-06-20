import {defineStore} from "pinia"

type StoreType = {
  dark: boolean
}
export const UseStore = defineStore("main", {
  state: (): StoreType => ({
    dark: false
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
