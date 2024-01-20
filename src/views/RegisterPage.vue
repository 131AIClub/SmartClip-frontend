<template>
  <div
      class="flex flex-col justify-star items-center w-[648px] max-w-[90vw] mt-24 px-6 py-10 bg-[rgba(250,250,250,0.4)] rounded-2xl border border-gray-300">
    <div class="font-bold text-4xl text-black">注册</div>

    <a-form :model="phone_form" layout="vertical">
      <a-form-item field="name" label="手机号" class="mt-8">
        <a-input class="h-12 rounded-lg bg-white" v-model="phone_form.phone" placeholder="请输入11位手机号"/>
      </a-form-item>

      <a-form-item field="post" label="验证码" class="mt-4">
        <a-input class="h-12 rounded-lg bg-white" v-model="phone_form.code" placeholder="请输入验证码"/>
        <a-button class="h-12 ml-4" status="success" :disabled="!valid_phone" @click="send_sms">发送验证码</a-button>
      </a-form-item>
    </a-form>

    <a-button class="h-12 w-full !bg-black !text-white rounded-2xl mt-8" :disabled="!valid_phone||!valid_code"
              @click="register">
      注册
    </a-button>

    <div class="text-[#4ebaee] mt-2 cursor-pointer" @click="router.replace('/login')">已有账号？去登录</div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {client} from "@/assets/lib/request";
import {Notification} from "@arco-design/web-vue"

const router = useRouter()
const phone_form = ref({
  phone: "",
  code: ""
})
const send_sms = async () => {
  const res = await client.post({
    url: "/common/sms/code/",
    data: {
      method: "REGISTER",
      phone: phone_form.value.phone
    }
  })
  if (res.code === 101) {
    Notification.success(res.msg)
  } else {
    Notification.warning(res.msg)
  }
}

const register = async () => {
  const res = await client.post<{ user: User, token: string }>({
    url: "/user/sign/register/",
    data: {
      phone: phone_form.value.phone,
      code: phone_form.value.code
    }
  })
  if (res.code === 102) {
    Notification.success(res.msg)
  } else {
    Notification.warning(res.msg)
  }
}

const valid_phone = computed(() => /^1[3-9][0-9]{9}$/.test(phone_form.value.phone))
const valid_code = computed(() => /^[0-9]{4}$/.test(phone_form.value.code))
</script>

<style scoped lang="less">

</style>
