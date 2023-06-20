<template>
  <a-page-header
      title="ArcoDesign"
      subtitle="ArcoDesign Vue 2.0"
      class="theme-bg-1"
  >
    <template #extra>
      <div class="flex justify-end items-center">
        <a-radio-group type="button" default-value="large">
          <a-radio value="mini">Mini</a-radio>
          <a-radio value="small">Small</a-radio>
          <a-radio value="large">Large</a-radio>
        </a-radio-group>

        <a-button type="text" shape="circle" @click="store.toggleTheme()">
          <i-ph-sun-bold v-if="!store.dark"/>
          <i-ph-moon-bold v-else/>
        </a-button>
      </div>
    </template>
  </a-page-header>
</template>

<script setup lang="ts">
import {UseStore} from "@/store";

const store = UseStore()
</script>

<style lang="less">
</style>
