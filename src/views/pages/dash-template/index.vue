<template>
  <div class="dash-template-box">
    dash-template: {{ template }}
    <!-- <j-a-table></j-a-table> -->
  </div>
</template>
<script>
import { ref, toRefs, reactive, onMounted, watch, watchEffect, getCurrentInstance, inject } from "vue";
export default {
  name: 'DashTemplate',
  setup(props, context) {

    const ctx = getCurrentInstance()

    const template = ref('template')

    const $myGlobalVariable = inject('$myGlobalVariable')

    console.log($myGlobalVariable, "$myGlobalVariable")

    return {
      template
    }


  }
}
</script>