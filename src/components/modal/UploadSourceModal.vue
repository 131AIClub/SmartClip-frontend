<template>
  <a-modal v-model:visible="visible" hide-title :footer="false" width="520px"
           :mask-style="{backdropFilter: 'blur(1px)'}">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="上传视频文件">
        <a-upload draggable :custom-request="upload_source" v-model:file-list="files"
                  accept="video/*"/>
      </a-tab-pane>
      <a-tab-pane key="2" title="视频url下载">
        Content of Tab Panel 2
      </a-tab-pane>
      <a-tab-pane key="3" title="直播url录制">
        Content of Tab Panel 3
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script setup lang="ts">
import {api_url} from "@/assets/lib/settings"
import {Notification} from "@arco-design/web-vue";
import type {RequestOption} from "@arco-design/web-vue"

const visible = defineModel<boolean>("visible", {required: true})
const files = defineModel<any[]>("files", {required: true})
const upload_source = (option: RequestOption) => {
  const {onProgress, onError, onSuccess, fileItem} = option
  const xhr = new XMLHttpRequest()
  if (xhr.upload) {
    let percent: number
    xhr.upload.onprogress = function (event) {
      if (event.total > 0) percent = event.loaded / event.total
      if (percent === 1) Notification.info("转码中...")
      onProgress(percent, event)
    }
  }
  xhr.onerror = onError
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      Notification.warning("不支持该文件")
      onError(xhr.responseText)
    } else {
      Notification.success("已上传")
      onSuccess(xhr.response)
    }
  }

  const formData = new FormData()
  if (fileItem.file) formData.append("file", fileItem.file)
  xhr.open("post", `${api_url}/clip/source/`, true)
  xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`)
  xhr.send(formData)

  return {
    abort() {
      xhr.abort()
    }
  }
}
</script>

<style scoped lang="less">

</style>
