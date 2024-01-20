import {defineStore} from "pinia"

type StoreType = {
  user: null | User
  video_modal: {
    visible: boolean
    title: string
    url: string
  }
}
export const UseStore = defineStore("main", {
  state: (): StoreType => ({
    user: null,
    video_modal: {
      visible: false,
      title: "",
      url: ""
    }
  }),
  getters: {},
  actions: {}
})
