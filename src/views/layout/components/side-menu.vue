<template>
  <div class="side-menu-box">
    <div class="collapsed-box">
      <span class="collapsed-btn" @click="isCollapse = !isCollapse">
        <i class="el-icon-s-unfold" v-if="isCollapse"></i>
        <i class="el-icon-s-fold" v-else></i>
      </span>
    </div>


    <el-menu
      class="el-menu-vertical-demo"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :default-active="defaultOpeneds"
    >

    <el-menu-item index="/">
      <template v-slot:title>
          <i class="el-icon-menu"></i>
          <span>home-index</span>
      </template>        
    </el-menu-item>    

    <el-menu-item index="/user/index">
      <template v-slot:title>
          <i class="el-icon-menu"></i>
          <span>user-index</span>
      </template>        
    </el-menu-item>    

    <el-submenu index="1-4">
      <template v-slot:title>
        <i class="el-icon-menu"></i>
        <span>目录</span>
      </template>
      <el-menu-item index="/vue-grid-out/index">
        <template v-slot:title>
          <span>vue-grid-out</span>
        </template>      
      </el-menu-item>
    </el-submenu>    

      <el-menu-item index="/costumclone/index">
        <template v-slot:title>
            <i class="el-icon-menu"></i>
            <span>costumclone-index</span>
        </template>        
      </el-menu-item>


      <el-menu-item index="/draggable/index">
        <template v-slot:title>
            <i class="el-icon-menu"></i>
            <span>draggable-box</span>
        </template>                        
      </el-menu-item>         


      <el-menu-item index="/dash/template">
        <template v-slot:title>
            <i class="el-icon-menu"></i>
            <span>dash-template</span>
        </template>                         
      </el-menu-item>       

      <el-menu-item index="/dash/box">
        <template v-slot:title>
            <i class="el-icon-menu"></i>
            <span>dash-box</span>
        </template>                         
      </el-menu-item>       

      <el-menu-item index="/side/index">
        <template v-slot:title>
            <i class="el-icon-menu"></i>
            <span>side-box</span>
        </template>            
      </el-menu-item>       
    </el-menu>
  </div>
</template>



<script>
import { ref, watch, getCurrentInstance, computed } from "vue";
export default {
  setup(props) {
    const { ctx } = getCurrentInstance();
    let isCollapse = ref(true);
    
    //is_active
    const route = ctx.$root.$route
    const defaultOpeneds = computed(() => route.fullPath )

    function handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    }
    function handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }


    // watch(
    //   () => ctx.$root.$route, 
    //   val => {
    //     console.log(val.fullPath, 109)
    //     defaultOpeneds.value = val.fullPath
    //   },
    //   { immediate: true, deep: true },      
    // );    

    return { isCollapse, handleOpen, handleClose, defaultOpeneds };
  },
};
</script>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.side-menu-box .el-menu {
  border-right: none;
}
</style>

<style lang="stylus" scoped>
.side-menu-box
  height 100vh
  overflow-y scroll
  border-right 1px solid rgb(230, 230, 230)
  background #fff
  .collapsed-box
    .collapsed-btn
      display block
      text-align center
      padding 8px 0

.router-box
  display block
  // color rgb(48, 49, 51)
  text-decoration none
</style>

<style lang="stylus">
.side-menu-box
  .el-menu-item
    // padding 0 !important
    // text-align center
</style>