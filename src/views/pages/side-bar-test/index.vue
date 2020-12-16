<template>
  <div class="side-bar-box">
    side-bar-box
    <router-link to="/draggable/index">
      <span>draggable</span>
    </router-link>
    {{ title }}
    <div @click="addCount()">
      count++
    </div>
    <div>{{ count }}</div>
    <!-- <line-bar-chart :data="dataColumns.data" :columns="dataColumns.columns" :title="title"></line-bar-chart> -->
  </div>
</template>
<script>
import { ref, toRefs, reactive, onMounted, watch, watchEffect } from "vue";
// import lineBarChart from "../../src/components/global/line-bar-chart.vue";
export default {
  // components: { lineBarChart },
  setup() {
    let dataColumns = {
      columns: [
        { label: "日期", key: "date" },
        {
          label: "PV",
          key: "pv",
          isSortable: true,
          // echarts图表series的option
          "echartsSeriesOption": {
            name: '日活',
            key: 'pv',
            type: "line",
            // color: "rgb(84, 202, 193)",
            showSymbol: true,
            showAllSymbol: false,
            itemStyle: {
              normal: {
                // barBorderRadius: [30, 30, 0, 0],
                label: {
                  show: true,
                  color: "#3a3a3a",
                  position: "top",
                  // formatter: function(c) {
                  //   console.log(c)
                  //   return c.toLocaleString()
                  //   // return p.toLocaleString()
                  // }
                }
              }
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          }
        },
      ],
      data: [
        { date: "2020-09-10", total: "total", pv: 35647.06 },
        { date: "2020-09-11", total: "total", pv: 34253.33 },
        { date: "2020-09-12", total: "total", pv: 30821.88 },
        { date: "2020-09-13", total: "total", pv: 33034.88 },
        { date: "2020-09-14", total: "total", pv: 33501.07 },
        { date: "2020-09-15", total: "total", pv: 32685.97 },
        { date: "2020-09-16", total: "total", pv: 32969.05 },
        { date: "2020-09-17", total: "total", pv: 32206.33 },
        { date: "2020-09-18", total: "total", pv: 32751.57 },
        { date: "2020-09-19", total: "total", pv: 33567.9 },
        { date: "2020-09-20", total: "total", pv: 31322.44 },
        { date: "2020-09-21", total: "total", pv: 31463.14 },
        { date: "2020-09-22", total: "total", pv: 31583.97 },
        { date: "2020-09-23", total: "total", pv: 30608.09 },
        { date: "2020-09-24", total: "total", pv: 34470.35 },
        { date: "2020-09-25", total: "total", pv: 33798.61 },
        { date: "2020-09-26", total: "total", pv: 33588.64 },
        { date: "2020-09-27", total: "total", pv: 37478.32 },
        { date: "2020-09-28", total: "total", pv: 37340.35 },
        { date: "2020-09-29", total: "total", pv: 38397.35 },
        { date: "2020-09-30", total: "total", pv: 42585.01 },
        { date: "2020-10-01", total: "total", pv: 43072.95 },
        { date: "2020-10-02", total: "total", pv: 36686.67 },
        { date: "2020-10-03", total: "total", pv: 34934.3 },
        { date: "2020-10-04", total: "total", pv: 44494.64 },
        { date: "2020-10-05", total: "total", pv: 37954.75 },
        { date: "2020-10-06", total: "total", pv: 37595.06 },
        { date: "2020-10-07", total: "total", pv: 35567.24 },
        { date: "2020-10-08", total: "total", pv: 36725.32 },
        { date: "2020-10-09", total: "total", pv: 256.78 },
      ],
    }

    let title = ref('标题'), count = ref(1)
    function addCount() {
      count.value++
      title.value = '新标题' + count.value 
      let array = []
      for (let i = 0; i < 20; i++) {
        array.push({ date: Math.random(), total: 'total', pv: Math.random() })
      }
      dataColumns.data = array
    }

    return {
      title,
      count,
      dataColumns,
      addCount
    }
  },
};
</script>

<style lang="stylus"></style>
