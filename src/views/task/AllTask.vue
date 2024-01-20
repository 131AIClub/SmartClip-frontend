<template>
  <div>
    <transition enter-active-class="animate__animated animate__fadeIn" appear>
      <div v-if="result.loading" class="flex justify-center items-center mt-4">
        <a-spin tip="加载中..."/>
      </div>

      <div v-else>
        <div class="flex justify-start items-center flex-wrap mt-4" v-if="result.count">
          <task-card v-for="(task,k) in result.tasks" :key="k" :task="task"
                     @click_source="open_video_modal" @show_result="open_result_modal"/>
        </div>
        <div v-else class="flex justify-center items-center h-[57px]">
          没有查询到结果
        </div>

        <div class="flex justify-between items-center bg-white py-2 px-4 rounded-2xl shadow-around mt-4">
          <a-button status="success" shape="circle" @click="refresh_task">
            <icon-refresh/>
          </a-button>

          <a-pagination
              :total="result.count"
              v-model:current="params.page"
              :page-size="8"
              show-jumper
              @change="get_task"
          />
        </div>
      </div>
    </transition>

    <task-result-modal v-if="opened.task" :task="opened.task" v-model:visible="opened.visible"/>
  </div>
</template>

<script setup lang="ts">
import {client} from "@/assets/lib/request";
import {ref} from "vue";
import {auth} from "@/assets/lib/utils";
import {UseStore} from "@/stores";
import TaskResultModal from "@/components/modal/TaskResultModal.vue";

const store = UseStore()
const result = ref<{
  count: number
  loading: boolean
  tasks: Task[]
}>({
  count: 0,
  loading: false,
  tasks: []
})
const params = ref({
  page: 1
})
const opened = ref<{
  task: null | Task
  visible: boolean
}>({
  task: null,
  visible: false
})
const fetch = async () => {
  const res = await client.get<PaginatedResponse<Task>>({
    url: "/clip/task/",
    params: params.value
  })
  result.value.count = res.data.count
  result.value.tasks = res.data.results
}

const get_task = async () => {
  result.value.loading = true
  try {
    await fetch()
    const inter = setInterval(async () => {
      let poll = false
      for (const task of result.value.tasks) {
        if (!task.error && task.status !== 7) {
          poll = true
        }
      }
      if (!poll) clearInterval(inter)
      await fetch()
    }, 30000)
  } finally {
    result.value.loading = false
  }
}

const refresh_task = async () => {
  result.value.tasks = []
  params.value = {page: 1}
  await get_task()
}

const open_video_modal = async (task: Task) => {
  store.video_modal = {
    visible: true,
    title: task.source.name,
    url: auth(task.source.file)
  }
}

const open_result_modal = async (task: Task) => {
  opened.value.task = task
  opened.value.visible = true
}

get_task()
</script>

<style scoped lang="less">

</style>
