<template>
  <a-modal class="sign-modal" v-model:visible="store.show_sign_modal" @cancel="cancel" :closable="false"
           :footer="false" @close="is_register=false">
    <template #title>
      {{ !is_register ? "登录" : "注册" }}
    </template>
    <div class="md:px-4">
      <div v-if="is_register">
        <a-form :model="register_form" auto-label-width>
          <a-form-item field="username" label="用户名:">
            <a-input v-model="register_form.username"/>
          </a-form-item>
          <a-form-item field="password" label="密码:">
            <a-input-password v-model="register_form.password"/>
          </a-form-item>
          <a-form-item field="confirm_password" label="确认密码:">
            <a-input-password v-model="register_form.confirm_password"/>
          </a-form-item>
        </a-form>
      </div>
      <div v-else>
        <a-form :model="login_form" auto-label-width>
          <a-form-item field="username" label="用户名:">
            <a-input v-model="login_form.username"/>
          </a-form-item>
          <a-form-item field="password" label="密码:">
            <a-input-password v-model="login_form.password"/>
          </a-form-item>
        </a-form>
      </div>

      <div class="p-2">
        <a-button v-if="is_register" long type="primary" :disabled="!fullMap(register_form)" @click="register">
          注册账号
        </a-button>
        <a-button v-else long type="primary" :disabled="!fullMap(login_form)" @click="login">
          登录账号
        </a-button>
      </div>

      <div class="text-center text-[rgb(var(--blue-5))] cursor-pointer" @click="is_register=!is_register">
        {{ is_register ? "已有账号,去登录" : "没有账号,去注册" }}
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {UseStore} from "@/store";
import {ref} from "vue";
import {fullMap} from "@/assets/lib/utils";
import {client} from "@/assets/lib/request";
import {Notification} from "@arco-design/web-vue";
import {useRoute, useRouter} from "vue-router";

const store = UseStore()
const route = useRoute()
const router = useRouter()
const is_register = ref(false)

const register_form = ref({
  username: "",
  password: "",
  confirm_password: ""
})

const login_form = ref({
  username: "",
  password: ""
})

const cancel = () => {
  register_form.value = {
    username: "",
    password: "",
    confirm_password: ""
  }

  login_form.value = {
    username: "",
    password: ""
  }
}
const register = async () => {
  if (register_form.value.confirm_password !== register_form.value.password) {
    Notification.warning("两次密码不一致")
    return
  }

  const res = await client.post<{ token: string, user: User }>({
    url: "user/",
    data: register_form.value
  })

  if (res.code === 8000) {
    store.user = res.data.user
    store.is_login = true
    localStorage.setItem("token", res.data.token)
    store.show_sign_modal = false
    const next = route.query.next && (typeof route.query.next === "string" ? route.query.next : route.query.next[0])
    if (next) await router.push(next)
  } else {
    Notification.warning(res.msg)
  }
}

const login = async () => {
  const res = await client.post<{ token: string, user: User }>({
    url: "user/login/",
    data: login_form.value
  })
  if (res.code === 7000) {
    store.user = res.data.user
    store.is_login = true
    localStorage.setItem("token", res.data.token)
    store.show_sign_modal = false
    const next = route.query.next && (typeof route.query.next === "string" ? route.query.next : route.query.next[0])
    if (next) await router.push(next)
  } else {
    Notification.warning(res.msg)
  }
}


</script>

<style lang="less">
.sign-modal .arco-modal {
  width: 480px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: scroll;
}
</style>
