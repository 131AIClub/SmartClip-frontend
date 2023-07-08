<template>
  <div>
    <div class="h-[20vh] md:h-[50vh]"></div>

    <div class="flex md:flex-row flex-col justify-center items-center md:gap-12 gap-3 md:px-12 px-3">
      <home-card title="注册账号" link="/dashboard/profile"/>
      <home-card title="填写剪辑需求" link="/dashboard/create-task"/>
      <home-card title="一键发布" link="/dashboard/task"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import HomeCard from "@/components/card/HomeCard.vue";
</script>

<style scoped lang="less">

</style>
