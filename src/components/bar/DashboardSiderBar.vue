<template>
  <div class="h-[calc(100vh-48px)] md:h-[calc(100vh-64px)]  bg-[var(--theme-dark-2)] flex flex-col justify-between items-center">
    <a-menu
        class="flex-grow"
        :theme="store.dark?'dark':'light'"
        breakpoint="xl"
        show-collapse-button
        auto-open
        :style="{ width: '200px'}"
        v-model:selected-keys="keys"
    >
      <a-menu-item key="0" @click="router.push('/dashboard/profile')">
        <template #icon>
          <i-ph-user/>
        </template>
        账号信息
      </a-menu-item>
      <a-menu-item key="1" @click="router.push('/dashboard/persona')">
        <template #icon>
          <i-material-symbols-lab-profile-outline/>
        </template>
        填写档案
      </a-menu-item>
      <a-menu-item key="2" @click="router.push('/dashboard/create-task')">
        <template #icon>
          <i-gridicons-caption/>
        </template>
        创建任务
      </a-menu-item>
      <a-menu-item key="3" @click="router.push('/dashboard/task')">
        <template #icon>
          <i-ph-video/>
        </template>
        全部任务
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import {UseStore} from "@/store";
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";

const store = UseStore()
const route = useRoute()
const router = useRouter()

const keys = ref([route.meta.dashboard_menu])

watch(() => route.meta, (new_value) => {
  if (new_value) keys.value = [new_value.dashboard_menu]
})
</script>

<style scoped lang="less">

</style>
