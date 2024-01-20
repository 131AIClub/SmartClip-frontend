<template>
  <transition enter-active-class="animate__animated animate__fadeIn" appear>
    <div class="bg-white p-6 rounded-2xl shadow-around mt-6 mb-20">
      <a-form :model="form" layout="vertical">
        <div class="flex justify-center items-center">
          <video class="max-h-[60vh] max-w-[80%] rounded" v-if="select.selected" :src="auth(select.selected.file)"
                 controls/>
        </div>
        <a-form-item field="title" label="源视频">
          <a-select :options="select.options" :loading="select.loading" placeholder="在素材视频中搜索..." allow-search
                    :filter-option="false" allow-clear @change="update_source" @search="search_source"
                    @clear="select.search = ''"/>
        </a-form-item>
        <a-form-item field="title" label="任务标题">
          <a-input v-model="form.title" placeholder="不影响剪辑结果"/>
        </a-form-item>
        <a-form-item field="description" label="任务描述">
          <a-textarea v-model="form.description" placeholder="请输入剪辑要求"/>
        </a-form-item>
        <a-form-item field="remark" label="任务备注">
          <a-textarea v-model="form.remark" placeholder="不影响剪辑结果"/>
        </a-form-item>
        <a-form-item field="type" label="剪辑类型">
          <a-radio-group v-model="form.clip_type">
            <a-radio :value="0">电商直播</a-radio>
            <a-radio :value="1">科普视频</a-radio>
            <a-radio :value="2">通用剪辑</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="clip_num" label="切片数量">
          <a-input-number v-model="form.clip_num" :min="1" :max="8" placeholder="成品数量"/>
        </a-form-item>
        <a-form-item>
          <a-button class="h-12 w-full !bg-black !text-white rounded-2xl mt-2" :disabled="!valid" @click="create_task">
            创建任务
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {client} from "@/assets/lib/request";
import {auth} from "@/assets/lib/utils";
import {Notification} from "@arco-design/web-vue";
import router from "@/router";

const form = ref({
  title: "",
  description: "",
  remark: "",
  source_id: 0,
  clip_type: 0,
  clip_num: 4,
})

const select = ref<{
  options: string[]
  loading: boolean
  search: string
  sources: Source[]
  selected: null | Source
}>({
  options: [],
  loading: false,
  search: "",
  sources: [],
  selected: null
})

const valid = computed(() => {
  return form.value.title && form.value.description && form.value.source_id
})

const search_source = async (value: string) => {
  if (!value) return

  select.value.loading = true
  try {
    const res = await client.get<PaginatedResponse<Source>>({
      url: "clip/source/",
      params: {
        search: value
      }
    })
    select.value.options = res.data.results.map(x => x.name)
    select.value.sources = res.data.results
  } finally {
    select.value.loading = false
  }
}

const update_source = (value: any) => {
  for (const source of select.value.sources) {
    if (value === source.name) {
      select.value.selected = source
      form.value.source_id = source.id
    }
  }
}
const create_task = async () => {
  if (!valid.value) return
  Notification.success("创建中...")

  const res = await client.post({
    url: "clip/task/",
    data: form.value
  })

  if (res.code === 116) {
    Notification.success("创建成功")
    await router.push('/task/all')
  } else {
    Notification.warning(res.msg)
  }
}
</script>

<style scoped lang="less">

</style>
