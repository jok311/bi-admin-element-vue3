<template>
  <div class="draggable-custom-clone-box row">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
        class="dragArea list-group"
        :list="componentList"
        :group="{ name: 'people', pull: 'clone', put: false }"
        :clone="cloneDog"
        @change="log"
      >
        <div
          class="list-group-item"
          v-for="item in componentList"
          :key="item.id"
        >
          {{ item.name }}
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable
        class="dragArea list-group"
        :list="gridList"
        group="people"
        @change="log"
      >
        <div class="list-group-item" v-for="item in gridList" :key="item.id">
          {{ item.name }}
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
let idGlobal = 8;
export default {
  name: "custom-clone",
  display: "Custom Clone",
  order: 3,
  components: {
    draggable: VueDraggableNext,
  },
  setup(props) {
    const componentList = [
      { name: "dog 1", id: 1 },
      { name: "dog 2", id: 2 },
      { name: "dog 3", id: 3 },
      { name: "dog 4", id: 4 },
    ];

    const gridList = [
      { name: "cat 5", id: 5 },
      { name: "cat 6", id: 6 },
      { name: "cat 7", id: 7 },
    ];

    function log(evt) {
      window.console.log(evt);
    };

    function cloneDog({ id }) {
      return {
        id: idGlobal++,
        name: `cat ${id}`,
      };
    };

    return {
      componentList,
      gridList,

      // 方法
      log,
      cloneDog,
    }
  },
  // methods: {
  //   log: function(evt) {
  //     window.console.log(evt);
  //     // console.log(this.list1, this.list2, 66666665555555)
  //     // for (const item of this.list1) {
  //     //   console.log(item)
  //     // }
  //   },
  //   cloneDog({ id }) {
  //     return {
  //       id: idGlobal++,
  //       name: `cat ${id}`
  //     }
  //   }
  // }
}
</script>
<style scoped></style>
