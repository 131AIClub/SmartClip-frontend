<template>
  <div class="flex justify-between items-start">
    <dashboard-sider-bar class="fixed md:sticky top-12 md:top-16 shadow-around"/>

    <div class="m-2 md:m-4 md:mx-6 pl-12 md:pl-0 flex-grow flex flex-col gap-3">
      <a-breadcrumb v-if="!store.is_mobile&&route.meta.dashboard_breadcrumb">
        <a-breadcrumb-item>
          <i-fluent-apps-16-regular/>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="(v,k) in route.meta.dashboard_breadcrumb" :key="k">{{ v }}</a-breadcrumb-item>
      </a-breadcrumb>
      <router-view/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {UseStore} from "@/store";
import {useRoute} from "vue-router";

const store = UseStore()
const route = useRoute()
</script>

<style scoped lang="less">

</style>
