<template>
  <div class="line-bar-chart-box">
    <div
      ref="chartBox"
      :class="className"
      :style="{ height, width}"
    />
    <div>{{ title }}</div>
    <div
      v-for="(item, index) in data"
      :key="index"
    >
      {{ item.date }}--------{{ item.pv }}-------data
    </div>
  </div>
</template>
<script>

import { ref, toRefs, reactive, computed, onMounted, watch, watchEffect, getCurrentInstance, inject } from "vue";
import echarts from 'echarts'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: "chart"
    },    
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '30vh',
    },
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
  setup(props, context) {

    watch(
      () => props.data,
      () => {
          console.log(props.data, 57)
      },
      { immediate: true, deep: true },
    )

    watch(
      () => props.title,
      (val) => {
        console.log(val)
      },
      { immediate: true, deep: true},
    )

    return {
      // neWtitle,
    }
  }
}
</script>