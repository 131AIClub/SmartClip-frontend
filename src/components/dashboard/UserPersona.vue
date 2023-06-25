<template>
  <div class="flex flex-col gap-2 md:gap-4">
    <a-card title="基础信息" hoverable>
      <div class="flex justify-center items-center">
        <a-form class="w-[96%] max-w-[640px] p-2" layout="vertical">

          <a-form-item field="name" label="品牌描述" required>
            <a-input placeholder="用一段文字描述你的品牌"/>
          </a-form-item>

          <a-form-item field="post" label="核心关键词" required>
            <a-input placeholder="please enter your post..."/>
          </a-form-item>

          <a-form-item>
            <a-button html-type="submit">Submit</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">

</style>
