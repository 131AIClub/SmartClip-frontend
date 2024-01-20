<template>
  <div>
    <a-button class="h-12 w-full !bg-black !text-white rounded-2xl mt-2" @click="upload_modal.visible=true">添加素材
    </a-button>
    <transition enter-active-class="animate__animated animate__fadeIn" appear>
      <div v-if="result.loading" class="flex justify-center items-center mt-4">
        <a-spin tip="加载中..."/>
      </div>

      <div v-else>
        <div class="flex justify-start items-center flex-wrap mt-4" v-if="result.count">
          <source-card v-for="(source,k) in result.sources" :key="k" :source="source"
                       @edit="edit_source" @remove="remove_source"/>
        </div>
        <div v-else class="flex justify-center items-center h-[57px]">
          没有查询到结果
        </div>

        <div class="flex justify-between items-center bg-white py-2 px-4 rounded-2xl shadow-around mt-4">
          <a-button status="success" shape="circle" @click="refresh_source">
            <icon-refresh/>
          </a-button>

          <a-pagination
              :total="result.count"
              v-model:current="params.page"
              :page-size="8"
              show-jumper
              @change="get_source"
          />
        </div>
      </div>
    </transition>

    <upload-source-modal v-model:files="upload_modal.files" v-model:visible="upload_modal.visible"/>
    <edit-source-modal v-if="edit_modal.source" v-model:visible="edit_modal.visible"
                       v-model:source="edit_modal.source" @finish="edit_finish"/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {client} from "@/assets/lib/request";
import {Notification} from "@arco-design/web-vue";

const upload_modal = ref({
  files: [],
  visible: false
})
const edit_modal = ref<{
  visible: boolean
  source: null | Source
}>({
  source: null,
  visible: false
})
const params = ref({
  page: 1
})
const result = ref<{
  count: number
  loading: boolean
  sources: Source[]
}>({
  count: 0,
  loading: false,
  sources: []
})
const get_source = async () => {
  result.value.loading = true
  try {
    const res = await client.get<PaginatedResponse<Source>>({
      url: "/clip/source/",
      params: params.value
    })
    result.value.count = res.data.count
    result.value.sources = res.data.results
  } finally {
    result.value.loading = false
  }
}

const refresh_source = async () => {
  params.value = {page: 1}
  await get_source()
}

const edit_source = (source: Source) => {
  edit_modal.value.visible = true
  edit_modal.value.source = source
}

const remove_source = async (source: Source) => {
  const res = await client.delete({
    url: `/clip/source/${source.id}/`
  })
  if (res.code === 115) {
    Notification.success("已删除")
    await refresh_source()
  } else {
    Notification.warning(res.msg)
  }
}

const edit_finish = (name: string) => {
  for (const source of result.value.sources) {
    if (source.id == edit_modal.value.source?.id) {
      source.name = name
      return
    }
  }
}
watch(() => upload_modal.value.visible, (new_value: boolean) => {
  if (!new_value) upload_modal.value.files = []
})

get_source()
</script>

<style scoped lang="less">

</style>
