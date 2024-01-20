<template>
  <a-modal v-model:visible="visible" :footer="false" width="auto" :title="store.video_modal.title"
           :mask-style="{backdropFilter: 'blur(1px)'}">
    <video class="w-[648px] max-w-[90vw] max-h-[90vh]" :src="store.video_modal.url" controls autoplay/>
<!--    {{ store.video_modal.url}}-->
  </a-modal>
</template>

<script setup lang="ts">
import {UseStore} from "@/stores";
import {ref, watch} from "vue";

const store = UseStore()
const visible = ref(false)
watch(() => store.video_modal.visible, (new_value: boolean) => {
  visible.value = new_value
})

watch(visible, (new_value) => {
  if (!new_value) {
    store.video_modal = {
      visible: false,
      title: "",
      url: ""
    }
  }
})
</script>

<style scoped lang="less">

</style>
