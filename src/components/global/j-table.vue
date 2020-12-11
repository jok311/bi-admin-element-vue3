<template>
  <div class="j-table-box">
    <el-table
      :data="data"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :row-key="rowKey"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      :tree-props="treeProps"
      >
      <template v-for="item in columns">
        <el-table-column
          v-if="item.hidden ? false : true"
          :label="item.label"
          :fit="true"
          :key="item.key"
          :prop="item.key"
          :min-width="item.width ? item.width : width"
          :column-key="item.columnKey"
          v-bind="$attrs"
        >
          <template #header="scope">
            <slot :scope="scope" :name="`${item.key}_header`">
              {{ item.label }}
            </slot>
          </template>        
          
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
    width: {
      type: [String, Number],
      default: 150
    },

    //table options
    size: String,
    height: [String, Number],
    maxHeight: [String, Number],
    fit: {
      type: Boolean,
      default: true,
    },
    stripe: Boolean,
    border: Boolean,
    rowKey: [String, Function],
    showHeader: {
      type: Boolean,
      default: true,
    },
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellClassName: [String, Function],
    headerCellStyle: [Object, Function],
    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],
    emptyText: String,
    expandRowKeys: Array,
    defaultExpandAll: Boolean,
    defaultSort: Object,
    tooltipEffect: String,
    spanMethod: Function,
    selectOnIndeterminate: {
      type: Boolean,
      default: true,
    },
    indent: {
      type: Number,
      default: 16,
    },
    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children',
        }
      },
    },
    lazy: Boolean,
    load: Function,    
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