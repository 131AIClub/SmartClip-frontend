<template>
  <a-modal v-model:visible="visible" title="编辑" simple @ok="update">
    <div>名称</div>
    <a-input v-model="source.name"/>
  </a-modal>
</template>

<script setup lang="ts">
import {client} from "@/assets/lib/request";
import {Notification} from "@arco-design/web-vue";

const visible = defineModel<boolean>("visible", {required: true})
const source = defineModel<Source>("source", {required: true})
const emit = defineEmits(["finish"])

const update = async () => {
  const res = await client.patch({
    url: `/clip/source/${source.value.id}/`,
    data: {
      name: source.value.name
    }
  })
  if (res.code === 114) {
    visible.value = false
    emit("finish", source.value.name)
    Notification.success("已修改")
  } else {
    Notification.warning(res.msg)
  }
}
</script>

<style scoped lang="less">

</style>
