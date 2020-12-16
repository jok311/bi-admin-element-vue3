<template>
  <div
    ref="gridItemBox"
    class="draggable"
  >
    Draggable Element
  </div>
</template>
<script>
import interact from 'interactjs'
import { ref, onMounted } from 'vue'

export default {
  props: {
    id: {
      type: [Number, String],
      default: ''
    }
  },
  setup() {

    let gridItemBox = ref(null)


    onMounted( () => {
      setInteract()
    })

    function setInteract() {
      let position = { x: 0, y: 0 }

      let resizeAvail = true, draggableAvail = true

      console.log(gridItemBox, 313131)

// .draggable({
//         listeners: {
//           start (event) {
//             console.log(event.type, event.target)
//             console.log(position, 353535353)
//             const position = { x: 0, y: 0 }
//           },
//           move (event) {
//             console.log(event, event.dx, event.dy, '----',position)
//             position.x += event.dx
//             position.y += event.dy
//             event.target.style.transform = `translate3d(${position.x < 0 ? 0 : position.x}px, ${position.y < 0 ? 0 : position.y}px, 0px)`
//           },
//         }
//       })      
      
      interact(gridItemBox.value).resizable({
          edges: { top: false, left: false, bottom: true, right: true },
          listeners: {
            move: function (event) {
              if( resizeAvail ) {
                Object.assign(event.target.style, {
                  width: `${event.rect.width}px`,
                  height: `${event.rect.height}px`,
                  // transform: `translate(${x}px, ${y}px)`
                })
                resizeAvail = false
                setTimeout( () => {
                  resizeAvail = true
                }, 50)
              }else{
                return
              }

              console.log(event.rect.width, event.rect.height)

              Object.assign(event.target.dataset)
            }
          }
        })   
    }
      
    return { gridItemBox }
  }
}
</script>

<style lang="stylus" scoped>
.draggable {
  display inline-block
  // position absolute
  width: 25%;
  min-height: 6.5em;
  background-color: #29e;
  color: white;
  // border-radius: 0.75em;
  touch-action: none;
  user-select: none;
}
</style>