<template>
  <div class="user-box">
    <j-table
      :data="userList"
      :columns="columns"
      size="medium"
    >  
      <template #edit="{ scope }">
        <el-button
          size="mini"
          type="primary"
          @click="editItem(scope.row)"
        >
          修改
        </el-button>
        <el-button
          size="mini"
          type="primary"
          @click="updateItem(scope.row)"
        >
          重置密码
        </el-button>          
        <el-button
          size="mini"
          type="danger"
          @click="deleteItem(scope.row)"
        >
          删除
        </el-button>
      </template>   
      <template #update_at="scope">
        {{ dayjs(scope.row).format() }}
      </template>
      <template #update_at_header>
        日期
      </template>
    </j-table>
  </div>
</template>


<script>
import { ref, reactive, toRefs, getCurrentInstance, onMounted, defineAsyncComponent, computed } from 'vue'
import jTable from '../../../components/global/j-table.vue'

var dayjs = require('dayjs')

console.log(dayjs(1605518744860).format())

export default {
    name: 'User',
    components: {
      jTable
    },
    setup() {
      const { ctx } = getCurrentInstance()

      let pageNum = ref(1)
      let pageSize = ref(10)
      let userList = ref([])
      let columns = ref([
        {label: '姓名', key: 'name'},
        {label: '邮箱', key: 'email'},
        {label: '描述', key: 'remark'},
        {label: '状态', key: 'status'},
        {label: '更新时间', key: 'update_at', width: 220},
        {label: '操作', key: 'edit', width: 250},
      ])
      
      get()
      function get() {
        let data = {
          page_num: pageNum.value,
          page_size: pageSize.value
        }
        ctx.getRequest('http://localhost:9521/user/list', data).then( res => {
          userList.value = res.data.list
        })
      }

      return { get, userList, columns, dayjs }
    }
}
</script>

