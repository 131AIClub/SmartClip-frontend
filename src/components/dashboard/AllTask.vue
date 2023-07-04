<template>
  <div class="flex flex-col gap-2 md:gap-4">
    <a-card title="全部任务" hoverable>
      <a-table :columns="columns" :data="tasks" :pagination="{total,pageSize:page_size,simple:true}"
               @row-click="toDetail">
        <template #taskCreateTime="{ rowIndex }">
          {{ date(tasks[rowIndex].taskCreateTime) }}
        </template>

        <template #taskStatus="{ rowIndex }">
          <a-tag :color="['gold','blue','green','red'][tasks[rowIndex].taskStatus]">
            {{ ["草稿", "正在切片", "切片完成", "任务失败"][tasks[rowIndex].taskStatus] }}
          </a-tag>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {client} from "@/assets/lib/request";
import {ref} from "vue";
import {DateParser} from "@/assets/lib/utils";
import router from "@/router";
import {TableData} from "@arco-design/web-vue"

const page = ref(0)
const columns = ref([
  {
    title: "ID",
    dataIndex: "taskId"
  },
  {
    title: "创建时间",
    dataIndex: "taskCreateTime",
    slotName: "taskCreateTime"
  },
  {
    title: "状态",
    dataIndex: "taskStatus",
    slotName: "taskStatus"
  }
])
const tasks = ref<Task[]>([])
const total = ref<number>()
const page_size = ref<number>(10)
const load = async () => {
  const res = await client.get<{ tasks: Task[], total: number }>(
      {url: `task/?page_count=${page_size.value}&page_num=${page.value}`}
  )
  total.value = res.data.total
  tasks.value = res.data.tasks
}
const date = (timestamp: number) => {
  return new DateParser(timestamp).all()
}

const toDetail = (task: TableData) => {
  router.push(`/dashboard/task/${task.taskId}`)
}

await load()

</script>

<style scoped lang="less">

</style>
