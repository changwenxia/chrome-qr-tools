<template>
    <div class="menu" @click="openPage">
      点击打开二维码合集
    </div>
  </template>
  
  <script>
  export default {
      methods: {
            openPage() {
                  window.open('qrCode.html', '_blank');
            }
      }
  }
</script>

<style lang="less">
.menu {
      width: 150px;
      height: 50px;
      line-height: 50px;
}
</style>
  
  