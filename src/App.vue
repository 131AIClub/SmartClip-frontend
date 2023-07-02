<template>
  <div v-if="store.initialized">
    <header-bar/>

    <router-view v-slot="{ Component }" class="pt-12 md:pt-16 text-[var(--color-text-1)]">
      <transition :name="page_animation">
        <component :is="Component"/>
      </transition>
    </router-view>

    <sign-modal/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {UseStore} from "@/store";

const store = UseStore()
const route = useRoute()
const page_animation = ref()
const token = localStorage.getItem("token")
if (token) {
  store.initUser()
} else {
  store.initialized = true
}

watch(() => route.meta, (to, from) => {
  if (store.is_mobile) {
    if (to.depth === from.depth) {
      page_animation.value = ""
    } else {
      page_animation.value = to.depth > from.depth ? "steady-left" : "right-steady"
    }
  }
})
</script>

<style lang="less">
</style>
