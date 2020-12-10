<template>
<div class="hello-world-box" ref="helloBox">
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p class="edit-box">
    Edit <code>components/HelloWorld.vue</code> to test hot module
    replacement.
  </p>

  <a-month-picker format="YYYY-MM" valueFormat="YYYY-MM" v-model:value="value1" @change="onChange" /><br />

  {{ value1 }}

  <a-date-picker valueFormat="YYYY-MM-DD" v-model:value="value2" placeholder="Select Time" @change="onChange" @ok="onOk" />

  <a-input v-model:value="value3" placeholder="Basic usage" />
  {{ value3 }}
</div>
</template>

<script>

// import VueGridLayout from 'vue-grid-layout';

// console.log(VueGridLayout, 131313)
import { ref, toRefs, reactive, onMounted, watch, watchEffect, getCurrentInstance } from "vue";

export default {
  name: "HelloWorld",
  // components: {
  //   GridLayout: VueGridLayout.GridLayout,
  //   GridItem: VueGridLayout.GridItem
  // },

  props: {
    msg: String,
  },

  setup(props) {

    const count = ref(0);

    const value1 = ref('2020-09')
    const value2 = ref(null)
    const value3 = ref(null)

    const state = reactive({
      value1: null,
      value2: null
    });

    const ctx = getCurrentInstance();

    const onChange = (value, dateString) => {
      // console.log("Selected Time: ", value);
      // console.log("Formatted Selected Time: ", dateString);
    };

    const onOk = (value) => {
      // console.log('onOk: ', value);
    };

    watch(
      () => state.value1, val => {
        console.log(val, 60606060)
        console.log('watch', state.value1, 696699696)
        console.log('watch', state.value2, 707070)
      }      
    );

    onMounted(() => {
      // console.log(ctx, 2121);
    });
    return {
      ...toRefs(state),
      value1,
      value2,
      value3,
      count,
      onChange,
      onOk
    };
  },
};
</script>

<style lang="stylus" scoped>
.hello-world-box
  font-size 28px 
  font-weight bold 
  .edit-box 
    color green
</style>
