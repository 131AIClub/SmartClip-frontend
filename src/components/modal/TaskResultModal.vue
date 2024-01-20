<template>
  <a-modal v-model:visible="visible" hide-title :footer="false" width="968px"
           :mask-style="{backdropFilter: 'blur(1px)'}">
    <div class="p-6">
      <a-steps :current="Math.floor(task.status/2)+1" :status="task.error?'error':'finish'">
        <a-step>
          创建
          <template v-if="task.status===0" #icon>
            <icon-loading/>
          </template>
        </a-step>
        <a-step>
          分析
          <template v-if="task.status===2" #icon>
            <icon-loading/>
          </template>
        </a-step>
        <a-step>
          剪辑
          <template v-if="task.status===4" #icon>
            <icon-loading/>
          </template>
        </a-step>
        <a-step>
          完成
          <template v-if="task.status===6" #icon>
            <icon-loading/>
          </template>
        </a-step>
      </a-steps>
    </div>
    <a-divider/>

    <div class="flex flex-col justify-start items-center p-4 gap-4">
      <div v-for="(result,k) of task.result" :key="k" class="w-full">
        <result-card :result="result"/>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">

defineProps<{ task: Task }>()
const visible = defineModel<boolean>("visible", {required: true})
</script>

<style scoped lang="less">

</style>
