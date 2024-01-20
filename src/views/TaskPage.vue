<template>
  <div class="w-[968px] max-w-[90vw] mt-8">
    <a-tabs class="tabs" :active-key="active" size="large" @change="change">
      <a-tab-pane key="1" title="全部任务"/>
      <a-tab-pane key="2" title="创建任务"/>
      <a-tab-pane key="3" title="素材视频"/>
    </a-tabs>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";

const route = useRoute()
const router = useRouter()
const active = ref("1")
active.value = {
  "/task/all": "1",
  "/task/create": "2",
  "/task/source": "3"
}[route.path] || "1"

const change = (new_active: string | number) => {
  router.replace({
    "1": "/task/all",
    "2": "/task/create",
    "3": "/task/source"
  }[new_active.toString()] || "/task/all")
}

watch(route, (new_value) => {
  active.value = {
    "/task/all": "1",
    "/task/create": "2",
    "/task/source": "3"
  }[new_value.path] || "1"
})
</script>

<style lang="less">
.tabs .arco-tabs-tab-title {
  font-size: 1.2rem;
  font-weight: 550;
}
</style>
