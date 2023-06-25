<template>
  <div class="fixed left-0 top-0 bg-[var(--dark-2)] w-full border-b border-[var(--gray-3)] z-10">
    <div class="h-14 px-8 flex justify-between items-center">
      <div class="flex justify-start items-center">
        <div class="text-[var(--color-text-2)] font-bold text-lg cursor-pointer" @click="router.push('/')">
          AutoVlogger
        </div>
      </div>

      <div class="flex justify-end items-center gap-3">
        <a-button size="large" type="text" shape="circle" @click="store.toggleTheme()">
          <i-ph-sun-bold v-if="!store.dark"/>
          <i-ph-moon-bold v-else/>
        </a-button>

        <a-avatar class="h-[30px] w-[30px]" @click="router.push('/dashboard/profile')">
          <img
              alt="avatar"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-avatar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {UseStore} from "@/store";
import {useRouter} from "vue-router";

const store = UseStore()
const router = useRouter()
</script>

<style scoped lang="less">

</style>
