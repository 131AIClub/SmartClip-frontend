<template>
  <div class="flex flex-col gap-2 md:gap-4 w-[96%] max-w-[960px] m-auto">
    <a-card title="任务进度" hoverable class="hidden md:block">
      <a-steps :current="data.task.taskStatus+1||3" label-placement="vertical" :status="state">
        <a-step>草稿</a-step>
        <a-step>切片中</a-step>
        <a-step>已完成</a-step>
      </a-steps>
    </a-card>

    <a-card title="任务详情" hoverable>
      <div class="md:px-4">
        <a-descriptions :data="base_info" title="基础信息" :column="1" bordered/>
        <br>
        <a-descriptions :data="clip_info" title="剪辑需求" :column="{xs:1, lg:2}" bordered/>
      </div>

      <div v-if="data.task.taskStatus==0" class="pt-4 flex justify-center">
        <a-button status="success" @click="router.push(`/dashboard/create-task/${data.task.taskId}`)">
          继续编辑
        </a-button>
      </div>
    </a-card>

    <a-card title="原始视频" hoverable v-if="video_url">
      <div class="flex justify-center items-center">
        <video class="max-h-[80vh]" controls>
          <source :src="video_url" type="video/mp4">
        </video>
      </div>
    </a-card>

    <suspense>
      <clip-result-card :task_id="data.task.taskId"/>
      <template #fallback>
        <a-spin tip="加载中"/>
      </template>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import {client} from "@/assets/lib/request";
import {useRoute, useRouter} from "vue-router";
import {Notification} from "@arco-design/web-vue";
import {safeBack} from "@/router";
import {computed, ref} from "vue";
import {DateParser} from "@/assets/lib/utils";
import {UseStore} from "@/store";
import ClipResultCard from "@/components/card/ClipResultCard.vue";

const route = useRoute()
const router = useRouter()
const store = UseStore()
store.loading = true

const {code, msg, data} = await client.get<{ task: Task }>({url: `task/${route.params.task_id}/`})

if (code !== 3000) {
  Notification.warning(msg)
  safeBack("/dashboard/task")
}

const video_url = await client.video(data.task.videoId)

const base_info = ref([
  {label: "ID", value: data.task.taskId.toString()},
  {label: "创建于", value: new DateParser(data.task.taskCreateTime).all()},
  {label: "状态", value: ["任务失败", "草稿", "切片中", "已完成"][data.task.taskStatus + 1]}
])

const clip_info = ref([
  {label: "视频类型", value: ["演讲", "新闻", "教学视频", "电商带货"][data.task.clipRequirement.videoType]},
  {label: "剪辑风格", value: ["自定义", "抽象", "正经"][data.task.clipRequirement.clipStyle]},
  {label: "视频长度", value: ["长", "中", "短"][data.task.clipRequirement.clipLength]},
  {label: "切片数量", value: data.task.clipRequirement.clipNum.toString()},
  {label: "额外需求", value: data.task.clipRequirement.otherRequirement || "无"}
])

const state = computed(() => {
  switch (data.task.taskStatus) {
    case 0:
    case 1:
      return "process"
    case 2:
      return "finish"
    default:
      return "error"
  }
})


store.loading = false
</script>

<style scoped lang="less">
</style>
