<template>
  <div
      class="flex flex-col justify-star items-center w-[648px] max-w-[90vw] mt-24 px-6 py-10 bg-[rgba(250,250,250,0.4)] rounded-2xl border border-gray-300">
    <div class="font-bold text-4xl text-black">登录</div>

    <a-button class="h-14 w-full !bg-black !text-white rounded-2xl mt-8" @click="is_phone=!is_phone">
      <icon-sync/>
      <div class="ml-2">切换到账号密码登录</div>
    </a-button>

    <a-form :model="phone_form" layout="vertical" v-if="is_phone">
      <a-form-item field="name" label="手机号" class="mt-8">
        <a-input class="h-12 rounded-lg bg-white" v-model="phone_form.phone" placeholder="请输入11位手机号"/>
      </a-form-item>

      <a-form-item field="post" label="验证码" class="mt-4">
        <a-input class="h-12 rounded-lg bg-white" v-model="phone_form.code" placeholder="请输入验证码"/>
        <a-button class="h-12 ml-4" status="success" :disabled="!valid_phone" @click="send_sms">
          发送验证码
        </a-button>
      </a-form-item>
    </a-form>
    <a-form :model="name_form" layout="vertical" v-else>
      <a-form-item field="name" label="用户名" class="mt-8">
        <a-input class="h-12 rounded-lg bg-white" v-model="name_form.username" placeholder="请输入用户名"/>
      </a-form-item>

      <a-form-item field="post" label="密码" class="mt-4">
        <a-input class="h-12 rounded-lg bg-white" v-model="name_form.password" placeholder="请输入密码"/>
      </a-form-item>
    </a-form>

    <a-button class="h-12 w-full !bg-black !text-white rounded-2xl mt-8" @click="login" :disabled="disable">
      登录
    </a-button>

    <div class="text-[#4ebaee] mt-2 cursor-pointer" @click="router.replace('/register')">没有账号？去注册</div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {client} from "@/assets/lib/request";
import {Notification} from "@arco-design/web-vue";
import {UseStore} from "@/stores";
import {flat_query} from "@/assets/lib/utils";

const store = UseStore()

const route = useRoute()
const router = useRouter()
const is_phone = ref(true)
const phone_form = ref({
  phone: "",
  code: ""
})
const name_form = ref({
  username: "",
  password: ""
})

const send_sms = async () => {
  const res = await client.post({
    url: "/common/sms/code/",
    data: {
      method: "LOGIN",
      phone: phone_form.value.phone
    }
  })
  if (res.code === 101) {
    Notification.success(res.msg)
  } else {
    Notification.warning(res.msg)
  }
}
const login = async () => {
  const res = await client.post<{ user: User, token: string }>({
    url: "/user/sign/login/",
    data: {
      is_phone: is_phone.value,
      ...(is_phone.value ? phone_form.value : name_form.value)
    }
  })
  if (res.code === 103) {
    store.user = res.data.user
    localStorage.setItem("token", res.data.token)
    await router.replace(flat_query(route.query.next) || "/")
  } else {
    Notification.warning(res.msg)
  }
}

const valid_phone = computed(() => /^1[3-9][0-9]{9}$/.test(phone_form.value.phone))
const valid_code = computed(() => /^[0-9]{4}$/.test(phone_form.value.code))
const disable = computed(() => {
  if (is_phone.value) {
    return !valid_code.value || !valid_phone.value
  } else {
    return !name_form.value.username || !name_form.value.password
  }
})
</script>

<style scoped lang="less">

</style>
