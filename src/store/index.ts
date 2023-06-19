import {defineStore} from "pinia"

type StoreType = any
export const UseStore = defineStore("main", {
  state: (): StoreType => ({}),
  getters: {},
  actions: {}
})
