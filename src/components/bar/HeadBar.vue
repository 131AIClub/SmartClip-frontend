<template>
  <div class="fixed inset-0 w-full h-16 flex justify-between items-center px-8 z-[1000] rounded-b"
       :style="{
         backgroundColor:`rgba(255,255,255,${scroll_percent})`,
         boxShadow: `0 2px 10px rgba(30,41,59,${scroll_percent/10})`
       } ">
    <div class="flex justify-start items-center gap-3 cursor-pointer" @click="router.push('/home')">
      <a-image :src="logo" width="32" :preview="false"/>
      <div class="text-[1.125rem] font-[700]">SmartClip</div>
    </div>

    <div class="flex justify-end items-center">
      <a-button v-if="!Boolean(store.user)" type="text" class="!text-black font-[700]" @click="router.push('/login')">
        登录
      </a-button>
      <div v-else>
        <a-button type="text" class="!text-black font-[700]">充值</a-button>
        <a-button type="text" class="!text-black font-[700]" @click="router.push('/task')">任务中心</a-button>
        <a-popover position="tr">
          <a-button type="text" class="!text-black font-[700]">用户信息</a-button>
          <template #content>
            <div class="w-48 flex flex-col justify-center items-center gap-3">
              <div class="px-2 w-full flex justify-between items-center">
                <div>手机号码</div>
                <div>{{ store.user!.phone }}</div>
              </div>
              <div class="px-2 w-full flex justify-between items-center">
                <div>剩余点数</div>
                <div>{{ store.user!.free_point }}</div>
              </div>
              <div class="w-full flex justify-between items-center">
                <a-button type="outline">换绑手机</a-button>
                <a-button type="outline">重置密码</a-button>
              </div>
              <a-popconfirm content="确定注销？" @ok="logout">
                <a-button type="outline" status="warning" long>注销账号</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/img/logo.png"
import {useRouter} from "vue-router";
import {UseStore} from "@/stores";
import {ref} from "vue";

const router = useRouter()
const store = UseStore()
const scroll_percent = ref(0)
const logout = async () => {
  localStorage.removeItem("token")
  store.user = null
}

document.addEventListener("scroll", () => {
  scroll_percent.value = document.documentElement.scrollTop / 130
})
</script>

<style scoped lang="less">

</style>
