<template>
  <div class="flex flex-col justify-start items-center">
    <div class="flex justify-center items-center rounded-2xl bg-slate-200 p-3 text-slate-600 gap-2 mt-8">
      <div>AI powered by</div>
      <a-image :src="OpenAI" width="100" :preview="false"/>
    </div>

    <div class="flex flex-wrap justify-center items-center gap-2 text-7xl font-bold mt-16">
      <div>一站式视频</div>
      <div class="text-purple-600">剪辑、编辑、投放</div>
      <div>平台</div>
    </div>

    <div class="text-xl text-slate-600 font-[黑体] mt-8">
      在下方链接中输入你的视频URL或上传视频，即可自动剪辑并一键投放
    </div>


    <a-input class="shadow-around w-[90vw] max-w-[1280px] h-14 rounded-2xl bg-white hover:bg-[#f5f6f8] mt-24"
             v-model="search" placeholder="请输入bilibili视频/直播间链接">
      <template #suffix>
        <a-button class="!bg-black !text-white h-10 px-10 rounded-2xl font-[700] text-[14px]" :disabled="!search">
          创建任务
        </a-button>
      </template>
    </a-input>

    <div class="text-slate-500 font-[黑体] mt-8">免费使用（初次注册赠送20点积分）</div>

    <div class="text-2xl font-[黑体] text-slate-700 mt-36">投放渠道支持</div>

    <div class="flex flex-col justify-center items-center mt-8">
      <div class="flex justify-center items-center">
        <icon-tiktok-color class="text-[80px]"/>
        <a-divider direction="vertical" class="border-black"/>
        <icon-xigua-color class="text-[80px]"/>
        <a-divider direction="vertical" class="border-black"/>
        <icon-lark-color class="text-[80px]"/>
        <a-divider direction="vertical" class="border-black"/>
        <icon-bytedance-color class="text-[80px]"/>
      </div>
    </div>

    <div class="flex flex-wrap justify-center items-center gap-2 text-5xl font-bold mt-24">
      <div class="text-purple-600">114514 clips generated</div>
      <div class="text-black">by 100+ creators！</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OpenAI from "@/assets/img/OpenAI.svg"

import {ref} from "vue";

const search = ref("")
</script>

<style scoped lang="less">

</style>
