<template>
  <a-card class="w-96 max-w-[30vw] cursor-pointer hover:shadow-around transition-all animate rounded-xl" :title="title"
          hoverable @click="router.push(link)">
    <template #extra>
      <a-link>More</a-link>
    </template>

    ByteDance's core product, Toutiao ("Headlines"), is a content platform in
    China and around the world. Toutiao started out as a news recommendation
    engine and gradually evolved into a platform delivering content in various
    formats.
  </a-card>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter()

defineProps<{
  title: string
  link: string
}>()


</script>

<style scoped lang="less">
.animate:hover {
  transform: translateY(-4px);
}
</style>
