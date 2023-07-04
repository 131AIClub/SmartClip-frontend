<template>
  <div class="flex flex-col gap-2 md:gap-4">
    <a-card title="创建剪辑任务" hoverable>
      <div class="flex justify-center items-center">
        <a-form :model="task" class="w-[96%] max-w-[640px] p-2" layout="vertical">
          <a-form-item label="上传视频" required>
            <a-upload multiple :limit="1" :custom-request="upload"/>
          </a-form-item>

          <a-form-item label="视频类型" required>
            <a-select v-model="task.clipRequirement.videoType" :default-value="0">
              <a-option :value="0">演讲</a-option>
              <a-option :value="1">新闻</a-option>
              <a-option :value="2">教学视频</a-option>
              <a-option :value="3">电商带货</a-option>
            </a-select>
          </a-form-item>

          <a-form-item label="剪辑风格" required>
            <a-select v-model="task.clipRequirement.clipStyle" :default-value="0" disabled>
              <a-option :value="0">自定义</a-option>
              <a-option :value="1">抽象</a-option>
              <a-option :value="2">正经</a-option>
            </a-select>
          </a-form-item>

          <a-form-item label="视频长度" required>
            <a-select v-model="task.clipRequirement.clipStyle" :default-value="0">
              <a-option :value="0">长</a-option>
              <a-option :value="1">中</a-option>
              <a-option :value="2">短</a-option>
            </a-select>
          </a-form-item>

          <a-form-item label="切片数量" required>
            <a-input-number v-model="task.clipRequirement.clipNum" :default-value="1" mode="button" :min="1"
                            :max="10"/>
          </a-form-item>

          <a-form-item label="其它描述">
            <a-textarea v-model="task.clipRequirement.otherRequirement" placeholder="描述其他需求..." allow-clear/>
          </a-form-item>


          <div class="flex justify-end items-center gap-4">
            <a-button type="outline" status="success" @click="save(0)">保存草稿</a-button>
            <a-button type="primary" status="success" @click="save(1)">创建任务</a-button>
          </div>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {Notification, RequestOption, UploadRequest} from "@arco-design/web-vue"
import {client} from "@/assets/lib/request";
import axios, {Canceler} from "axios"
import {useRoute, useRouter} from "vue-router";
import {safeBack} from "@/router";

const route = useRoute()
const router = useRouter()
const task = ref<Omit<Task, "taskId" | "taskStatus" | "taskCreateTime"> & { videoId?: number, taskId?: number }>({
  clipRequirement: {
    videoType: 0,
    clipStyle: 0,
    clipLength: 0,
    clipNum: 1,
    otherRequirement: ""
  },
  videoId: 0
})

if (route.params.task_id) {
  const {code, msg, data} = await client.get<{ task: Task }>({url: `task/${route.params.task_id}/`})
  if (code !== 3000) {
    Notification.warning(msg)
    safeBack("/dashboard/task")
  }

  task.value = data.task
  console.log(task.value);
}


const upload = (option: RequestOption): UploadRequest => {
  const {onProgress, onError, onSuccess, fileItem} = option
  if (!fileItem.file) throw Error("文件不存在")

  const form = new FormData()
  form.append("video", fileItem.file)
  let canceler: Canceler

  client.post<{ resource_id: number }>({
    url: "video/",
    data: form,
    headers: {"Content-Type": "multipart/form-data"},
    onUploadProgress: (e) => {
      onProgress(e.progress || 0, e.event)
    },
    cancelToken: new axios.CancelToken((c) => {
      canceler = c
    })
  }).then(res => {
    console.log(res.data.resource_id);
    task.value.videoId = res.data.resource_id
    onSuccess("123")
  }).catch(err => {
    console.warn(err);
    onError(err)
  })

  return {
    abort() {
      canceler("取消上传")
    }
  }
}

const save = async (is_draft: number) => {
  const res = await client.post<{ task_id: number }>({
    url: "task/",
    data: {task: task.value, is_draft}
  })
  if (res.code === 5000) {
    Notification.success("创建成功")
    await router.push(`/dashboard/task/${res.data.task_id}`)
  } else {
    Notification.warning(res.msg)
  }
}
</script>

<style scoped lang="less">

</style>
