<template>
  <head-bar/>

  <div class="mt-16 flex flex-col justify-center items-center">
    <router-view v-slot="{ Component }">
      <component :is="Component"/>
    </router-view>
  </div>

  <video-modal/>
</template>

<script setup lang="ts">
import {client} from "@/assets/lib/request";
import {UseStore} from "@/stores";

const store = UseStore()

const token = localStorage.getItem("token")
if (token) {
  client.get<{ user: User }>({
    url: "/user/self/info"
  }).then(res => {
    if (res.code !== 107) {
      localStorage.removeItem("token")
    } else {
      store.user = res.data.user
    }
  })
}
</script>

<style lang="less">
body {
  background-image: url("@/assets/img/overlay.webp"), linear-gradient(to bottom, #f1f5f9, rgb(255, 255, 255, 0));
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>
