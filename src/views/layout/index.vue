<template>
  <div class="lay-out-box">
    <side-menu />
    <app-main />
    <!-- <component :is="sideMenu"></component> -->
    <!-- <component is="sideMenu"></component>
    <component is="appMain"></component> -->
  </div>
</template>

<script>
import appMain from './components/app-main.vue'
import sideMenu from './components/side-menu.vue'
export default {
  components: {
    appMain,
    sideMenu
  }
}
</script>
<style lang="stylus" scoped>
.lay-out-box
  display flex
</style>

<style lang="stylus">
body
  margin 0
  padding 0
</style>