<template>
  <div class="grid-layout-box">
    <grid-item
      v-for="(item) in 3"
      :id="item"
      :key="item"
    />
    <!-- <grid-item></grid-item> -->
  </div>
</template>
<script>
import { reactive } from 'vue'
import gridItem from './gridItem.vue'
export default {
  components: { gridItem },
  setup() {
    let layout = reactive([
      {}
    ])
  },

}
</script>

<style lang="stylus" scoped>
.grid-layout-box
  position relative
</style>