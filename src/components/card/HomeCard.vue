<template>
  <a-card class="md:w-96  md:max-w-[30vw] cursor-pointer hover:!shadow-around !transition-all card-animate !rounded-xl" :title="title"
          hoverable @click="router.push(link)">
    <template #extra>
      <a-link @click.stop="">More</a-link>
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
.card-animate:hover {
  transform: translateY(-4px);
}
</style>
