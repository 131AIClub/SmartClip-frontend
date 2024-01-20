<template>
  <div class="p-2 w-full">
    <div class="rounded overflow-hidden flex justify-between items-center bg-white gap-2 border">
      <div class="relative cursor-pointer flex-shrink-0" @click="open_video_modal">
        <img :src="auth(task.source.cover)" class="aspect-video h-40" :alt="task.source.name"/>
        <div class="absolute bottom-0 w-full pt-2 pr-1 text-end text-[12px] text-white"
             style="background: linear-gradient(rgba(255,255,255,0),rgba(0,0,0,0.8))">
          {{ second_to_time(task.source.length) }}
        </div>
      </div>

      <div class="p-2 flex-grow">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-black text-[16px]">{{ task.title }}</div>
            <div class="text-gray-500 text-[12px]">{{ time }}</div>
          </div>

          <a-button status="success" type="text" shape="circle">
            <icon-double-right/>
          </a-button>
        </div>

        <a-descriptions :data="data" bordered :column="4" size="small" class="mt-2"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {auth, DateParser, second_to_time} from "@/assets/lib/utils";
import {UseStore} from "@/stores";

const props = defineProps<{ task: Task }>()
const time = computed(() => (new DateParser(props.task.create_time)).all())
const data = ref([
  {
    label: "剪辑数量",
    value: props.task.clip_num
  },
  {
    label: "剪辑类型",
    value: ["直播", "科普", "通用"][props.task.clip_type]
  },
  {
    label: "花费",
    value: props.task.lock_point
  },
  {
    label: "状态",
    value: props.task.status
  },
  {
    label: "剪辑要求",
    value: props.task.description.slice(0, 30),
    span: 4
  },
  {
    label: "备注",
    value: props.task.remark,
    span: 4
  },
])
const store = UseStore()

const open_video_modal = async () => {
  store.video_modal = {
    visible: true,
    title: props.task.source.name,
    url: auth(props.task.source.file)
  }
}
</script>

<style scoped lang="less">

</style>
