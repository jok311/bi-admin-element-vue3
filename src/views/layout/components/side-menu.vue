<template>
  <div class="side-menu-box">
    <div class="collapsed-box">
      <span
        class="collapsed-btn"
        @click="isCollapse = !isCollapse"
      >
        <i
          v-if="isCollapse"
          class="el-icon-s-unfold"
        />
        <i
          v-else
          class="el-icon-s-fold"
        />
      </span>
    </div>


    <el-menu
      class="el-menu-vertical-demo"
      :router="true"
      :collapse="isCollapse"
      :default-active="defaultOpeneds"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/">
        <template #title>
          <i class="el-icon-menu" />
          <span>home-index</span>
        </template>        
      </el-menu-item>    

      <el-menu-item index="/user/index">
        <template #title>
          <i class="el-icon-menu" />
          <span>user-index</span>
        </template>        
      </el-menu-item>    
      <el-menu-item index="/visual-drag/index">
        <template #title>
          <i class="el-icon-menu" />
          <span>visual-drag-index</span>
        </template>        
      </el-menu-item>    
      <el-menu-item index="/position-drag/index">
        <template #title>
          <i class="el-icon-menu" />
          <span>position-drag-index</span>
        </template>        
      </el-menu-item>    
      <el-menu-item index="/icons/index">
        <template #title>
          <i class="el-icon-menu" />
          <span>icons-index</span>
        </template>        
      </el-menu-item>    
      <el-menu-item index="/water-fall/index">
        <template #title>
          <i class="el-icon-menu" />
          <span>water-fall-index</span>
        </template>        
      </el-menu-item>    
      <el-menu-item index="/interact/index">
        <template #title>
          <i class="el-icon-menu" />
          <span>interact-index</span>
        </template>        
      </el-menu-item>    
      <el-menu-item index="/vue-drag-resize/index">
        <template #title>
          <i class="el-icon-menu" />
          <span>vue-drag-resize</span>
        </template>        
      </el-menu-item>    

      <el-submenu index="1-4">
        <template #title>
          <i class="el-icon-menu" />
          <span>目录</span>
        </template>
        <el-menu-item index="/vue-grid-out/index">
          <template #title>
            <span>vue-grid-out</span>
          </template>      
        </el-menu-item>
      </el-submenu>    

      <el-menu-item index="/costumclone/index">
        <template #title>
          <i class="el-icon-menu" />
          <span>costumclone-index</span>
        </template>        
      </el-menu-item>


      <el-menu-item index="/draggable/index">
        <template #title>
          <i class="el-icon-menu" />
          <span>draggable-box</span>
        </template>                        
      </el-menu-item>         


      <el-menu-item index="/dash/template">
        <template #title>
          <i class="el-icon-menu" />
          <span>dash-template</span>
        </template>                         
      </el-menu-item>       

      <el-menu-item index="/dash/box">
        <template #title>
          <i class="el-icon-menu" />
          <span>dash-box</span>
        </template>                         
      </el-menu-item>       

      <el-menu-item index="/side/index">
        <template #title>
          <i class="el-icon-menu" />
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
    let isCollapse = ref(false);
    let defaultOpeneds = ref('')
    
    //is_active
    const route = ctx.$root.$route



    function handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    }
    function handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }

    //路由内部跳转的时候无法computed到变化
    // const defaultOpeneds = computed(() => route.fullPath ) 
    watch(
      () => ctx.$root.$route.fullPath, 
      val => {
        defaultOpeneds.value = val
      },
      { immediate: true, deep: true },      
    );    

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