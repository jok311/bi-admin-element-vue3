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
        <div class="list-group-item" v-for="element in list1" :key="element.id">
          {{ element.name }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>展示box</h3>
      <draggable
        class="dragArea list-group list-group-right"
        :list="list2"
        v-bind="dragOptions"
        group="people"
        @end="log"
      >
      <transition-group type="transition">
        <div class="list-group-item" v-for="element in list2" :key="element.id">
          {{ element.name }}
        </div>
      </transition-group>        
      </draggable>
    </div>


  </div>
</template>

<script>
import { readonly } from 'vue'
import { VueDraggableNext } from "vue-draggable-next";
let idGlobal = 8;
export default {
  name: "custom-clone",
  display: "Custom Clone",
  order: 3,
  components: {
    draggable: VueDraggableNext
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
        { name: "cat 7", id: 7 }
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
    width 50%  
    .list-group-left
      // display flex
    .list-group-right
      display inline-block
      width 100%
      height 85vh
      border 1px solid #eee
      .list-group-item
        display inline-block
    .list-group
      .list-group-item
        width 150px
        height 72px
        margin 0 2px 4px 0
        text-align center
        color #fff
        background rgba(230,75, 77, 1)
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