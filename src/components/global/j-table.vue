<template>
  <div class="j-table-box">
    <el-table
      :data="data"
      style="width: 100%">
      <template v-for="item in columns">
        <el-table-column
          v-if="item.hidden ? false : true"
          :label="item.label"
          :key="item.key"
          v-bind="$attrs"
        >
          <template #default="scope">
            <slot :scope="scope" :name="item.key">
              {{ scope.row[item.key] }}              
            </slot>
          </template>
        </el-table-column>
      </template>       
    </el-table>    
  </div>
</template>
<script>
import { watch } from 'vue'
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  setup(props) {
    // watch( 
    //   () => props.data,
    //   val => {
    //     console.log(val, 444)
    //   },
    //   { immediate: true, deep: true }, 
    // )

  },
}
</script>