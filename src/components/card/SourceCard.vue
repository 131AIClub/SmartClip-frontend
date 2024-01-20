<template>
  <div class="w-[25%] p-1 cursor-pointer">
    <a-card class="rounded-lg overflow-hidden" @click="open_video_modal">
      <template #cover>
        <div class="relative">
          <img :src="auth(source.cover)" class="aspect-video" :alt="source.name"/>
          <div class="absolute bottom-0 w-full pt-2 pr-1 text-end text-[12px] text-white"
               style="background: linear-gradient(rgba(255,255,255,0),rgba(0,0,0,0.8))">
            {{ second_to_time(source.length) }}
          </div>
        </div>
      </template>
      <a-card-meta :title="source.name">
        <template #description>
          <div class="flex justify-between items-center">
            <div class="text-gray-700 text-[12px]">{{ time }}</div>
            <div class="flex justify-end items-center gap-2">
              <icon-edit class="hover:text-blue-500 duration-100" @click.stop="emits('edit',source)"/>
              <a-popconfirm content="确定删除该视频？" @ok="emits('remove',source)">
                <icon-delete class="hover:text-red-600 duration-100" @click.stop="void 0"/>
              </a-popconfirm>
            </div>
          </div>
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {auth, DateParser, second_to_time} from "@/assets/lib/utils";
import {computed} from "vue";
import {UseStore} from "@/stores";

const props = defineProps<{ source: Source }>()
const emits = defineEmits(["edit", "remove"])
const store = UseStore()
const time = computed(() => (new DateParser(props.source.create_time)).monthDayHoursMinutes())

const open_video_modal = async () => {
  store.video_modal = {
    visible: true,
    title: props.source.name,
    url: auth(props.source.file)
  }
}
</script>

<style scoped lang="less">

</style>
