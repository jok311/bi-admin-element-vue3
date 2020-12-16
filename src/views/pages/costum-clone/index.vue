<template>
  <div class="costum-clone-box">
    <div class="col-3">
      <h3>拖拽到右侧复制</h3>
      <draggable
        class="dragArea list-group list-group-left"
        :list="list1"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="cloneDog"
      >
        <div
          v-for="(element) in list1"
          :key="element.id"
          class="list-group-item"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div>

    <div
      ref="groupList"
      class="col-3"
    >
      <h3>展示box</h3>
      <draggable
        ref="groupRight"
        class="dragArea list-group list-group-right"
        :list="list2"
        v-bind="dragOptions"
        group="people"
        @end="log"
      >
        <transition-group type="transition">
          <grid-item
            v-for="(element, i) in list2"
            :key="element.id"
            :ref="el => { if (el) groupItemsDom[i] = el }"
            class="list-group-item"
          >
            {{ element.name }}
          </grid-item>
          <!-- <div
            class="list-group-item"
            v-for="(element, i) in list2"
            :key="element.id"
            :ref="el => { if (el) groupItemsDom[i] = el }"
          >
            {{ element.name }}
          </div> -->
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import { ref, unref, readonly, onMounted, getCurrentInstance } from 'vue'
import { VueDraggableNext } from "vue-draggable-next";
import 'vue-resize/dist/vue-resize.css'
import VueResize from 'vue-resize'

import gridItem from './gridItem.vue'

    import VueGridLayout from 'vue-grid-layout';



let idGlobal = 8;
export default {
  name: "CustomClone",
  display: "Custom Clone",
  order: 3,
  components: {
    draggable: VueDraggableNext,
    gridItem ,
    VueResize
  },

  setup(props, { refs }) {

    const ctx = getCurrentInstance()

    const groupRight = ref(null)
    const groupItemsDom = []
    
    

    function handleResize ({ width, height }) {
      console.log('resized', width, height)
    }


    // 节流监听dom
    let isAvail = true
    const myObserver = new ResizeObserver( entries => {
      if(isAvail) {
        setProps(entries)
        isAvail = false
        setTimeout( () => {
          isAvail = true
        }, 500)
      }

    })

    function setProps(entries) {
      console.log(entries, 8889999)
      entries.forEach(entry => {
        console.log('大小位置 contentRect', entry.contentRect)
        // console.log('监听的DOM target', entry.target)
      })
    }
    

    onMounted( () => {
      myObserver.observe(groupRight.value.$el)      

      console.log(groupItemsDom, 989898)
      // myObserver.observe(groupItemsDom)      
      groupItemsDom.forEach( item => {
        // myObserver.observe(item)      
      })
    })

    return { handleResize, groupRight, groupItemsDom }
  },

  data() {
    return {
      list1: [
        { name: "dog 1", id: 1 },
        { name: "dog 2", id: 2 },
        { name: "dog 3", id: 3 },
        { name: "dog 4", id: 4 }
      ],
      list2: [
        { name: "cat 5", id: 5 },
        { name: "cat 6", id: 6 },
        { name: "cat 7", id: 7 },
        { name: "cat 7", id: 7 },
        { name: "cat 7", id: 7 },
        { name: "cat 7", id: 7 },
        { name: "cat 7", id: 7 },
        { name: "cat 7", id: 7 },
      ]
    };
  },

  computed: {
    newList1() {
      return this.list1.map( item => {
        return { ...item }
      })
    },
    newList2() {
      return this.list2.map( item => {
        return { ...item }
      })
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },

  methods: {
    log(evt) {
      // window.console.log(evt);
      console.log(this.newList1, 767676)
      console.log(this.newList2, 77777666666)
    },
    cloneDog({ id }) {
      return {
        name: `cat ${id}`,
        id: idGlobal++
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
.costum-clone-box
  display flex
  background #fff
  height 100vh
  padding 0 4px
  .col-3
    // width 50%
    .list-group-left
      // display flex
    .list-group-right
      display inline-block
      width 72vw
      height 85vh
      border 1px solid #eee
      // resize both
      // overflow auto    
      position relative
      .list-group-item
        display inline-block
        min-width 100px
        min-height 100px
        width 33%
        // border 2px solid red
        // padding 10px 40px
        // width 300px
        // resize both
        // overflow auto
    .list-group
      .list-group-item
        // width 150px
        height 72px
        margin 0 2px 4px 0
        text-align center
        color #fff
        // background rgba(230,75, 77, 1)
        background #f3f4f5
</style>

<style lang="stylus">

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
