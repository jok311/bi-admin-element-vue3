<template>
  <div class="visual-drag-box">
    <div class="component-list">
        <div v-for="(item, index) in componentList" :key="index" class="list" @dragstart="handleDragStart" draggable="true" :data-index="index">
            <span>{{ item.label }}</span>
        </div>
    </div>


    <div class="content" @drop="handleDrop" @dragover="handleDragOver">
        <div 
          class="list" 
          v-for="(item, index) in editComponentList" 
          :key="index" 
          :style="{ top: item.style.top+'px', left: item.style.left+'px'}"
          @mousedown="handleMouseDownOnPoint(item, index)"

        >
          {{ item.label }}
        </div>
    </div>    
  </div>
</template>

<script>
import { ref, reactive, unref, watch } from 'vue'
export default {
  setup() {
    let componentList = ref([
      {label: 'chart', key: 'chart'},
      {label: 'pie', key: 'pie'},
      {label: 'line', key: 'line'},
    ])

    let editComponentList = window.localStorage.editComponentList ? ref(JSON.parse(window.localStorage.editComponentList)) : ref([])

    function handleDragStart(e) {
      console.log(e, 36363663)
      e.dataTransfer.setData('index', e.target.dataset.index)
    }

    function handleDrop(e) {
      e.preventDefault()
      e.stopPropagation()
      if( !e.dataTransfer.getData('index') ) return
      const component = { ...componentList.value[e.dataTransfer.getData('index')] } //深拷贝
      component['style'] = {
        top: e.offsetY,
        left: e.offsetX
      }
      editComponentList.value.push(component)
      // window.localStorage.editComponentList = JSON.stringify(editComponentList.value)
      editHistory(editComponentList)
      console.log(555544444)
    }

    let dragable = true
    function handleDragOver(e) {
      e.preventDefault();
      if( dragable ) {
        dragable = false
        setTimeout( () => {
          dragable = true
        }, 500)
      }
    }

    function handleMouseDown(e) {
      console.log(e, 6464646)
      e.preventDefault()
      e.stopPropagation()

    }

    function handleMouseDownOnPoint(point, index) {
      console.log(point, 777774444)
      const downEvent = window.event
      downEvent.stopPropagation()
      downEvent.preventDefault()
      const pos = point
      console.log(pos, 79797979)
      const startY = downEvent.clientY
      const startX = downEvent.clientX
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const startTop = Number(pos.style.top)
      const startLeft = Number(pos.style.left)

      let moveable = true
      const move = (moveEvent) => {
        if(!moveable) return
        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        console.log(startY, startX, currY, currX, startTop, startLeft) 
        editComponentList.value[index].style = { top:  currY - startY + startTop, left: currX - startX + startLeft}
        moveable = false
        setTimeout(() => {
          moveable = true
        }, 50);
        // this.$store.commit('setShapeStyle', pos)
      }
      const up = () => {
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', up)
          window.localStorage.editComponentList = JSON.stringify(editComponentList.value)
          editHistory(editComponentList)
          console.log(105555)
          // needSave && this.$store.commit('recordSnapshot')
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }

    function editHistory(editComponentList) {
      let editComponentListHistory = []
      if( window.localStorage.editComponentListHistory ) {
        editComponentListHistory = JSON.parse(window.localStorage.editComponentListHistory)
        console.log(editComponentListHistory, 1111111999999)
        editComponentListHistory.push(editComponentList.value)
      }else{
        editComponentListHistory = [editComponentList.value]
        console.log(editComponentList, 121212122)

      }
      console.log(editComponentListHistory, 111177777)
      window.localStorage.editComponentListHistory = JSON.stringify(editComponentListHistory)
    }

    watch( 
      () => editComponentList,
      val => {
        // console.log(val, 1115555)
      },
      { immediate: true, deep: true },     
    )


    return { componentList, editComponentList, handleDragStart, handleDrop, handleDragOver, handleMouseDownOnPoint } 
  }
}
</script>

<style lang="stylus" scoped>
.visual-drag-box
  display flex
  .component-list
    width 120px
    .list
      background #eee
      height 72px
      margin 4px
      cursor copy
  .content
    background #fff
    height 98vh
    flex 1
    position relative
    .list
      background #eee
      height 72px
      width 33%
      position absolute
</style>