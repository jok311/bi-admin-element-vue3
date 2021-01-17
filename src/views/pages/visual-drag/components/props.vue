<template>
  <div class="props-box" :style="{width: width}">
    <div class="pack-box" @click="pack()"><i :class="isShow ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i></div>
    <el-tabs type="border-card">
      <el-tab-pane label="数据">数据</el-tab-pane>
      <el-tab-pane label="样式">样式</el-tab-pane>
      <el-tab-pane label="高级">高级</el-tab-pane>
    </el-tabs>    
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(props) {
    let width = ref('320px')
    let isShow = ref(true)
    function pack() {
      if(isShow.value) {
        width.value = '0px'
        isShow.value = false
      }else{
        width.value = '320px'
        isShow.value = true
      }
    }


    return {
      width,
      isShow,
      pack
    }
  }
}
</script>
<style lang="stylus" scoped>
.props-box
  // width 320px

</style>

<style lang="stylus">
.props-box
  /deep/ .el-tabs--bottom .el-tabs--left>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--bottom .el-tabs--right>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--bottom.el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--bottom.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs--left>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs--right>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2)
    border none

.props-box
  position relative
  border none
  // box-shadow -2px 0 4px 0 rgba(0,0,0,.1)
  .pack-box
    display inline-flex
    align-items center
    justify-content center
    height 80px
    width 20px
    background #fff
    position absolute
    left -22px
    top 0
    bottom 0
    margin auto
    border-left 2px solid #f6f8f9
    border-top 2px solid #f6f8f9
    border-bottom 2px solid #f6f8f9
    // box-shadow -2px 0 4px 0 rgba(0,0,0,.1)
  .el-tabs
    height 100vh
    box-sizing border-box
    border-left 2px solid #f6f8f9
    border none
</style>