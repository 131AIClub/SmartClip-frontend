<template>
  <div class="flex flex-col justify-start items-center">
    <div class="flex justify-center items-center rounded-2xl bg-blue-400 p-3 text-white gap-2 mt-8 op-90">
      <div>百度文心大模型合作伙伴</div>
      <a-image :src="yiyanLogo" width="100" :preview="false" />
    </div>

    <div class="flex flex-wrap justify-center items-center gap-2 text-7xl font-bold mt-16">
      <div>一站式视频</div>
      <div class="text-purple-600">剪辑、编辑、投放</div>
      <div>平台</div>
    </div>

    <!-- <div class="text-xl text-slate-600 font-[500] mt-8">
      在下方链接中输入你的视频URL或上传视频，即可 <a-button class="mt-20 !text-white h-10 px-10 rounded-xl font-[700] text-[20px] w-30"
        type="primary" @click="router.push('/task/source')">
        智能剪辑
      </a-button>并一键投放
    </div>
    <div class="text-slate-600 mt-24">
      迭代升级中，暂时只开放智能剪辑功能
    </div>
    <a-input class="shadow-around w-[90vw] max-w-[1280px] h-14 rounded-2xl bg-white hover:bg-[#f5f6f8] mt-4"
      v-model="search" placeholder="功能迭代升级中，敬请期待" :disabled=true>
      <template #suffix>
        <a-button class="!bg-black !text-white h-10 px-10 rounded-2xl font-[700] text-[14px]" :disabled="!search">
          创建任务
        </a-button>
      </template>
    </a-input> -->

    <a-button class="mt-20 !text-white h-16 px-10 rounded-2xl font-[700] text-[20px] w-80" type="primary"
      @click="router.push('/task/source')">
      点击体验
    </a-button>

    <div class="text-slate-500 font-[黑体] mt-8">免费使用（初次注册赠送20点积分）</div>

    <div class="text-2xl font-[黑体] text-slate-700 mt-20">投放渠道支持</div>

    <div class="flex flex-col justify-center items-center mt-8">
      <div class="flex justify-center items-center">
        <icon-tiktok-color class="text-[80px]" />
        <a-divider direction="vertical" class="border-black" />
        <icon-xigua-color class="text-[80px]" />
        <a-divider direction="vertical" class="border-black" />
        <a-image :src="xhsLogo" width="100" :preview="false" />
        <a-divider direction="vertical" class="border-gray-500" />
        <a-image :src="bilibiliLogo" width="100" :preview="false" />
        <a-divider direction="vertical" class="border-gray-500" />
        <a-image :src="iqyLogo" width="50" :preview="false" />
      </div>
    </div>

    <div class="flex flex-wrap justify-center items-center gap-2 text-5xl font-bold mt-24 mb-24">
      <div class="text-purple-600">2,764 clips generated</div>
      <div class="text-black">by 100+ creators！</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import yiyanLogo from "@/assets/img/yiyanLogo.png"
import bilibiliLogo from "@/assets/img/bilibili.svg"
import xhsLogo from "@/assets/img/xiaohongshu.svg"
import iqyLogo from "@/assets/img/aiqiyi.svg"

import { ref } from "vue";
import router from "@/router";

const search = ref("")
</script>

<style scoped lang="less"></style>
