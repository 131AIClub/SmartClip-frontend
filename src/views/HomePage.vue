<template>
  <div class="h-screen w-screen pt-14">
    <div class="md:mt-[50vh] mt-[20vh] flex md:flex-row flex-col justify-center items-center md:gap-12 gap-3 md:px-12 px-3">
      <home-card title="填写档案" link="/dashboard/persona"/>
      <home-card title="生成文案" link="/dashboard/create-caption"/>
      <home-card title="生成视频" link="/dashboard/create-video"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import HomeCard from "@/components/card/HomeCard.vue";
</script>

<style scoped lang="less">

</style>
