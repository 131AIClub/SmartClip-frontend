<template>
  <div class="h-screen bg-[var(--dark-2)] flex flex-col justify-between items-center pt-16">
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

      <a-sub-menu key="2">
        <template #icon>
          <i-gridicons-caption/>
        </template>
        <template #title>文案</template>
        <a-menu-item key="2_0" @click="router.push('/dashboard/caption')">全部文案</a-menu-item>
        <a-menu-item key="2_1" @click="router.push('/dashboard/create-caption')">生成文案</a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="3">
        <template #icon>
          <i-ph-video/>
        </template>
        <template #title>视频</template>
        <a-menu-item key="3_0" @click="router.push('/dashboard/video')">全部视频</a-menu-item>
        <a-menu-item key="3_1" @click="router.push('/dashboard/create-video')">生成视频</a-menu-item>
      </a-sub-menu>
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
