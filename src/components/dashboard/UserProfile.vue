<template>
  <div class="flex flex-col gap-2 md:gap-4">
    <div class="py-8 flex flex-col justify-center items-center back-image gap-2">
      <a-avatar class="h-16 w-16">
        <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </a-avatar>

      <div class="text-lg">Username</div>

      <div class="flex justify-center items-center gap-4">
        <i-quill-vip class="text-xl text-[rgb(var(--gold-7))]"/>
        <div class="flex justify-center items-center  text-[rgb(var(--green-7))]">
          <i-ant-design-dollar-outlined class="text-sm"/>
          1000
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row-reverse gap-2">
      <a-card class="w-full md:w-[70%]" title="数据统计">
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in
        China and around the world. Toutiao started out as a news recommendation
        engine and gradually evolved into a platform delivering content in various
        formats.
      </a-card>

      <a-card class="w-full" title="绑定发布渠道">
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in
        China and around the world. Toutiao started out as a news recommendation
        engine and gradually evolved into a platform delivering content in various
        formats.
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.back-image {
  background-size: cover !important;
  background: url(https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image) no-repeat;
}
</style>
