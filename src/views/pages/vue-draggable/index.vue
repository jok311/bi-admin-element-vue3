<template>
  <div class="draggable-box">
    <draggable class="dragArea list-group w-full" :list="list" @change="log">
      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="element in list"
        :key="element.name"
      >
        <div style="height: 100px; backgroud-color: blue;">
          {{ element.name }}
        </div>
      </div>
    </draggable>

    <router-link to="/side/index">
      <span>side/test</span>
    </router-link>    

  </div>
</template>
<script>
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      enabled: true,
      list: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 },
      ],
      dragging: false
    };
  },
  watch: {
    list(val) {
      console.log(val, 6666666622222222)
    }
  },
  methods: {
    log(event) {
      console.log(event);
      console.log(this.list, 44444666666)
    },
  },
};
</script>

<style lang="stylus" scoped>
.draggable-box 
  .text-center
    height 20vh
    width 49.50%
    background #eee
    margin-bottom 1px
    display inline-block
</style>