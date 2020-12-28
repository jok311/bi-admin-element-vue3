<template>
  <div class="visual-drag-box">
    <div class="component-list">
        <div v-for="(item, index) in componentList" :key="index" class="list" @dragend="handleDragEnd" @dragstart="handleDragStart" draggable="true" :data-index="index">
            <span>{{ item.label }}</span>
        </div>
    </div>
    <div class="edit-box">
      
      <div id="edit-content-box" class="content" @drop="handleDrop($event)" @dragover="handleDragOver">
          <div class="line-box"></div>
          <div 
            class="list" 
            v-for="(item, index) in editComponentList" 
            :key="index"
            :style="{ 
              top: item.style.top+'px', 
              left: item.style.left+'%',
              height: item.style.height+'px',
              width: item.style.width+'%',
            }"
            
            @mousedown="handleMouseDown(item, index)"
          >
            <div class="point-box" @mousedown="handleMouseDownOnPoint(item, index)"><span class="point"></span></div>
            {{ index }}
            {{ item.label }}
            {{ editContentBoxWidth }}
            ---
            {{ item.style.width }}
            ----
            {{ item.style.width/editContentBoxWidth }}
          </div>
      </div>    
    </div>
  </div>
</template>

<script>
import { ref, reactive, unref, watch, onMounted } from 'vue'
export default {
  setup() {
    let colNum = 12, colWidth=ref(null), rowHeight = 150
    let componentList = ref([
      {
        label: 'chart', 
        key: 'chart', 
        style: {
          height: 72,
          width: 33
        }
      },
      {
        label: 'pie', 
        key: 'pie',
        style: {
          height: 72,
          width: 33
        }        
      },
      {
        label: 'line', 
        key: 'line',
        style: {
          height: 72,
          width: 33
        }        
      },
    ])

    let editContentBox, editContentBoxWidth =ref(null); //编辑区域的宽高位置
    onMounted( () => {
      editContentBox = document.querySelector('#edit-content-box').getBoundingClientRect()
      editContentBoxWidth.value = editContentBox.width
      colWidth.value = editContentBoxWidth.value/colNum
    })

    let editComponentList = window.localStorage.editComponentList ? ref(JSON.parse(window.localStorage.editComponentList)) : ref([])

    //组件拖拽区target
    let dropOffsetX, dropOffsetY, dropScreenY
    function handleDragStart(e) {
      e.target.style.opacity = .5
      e.dataTransfer.setData('index', e.target.dataset.index)
      dropOffsetX = e.offsetX
      dropOffsetY = e.offsetY
      dropScreenY = e.screenY
    }
    function handleDragEnd(e) {
      e.target.style.opacity = ''
    }

    
    function handleDrop(e) {
      // e.preventDefault()
      // e.stopPropagation()
      if( !e.dataTransfer.getData('index') ) return
      const component = { ...componentList.value[e.dataTransfer.getData('index')] } //深拷贝
      let targetName = e.target.id == 'edit-content-box'
      let scrollTop = document.querySelector('#edit-content-box').scrollTop

      let targetLet = (e.offsetX - dropOffsetX)/editContentBoxWidth.value*100
      let unTargetLeft = (e.x - dropOffsetX - dropScreenY)/editContentBoxWidth.value*100
      let maxLeft = 100 - component.style.width
      targetLet = targetLet < maxLeft ? targetLet : maxLeft
      unTargetLeft = unTargetLeft < maxLeft ? unTargetLeft : maxLeft
      component['style'] = {
        top: targetName ? e.offsetY - dropOffsetY + scrollTop : e.y - dropOffsetY + scrollTop,
        left: targetName ? targetLet : unTargetLeft,
        ...component.style
      }
      editComponentList.value.push(component)
      window.localStorage.editComponentList = JSON.stringify(editComponentList.value)
      editHistory(editComponentList)
    }

    let dragable = true
    function handleDragOver(e) {
      e.preventDefault();
      e.stopPropagation()
      // if( dragable ) {
      //   dragable = false
      //   setTimeout( () => {
      //     dragable = true
      //   }, 500)
      // }
    }

    function handleMouseDown(e) {
      e.preventDefault()
      e.stopPropagation()
    }

    function handleMouseDown(item, index) {
      const downEvent = window.event
      downEvent.stopPropagation()
      downEvent.preventDefault()
      const pos = item
      const startY = downEvent.clientY
      const startX = downEvent.clientX
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const startTop = Number(pos.style.top)
      const startLeft = Number(pos.style.left/100*editContentBoxWidth.value)
      const height = Number(pos.style.height)
      const width = Number(pos.style.width)


      let moveable = true, isMove = false
      const move = (moveEvent) => {
        if(!moveable) return
        isMove = true //移动了
        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        let newTop = currY - startY + startTop
        let newLeft = ((currX - startX + startLeft)/editContentBoxWidth.value*100).toFixed(0)
        let maxLeft = 100 - width
        newLeft = newLeft > maxLeft ? maxLeft : newLeft
        newLeft = newLeft >= 0 ? newLeft : 0
        newTop = newTop >= 0 ? newTop : 0 
        editComponentList.value[index].style = { 
          top: newTop + (4-newTop%4), 
          left: newLeft,
          height,
          width
        }
        // moveable = false
        // setTimeout(() => {
        //   moveable = true
        // }, 50);
      }
      const up = () => {
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', up)
          if(isMove) {
            editHistory(editComponentList)
            isMove = false
          }
          
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    }

    function handleMouseDownOnPoint(item, index) {
      const downEvent = window.event
      downEvent.stopPropagation()
      downEvent.preventDefault()
      const pos = item
      const startY = downEvent.clientY
      const startX = downEvent.clientX
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const startTop = Number(pos.style.top)
      const startLeft = Number(pos.style.left)  
      const startHeight = Number(pos.style.height)
      const startWidthPt = Number(pos.style.width)
      const startWidthPX = Number(pos.style.width)/100*editContentBoxWidth.value
      
      let isResize = false
      const move = (moveEvent) => {
        isResize = true
        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        const disY = currY - startY
        const disX = currX - startX
        let newWidthPt = (startWidthPX + disX)/editContentBoxWidth.value*100
        let MaxWidthPt = 100 - startLeft
        newWidthPt = newWidthPt > MaxWidthPt ? MaxWidthPt : newWidthPt
        newWidthPt = newWidthPt.toFixed(0)
        let style = { 
          top:  startTop, 
          left: startLeft,
          width: newWidthPt < 100 ? newWidthPt : 100,
          height: (startHeight + disY) + (8-(startHeight + disY)%8)
        }
        editComponentList.value[index].style = { ...style }
      }
      
      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        if(isResize) {
          editHistory(editComponentList)
        }
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)      
    }

    function editHistory(editComponentList) {
      window.localStorage.editComponentList = JSON.stringify(editComponentList.value)
      let editComponentListHistory = []
      if( window.localStorage.editComponentListHistory ) {
        editComponentListHistory = JSON.parse(window.localStorage.editComponentListHistory)
        editComponentListHistory.push(editComponentList.value)
      }else{
        editComponentListHistory = [editComponentList.value]
      }
      window.localStorage.editComponentListHistory = JSON.stringify(editComponentListHistory)
    }


    return {
      colWidth,
      editContentBoxWidth,
      componentList, 
      editComponentList, 
      handleDragStart,
      handleDragEnd,
      handleDrop,
      handleDragOver,
      handleMouseDown,
      handleMouseDownOnPoint } 
  }
}
</script>

<style lang="stylus" scoped>
.visual-drag-box
  display flex
  .component-list
    width 120px
    height 92vh
    .list
      background #eee
      height 72px
      // min-width 72px
      margin 4px
      cursor copy
  .edit-box
    height 100vh
    flex 1
    overflow scroll
    position relative
    .content
      background #fff
      min-height 220vh
      min-width 960px
      position relative
      overflow auto
      .line-box
        display inline-block
        height 100%
        width 1px
        background #409EFF
        position absolute      
        z-index 99999
      .list
        background #eee
        height 72px
        // width 33%
        position absolute
        border 4px solid #fff
        box-sizing border-box
        .point-box
          cursor se-resize
          display inline-block
          position absolute
          width 12px
          height 12px
          background #eee
          right 0
          bottom 0
          .point
            display inline-block
            border-right 3px solid #409EFF
            border-bottom 3px solid #409EFF
            width 5px
            height 5px
            position absolute
            right 2px
            bottom 2px
</style>