<template>
  <div class="flex justify-start items-center">
    <div class="relative flex-shrink-0 rounded-l overflow-hidden" @click="open_video_modal">
      <img :src="auth(result.cover)" class="aspect-video h-40" :alt="result.title"/>
      <div class="absolute bottom-0 w-full pt-2 pr-1 text-end text-[12px] text-white"
           style="background: linear-gradient(rgba(255,255,255,0),rgba(0,0,0,0.8))">
        {{ second_to_time(result.length) }}
      </div>
    </div>

    <div class="flex-grow place-self-start">
      <table class="w-full w-full">
        <tbody>
        <tr class="h-8">
          <td class="bg-gray-100 border text-center text-gray-500 w-[10%]">标题</td>
          <td class="border px-2">{{ result.title }}</td>
          <td class="bg-gray-100 border text-center text-gray-500 w-[10%]">大小</td>
          <td class="border px-2">{{ `${(result.size / 1024 / 1024).toFixed(2).toString()}MB` }}</td>
        </tr>
        <tr class="h-20">
          <td class="bg-gray-100 border text-center text-gray-500 w-[10%]">简介</td>
          <td colspan="3" class="border px-2">{{ result.description }}</td>
        </tr>
        <tr class="h-12">
          <td class="bg-gray-100 border text-center text-gray-500 w-[10%]">操作</td>
          <td colspan="3" class="border px-2">
            <div class="flex justify-end items-center gap-4">
              <a-button status="normal" type="primary">剪辑</a-button>
              <a-button status="success">发布</a-button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {auth, second_to_time} from "@/assets/lib/utils";
import {UseStore} from "@/stores";

const props = defineProps<{ result: Result }>()
const store = UseStore()


const open_video_modal = async () => {
  store.video_modal = {
    visible: true,
    title: props.result.title,
    url: auth(props.result.file)
  }
}
</script>

<style scoped lang="less">

</style>
