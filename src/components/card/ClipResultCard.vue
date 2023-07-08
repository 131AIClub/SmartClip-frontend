<template>
  <a-card title="切片结果" hoverable>

    <a-table class="hidden md:block" :columns="columns" :data="clips.data.clips" :pagination="false">
      <template #video="{ rowIndex }">
        <video controls>
          <source :src="clip_urls[rowIndex]" type="video/mp4">
        </video>
      </template>

      <template #desc="{ rowIndex }">
        <div class="font-bold">标题：{{ clips.data.clips[rowIndex].clipTitle }}</div>
        <div>描述：{{ clips.data.clips[rowIndex].clipDesc }}</div>
        <div class="line">字幕：{{ clips.data.clips[rowIndex].clipText }}</div>
        <div class="w-full flex justify-end items-center mt-2 gap-2">
          <a-button type="primary" status="success">一键发布</a-button>
          <a-button class="place-self-end" status="success" @click="showClipDetail(rowIndex)">详情</a-button>
        </div>
      </template>
    </a-table>

    <div class="block md:hidden" v-for="(v,k) in clips.data.clips" :key="k">
      <div class="flex flex-col md:flex-row justify-between items-center gap-2">
        <video controls class="md:max-w-[40%] md:max-h-40vh">
          <source :src="clip_urls[k]" type="video/mp4">
        </video>

        <div class="flex-grow flex flex-col justify-between items-start">
          <div class="font-bold">标题：{{ v.clipTitle }}</div>
          <div>描述：{{ v.clipDesc }}</div>
          <div class="line">字幕：{{ v.clipText }}</div>
          <div class="w-full flex justify-end items-center mt-2 gap-2">
            <a-button type="primary" status="success">一键发布</a-button>
            <a-button class="place-self-end" status="success" @click="showClipDetail(k)">详情</a-button>
          </div>
        </div>
      </div>

      <a-divider class="!border-[0.5px] !my-2"/>
    </div>

  </a-card>

  <a-modal class="sign-modal" title="切片详情" v-model:visible="show_clip_detail" :footer="false">
    <a-descriptions v-if="current_clip" :data="data" :column="1" bordered/>
  </a-modal>
</template>

<script setup lang="ts">
import {client} from "@/assets/lib/request";
import {computed, ref} from "vue";
import {TableData} from "@arco-design/web-vue";
import {assertNotEmpty} from "@/assets/lib/utils";

const props = defineProps<{ task_id: number }>()

const clips = await client.get<{ clips: Clip[] }>({url: `task/${props.task_id}/clip/`})
const clip_urls = await Promise.all(clips.data.clips.map(x => client.video(x.clipVideoId)))
const show_clip_detail = ref(false)
const current_clip = ref<Clip>()

const columns = ref<TableData[]>([
  {
    title: "视频",
    slotName: "video",
    width: 350
  },
  {
    title: "信息",
    slotName: "desc"
  }
])

const showClipDetail = (index: number) => {
  current_clip.value = clips.data.clips[index]
  show_clip_detail.value = true
}

const data = computed(() => {
  const clip_info = assertNotEmpty(current_clip.value, "切片详情为空")
  return [
    {label: "剪辑ID", value: clip_info.clipId.toString()},
    {label: "切片视频ID", value: clip_info.clipVideoId.toString()},
    {label: "视频长度", value: `${Math.floor(clip_info.clipLength / 60000)}:${clip_info.clipLength % 60000 / 1000}`},
    {label: "视频标题", value: clip_info.clipTitle},
    {label: "视频描述", value: clip_info.clipDesc},
    {label: "视频字幕", value: clip_info.clipText}
  ]
})
</script>

<style scoped lang="less">
.line {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* 这里是超出几行省略 */
  overflow: hidden;
}
</style>
