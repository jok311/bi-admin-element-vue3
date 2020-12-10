<template>
  <div ref="lineBarChartBox" class="line-bar-chart-box" :style="{height: chartBoxHeight, overflow: overflowBox}">
    <div v-if="title != ''" class="title-box" :style="{textAlign: titleAlign}">
      <span class="index-box" v-if="isShowIndex"> {{ indexKey + 1 }}</span>
      <span>{{title}}</span>
      <!-- <el-tooltip v-if="comment" class="item" effect="dark" :content="comment">
        <i class="el-icon-question" style="color:#888;"></i>
      </el-tooltip>          -->
      <span v-if="isShowExport">
        <!-- <span class="export-btn" @click="tableExportToExcel(excelData, excelColumns)"><svg-icon icon-class="ExcelB" /></span>         -->
        <span class="export-btn" @click="tableExportToExcel(excelData, excelColumns)"></span>        
      </span>
    </div>
    <div :class="className" :style="{height: height, width: width}" ref="chartBox"></div>
    <div id="tooltip-box" v-if="tooltipConfig.content.length" :style="{color:tooltipConfig.color}">{{tooltipConfig.content}}</div>
  </div>
</template>
<script>

import { ref, toRefs, reactive, onMounted, watch, watchEffect, getCurrentInstance, inject } from "vue";

import echarts from 'echarts'

// var myChart = null

export default {
  name: "lineBarChart",
  data() {
    return {
      myChart: null,
      fullChart: null,
      lineBarData: [],
      axisColor: "#2a2a2a", //坐标轴颜色，坐标轴文字颜色
      yAxisColor: "#2a2a2a",
      isShowFull: false,
      seriesData: [], //图表数据
      seriesArray: {
        type: Array,
        default: () => {
          return []
        }
      },  
      dimensionsArray: {
        type: Array,
        default: () => {
          return []
        }
      },          
      legendData: {
        type: Array,
        default: () => {
          return []
        }
      },
      selected: {},
      tooltipConfig: {
        content:'',
        color:''
      },

      chartsSelectedMode: 'multiple',

      toolbox:{
          show : true,
          top: '25',
          right: '30',
          feature : {
            myFull: {
                show: true,
                title: '全屏查看',
                icon: 'path d="M0 0h256v51.2H0z" p-id="4378"></path><path d="M51.2 0v256H0V0zM1024 0v256h-51.2V0z" fill="" p-id="4379"></path><path d="M1024 51.2h-256V0h256zM1024 1024h-256v-51.2h256z" fill="" p-id="4380"></path><path d="M972.8 1024v-256h51.2v256zM0 1024v-256h51.2v256z" fill="" p-id="4381"></path><path d="M0 972.8h256v51.2H0z',
                iconStyle: {
                  borderWidth: 1,
                  borderColor: '#666'
                },
                onclick: (e) => {
                  if(this.option.toolbox.feature.myFull.title == '关闭全屏') {
                    this.isShowFull = false
                  }else{
                    this.isShowFull = true
                  }                  
                  this.initFullCharts()
                }
            },    
            myClear: {
              show: true,
              title: '清空',
              icon: 'path d="M1033.11891 495.639602a156.630697 156.630697 0 0 0-73.487689-99.771608L813.192247 311.115767l47.740178-83.143006a153.412258 153.412258 0 0 0 12.33735-127.12834A153.948664 153.948664 0 0 0 783.153483 9.11891a156.630697 156.630697 0 0 0-187.742273 70.805658L549.816658 160.921949l-150.193819-89.579885a154.485071 154.485071 0 0 0-173.795704 11.800943 122.300681 122.300681 0 0 0-48.812991 107.281299 155.557884 155.557884 0 0 0 46.667365 93.871137c-34.330016 53.64065-96.016763 155.557884-136.783657 225.290728a400.159246 400.159246 0 0 1-67.050812 69.196438 60.077528 60.077528 0 0 0-19.310634 50.42221l5.364065 31.111577 613.112625 355.637507a57.931902 57.931902 0 0 0 29.502357 8.046097 64.368779 64.368779 0 0 0 24.138292-4.827658l27.893138-15.019382 5.900472-26.820325a444.144578 444.144578 0 0 1 28.96595-94.94395l131.419592-226.899947a160.921949 160.921949 0 0 0 44.521739 6.973284 119.618649 119.618649 0 0 0 102.453641-53.64065 142.147721 142.147721 0 0 0 19.310633-113.18177zM643.687795 828.748036a268.203248 268.203248 0 0 0-24.674699 62.223153l-101.917234-57.931901 91.72551-158.239917a53.64065 53.64065 0 0 0-18.774227-73.487689 53.64065 53.64065 0 0 0-73.48769 19.84704l-92.261917 157.70351-92.798324-53.64065 92.261917-157.70351a53.64065 53.64065 0 0 0-19.310633-73.48769 53.64065 53.64065 0 0 0-73.48769 19.310634l-92.261917 158.239916-100.308015-58.468308a277.322158 277.322158 0 0 0 41.3033-53.640649c39.157674-67.050812 98.698795-160.921949 133.028811-218.85385l458.627554 263.911995c-33.257203 58.468308-89.579885 156.09429-127.664746 224.217916z m281.61341-281.077004c-8.582504 13.410162-28.429544 5.900471-43.448926-2.682033L321.843897 223.681509a73.48769 73.48769 0 0 1-37.548454-43.985333s0-5.900471 8.582504-13.410162A43.985333 43.985333 0 0 1 321.843897 157.167103a53.64065 53.64065 0 0 1 25.747512 6.973285L536.406496 275.176532a60.077528 60.077528 0 0 0 45.058145 6.436878l24.674699-8.046097 80.997381-140.002096A48.812991 48.812991 0 0 1 745.068622 107.281299a46.130959 46.130959 0 0 1 26.820325 27.356731 44.521739 44.521739 0 0 1-3.218439 37.012049L697.328444 299.314825a59.004715 59.004715 0 0 0 21.45626 80.460974l188.27868 107.281299a49.885804 49.885804 0 0 1 23.065479 31.647983 34.866422 34.866422 0 0 1-5.900471 28.965951z" fill="" p-id="751"',
              onclick: (e) => {
                this.legendSelected(false)
              }
            },                      
            myAll: {
              show: true,
              title: '全选',
              zlevel: 998,
              icon: 'path d="M450.56 207.36a23.04 23.04 0 1 1 0-46.08h506.88a23.04 23.04 0 0 1 0 46.08H450.56z m0 325.12a23.04 23.04 0 0 1 0-46.08h506.88a23.04 23.04 0 0 1 0 46.08H450.56z m0 332.8a23.04 23.04 0 0 1 0-46.08h506.88a23.04 23.04 0 0 1 0 46.08H450.56zM138.51136 223.6928l137.3184-132.736a23.04 23.04 0 1 1 32.0256 33.1264l-153.6 148.48a23.04 23.04 0 0 1-32.3072-0.27136l-71.68-71.68a23.04 23.04 0 1 1 32.58368-32.58368L138.51136 223.6928zM82.85184 495.70816l55.65952 55.66464 137.3184-132.736a23.04 23.04 0 1 1 32.0256 33.1264l-153.6 148.48a23.04 23.04 0 0 1-32.3072-0.27136l-71.68-71.68a23.04 23.04 0 0 1 32.58368-32.58368z m0 332.8l55.65952 55.66464 137.3184-132.736a23.04 23.04 0 0 1 32.0256 33.1264l-153.6 148.48a23.04 23.04 0 0 1-32.3072-0.27136l-71.68-71.68a23.04 23.04 0 0 1 32.58368-32.58368z" fill="#000000" p-id="6203"',
              onclick: (e) => {
                this.legendSelected(true)
              }

            },   
            mySelectedMode: {
              show: true,
              title: '选择模式',
              zlevel: 999,
              z: 999,
              icon: 'path d="M920 789H104c0-22.1-17.9-40-40-40V275c22.1 0 40-17.9 40-40h816c0 22.1 17.9 40 40 40v474c-22.1 0-40 17.9-40 40z" p-id="3193',
              iconStyle: {
                borderWidth: 0.8,
                borderColor: '#666'
              },    
              onclick: (e) => {
                this.chartsSelectedMode = this.chartsSelectedMode == 'multiple' ? 'single' : 'multiple'
                let rect = 'path d="M920 789H104c0-22.1-17.9-40-40-40V275c22.1 0 40-17.9 40-40h816c0 22.1 17.9 40 40 40v474c-22.1 0-40 17.9-40 40z" p-id="3193"'
                let circle = 'path d="M512 65.983C266.08 65.983 65.983 266.08 65.983 512c0 245.952 200.065 446.017 446.017 446.017S958.017 757.952 958.017 512c0-245.92-200.065-446.017-446.017-446.017z m0 828.034c-210.656 0-382.017-171.392-382.017-382.017 0-210.656 171.36-382.017 382.017-382.017 210.625 0 382.017 171.36 382.017 382.017 0 210.625-171.392 382.017-382.017 382.017z" p-id="1110"></path><path d="M512 352c-88.224 0-160 71.776-160 160s71.774 160 160 160 160-71.774 160-160-71.776-160-160-160z" p-id="1111"'
                this.option.toolbox.feature.mySelectedMode.icon = this.chartsSelectedMode == 'multiple' ? rect: circle
                this.initEcharts(this.seriesData)
                if(this.option.toolbox.feature.myFull.title == '关闭全屏') {
                  this.setFullCharsOptions()
                }else{
                  this.setOption()
                }
              }                        
            }, 
            brush: {
                type: ['lineX', 'clear']
            },
            dataZoom: {
              yAxisIndex: 'none'
						},            
            saveAsImage : {show: true},
            magicType : {show: true, z: 0, type: ['stack','tiled','line', 'bar']},
            restore : {show: true},
          }
				}      
    }
  },

  props: {
    isShowIndex: {
      type: Boolean,
      default: false
    },
    overflowBox: {
      type: String,
      default: 'visible'
    },
    indexKey: {
      type: Number,
      default: null
    },
    date: {
      default: ''
    },    
    isShowExport: {
      type: Boolean,
      default: true
    },
    chartBoxHeight: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "30vh"
    },
    title: {
      type: String,
      default: ""
    },
    titleAlign: {
      type: String,
      default: 'center'
    },
    comment: {
      type: String,
      default:''
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
    excelData: {
      type: Array,
      default: () => {
        return []
      }
    },   
    excelColumns: {
      type: Array,
      default: () => {
        return []
      }
    },        
    excelTitle: {
      type: String,
      default: ''
    },        
    top: {
      type: String,
      default : '7%'
    },    
    isShowLengend: {
      type: Boolean,
      default: true
    },
    isReverse: {
      type: Boolean,
      default: false
    },    
    legendRight: {
      type: Number,
      default: 10
    },
    legendWidth: {
      type: Number,
      default: 500
    },
    legendselected: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isLinkage: {
      type: Boolean,
      default: true
    },
    selectedMode: {
      default: 'multiple'
    },
    yAxisTitle: {
      type: Array,
      default: () => {
        return ["", ""]
      }
    },
    yAxisScale: {
      type: Boolean,
      default: true
    },
    xAxisType: {
      type: String,
      default: 'category'
    },
    xAxisLabel: {
      type: Object,
      default: () => {
        return {
          interval: 'auto'
        }
      }
    },
    isShowToolBox: {
      type: Boolean,
      default: false
    },

    tooltip: {
      confine: true
    },
    isShowDataZoom: {
      type: Boolean,
      default: false
    },
    dataZoomStart: {
      type: Number,
      default: 0
    },
    dataZoomEnd: {
      type: Number,
      default: 100
    },

  },


  setup(props) {
    let { columns, data } = props
    console.log(columns, data, 296)


    watch(
      () => props.columns,
      () => {
        if (props.columns) {
          console.log(props.columns, 304)
        }
      },
      {
        immediate: true,
      }
    );
    onMounted(() => {
      console.log('mounted!', columns)
      
    })
  },


  watch: {
    data(val) {
      console.log(val, 295)
      if(val.length) {
        let columns = this.columns
        let seriesData = []
        for (const item of val) {
          let list = {}
          for (const element of columns) {
            list[element.key] = item[element.key]
          }
          seriesData.push(list)
        }
        this.seriesData = !this.isReverse ? seriesData : seriesData.reverse()
        this.initData(seriesData)
      }else{
        if(this.myChart) {
          echarts.dispose(this.myChart)          
        }
      }
    },

    height(val) {
      if( this.myChart ) {
        setTimeout( () => {
          this.myChart.resize()
        }, 200)
      }
    },


    columns(val) {
      console.log(val, 324)
      if(val.length) {
        var selected = {}
        for (const item of val) {
          //存在echartsSeriesOption, 则展示到echarts图表Y轴数据
          if(item.echartsSeriesOption) {
            // 自定义不默认展示
            if(item.selected === false) {
              selected[item.echartsSeriesOption.name] = item.selected
            }
          }
        }
  
        this.selected = selected
        this.option.legend.selected = this.selected
        echarts.dispose(this.myChart)
        this.setMyEcharts();
      }else{
        echarts.dispose(this.myChart)        
      }
    },

    legendselected: {
      handler(val) {
        if(!this.isLinkage) {
          return
        }
        this.selected = val
        this.initEcharts(this.seriesData)
        this.setOption()
      },
      deep: true
    }
  },

  mounted () {
    if(this.seriesData) {
      this.initData(this.seriesData)
    }
  },

  // beforeUnmount () {
  //   if( this.myChart ) {
  //     echarts.dispose(this.myChart)
  //   }
  // },  

  activated() {
    if( this.myChart ) {
      this.myChart.resize()
    }
  },

  methods: {
    initData(val) {
      // 获取dimension数组，legendData数组
      if(this.columns.length && val.length) {
        let i = 0;
        this.dimensionsArray = []
        this.legendData = []
        this.seriesArray = []
        this.selected = {}
        for (const item of this.columns) {
          // 定义dimensionArray， 默认第一个为X轴key
          if( i == 0) {
            this.dimensionsArray.push(item.key)           
          }

          //存在echartsSeriesOption, 则展示到echarts图表Y轴数据
          if(item.echartsSeriesOption) {
            // 自定义不默认展示
            if(item.selected === false) {
              this.selected[item.echartsSeriesOption.name] = item.selected
            }else{
              this.selected[item.echartsSeriesOption.name] = true
            }
            // 定义dimensionArray
            this.dimensionsArray.push(item.key)          
            // 定义图例中文图例
            
            this.legendData.push(item.echartsSeriesOption.name)
            //定义dimensions对应的series数据样式
            
            this.seriesArray.push(item.echartsSeriesOption)
          }
          i++;
        }

        // this.$emit('update:legendselected', this.selected)
        
        this.initEcharts(val) //初始化option
        this.setMyEcharts() //渲染图表

      }
    },
    // 全屏图表初始化
    initFullCharts() {
      var opts = this.option
      let fullBox = document.getElementsByClassName('full-echarts-box')[0]
      if( fullBox.style.display == 'none' || !fullBox.style.display) {
        fullBox.style.display = 'block'                  
        let cancelIcon = 'path d="M354.133333 682.666667H256v-42.666667h170.666667v170.666667H384v-98.133334L243.2 853.333333l-29.866667-29.866666L354.133333 682.666667z m358.4 0l140.8 140.8-29.866666 29.866666-140.8-140.8V810.666667h-42.666667v-170.666667h170.666667v42.666667h-98.133334zM354.133333 384L213.333333 243.2l29.866667-29.866667L384 354.133333V256h42.666667v170.666667H256V384h98.133333z m358.4 0H810.666667v42.666667h-170.666667V256h42.666667v98.133333L823.466667 213.333333l29.866666 29.866667L712.533333 384z" fill="#444444'
        opts.toolbox.feature.myFull.icon = cancelIcon
        opts.toolbox.feature.myFull.title = '关闭全屏'
        let echartsBox = document.getElementById('full-echarts-box')
        var fullChart = echarts.init(echartsBox)
        this.fullChart = fullChart
        fullChart.on('click',  (params) => {
          let tooltipBox = fullBox.querySelector('#tooltip-box')
          tooltipBox.style.color = params.color
          tooltipBox.innerHTML = params.seriesName
          setTimeout( () => {
            tooltipBox.innerHTML = ''
          },5000)
        });
        fullChart.clear()
        this.option = opts
        this.legendSelected(true)
      }else{
        fullBox.style.display = 'none'
        let fullIcon = 'path d="M0 0h256v51.2H0z" p-id="4378"></path><path d="M51.2 0v256H0V0zM1024 0v256h-51.2V0z" fill="" p-id="4379"></path><path d="M1024 51.2h-256V0h256zM1024 1024h-256v-51.2h256z" fill="" p-id="4380"></path><path d="M972.8 1024v-256h51.2v256zM0 1024v-256h51.2v256z" fill="" p-id="4381"></path><path d="M0 972.8h256v51.2H0z'
        opts.toolbox.feature.myFull.title = '全屏查看'
        opts.toolbox.feature.myFull.icon = fullIcon
      }
    },
    setFullCharsOptions() {
      let fullChart = this.fullChart
      if(fullChart) {
        var opts = this.option
        fullChart.clear()
        fullChart.setOption(opts)
      }
    },
    initEcharts(val) {

      let option = {
        title: {
          text: this.title,
          show: false,
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#ddd"
          },
        },
        // color: ["#60acfc","#32d3eb","#5bc49f","#feb64d","#ff7c7c","#9287e7"],
        // color: ["#5B8FF9","#5AD8A6","#5D7092","#F6BD16","#E86452","#6DC8EC","#945FB9","#FF9845","#1E9493"],
        tooltip: {
          trigger: "axis", //触发类型。[ default: 'item' ] :数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用;'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
          formatter: (params) => {
            // 颜色
            let myChart = this.myChart
            let fullChart = this.fullChart
            let selected = this.isShowFull ? fullChart.getOption().legend[0].selected : myChart.getOption().legend[0].selected
            let colors = {}
            for (const val of params) {
              colors[val.seriesName] = val.color
            }
            //数据
            let value = params[0].value
            // 排序
            let columns = this.columns.map( item => {
              return {
                ...item,
                value: value[item.key] ? value[item.key] : 0
              }
            })
            function up(x,y){
              return y.value-x.value
            }
            columns.sort(up)

            let res = ''
            for (const item of columns) {
              let circle = item.echartsSeriesOption ? `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${colors[item.label]};"></span>` : ``
              if(JSON.stringify(selected) == '{}') {
                res += `${circle}${item.label}: ${item.value}<br/>`
              }else{
                if(!item.echartsSeriesOption) {
                  res += `${circle}${item.label}: ${item.value}<br/>`                
                }else{
                  if(selected[item.label]) {
                    res += `${circle}${item.label}: ${item.value}<br/>`                
                  }
                }
              }
            }
            return res;
          },
          axisPointer: {
            lineStyle: {
              color: "#57617B"
            },
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          // confine: true
          // position: (pos, params, dom, rect, size) => {
          //   console.log(params, "params")
          //   console.log(rect, "rect")
          //   console.log(size, "size")
          //   // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
          //   var obj = {top: 60};
          //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          //   console.log(obj,"obj")
          //   return obj;
          // }
        },

        toolbox: this.isShowToolBox ? this.toolbox : {},

        barMaxWidth: 30,
        legend: {
          type: "scroll",
          show: this.isShowLengend,
          selectedMode: this.chartsSelectedMode,
          inactiveColor: '#aaa',
          pageButtonPosition: 'start',
          icon: this.chartsSelectedMode == 'multiple' ? 'rect' : 'circle', //设置图例的图形形状，circle为圆，rect为矩形
          itemWidth: this.chartsSelectedMode == 'multiple' ? 12 : 8, //图例标记的图形宽度[ default: 25 ]
          itemHeight: this.chartsSelectedMode == 'multiple' ? 6 : 8, //图例标记的图形高度。[ default: 14 ]
          itemGap: 13, //图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。[ default: 10 ]
          data: this.legendData,
          right: this.legendRight,
          left: 10,
          top: 2,
          selected: this.selected,
          textStyle: {
            fontSize: 12,
            color: "#111"
          }
        },
        grid: {
          left: "5%", 
          right: "8%",
          bottom: this.isShowDataZoom ? "40" : "3%",
          // top: this.top, //grid 组件离容器下侧的距离。
          containLabel: true //grid 区域是否包含坐标轴的刻度标签[ default: false ]
        },
        dataset: {
          dimensions: this.dimensionsArray,
          // 按行的 key-value 形式（对象数组），这是个比较常见的格式。
          source: val
        },   

        dataZoom: this.isShowDataZoom ? [
          {
            "show": false,
            "height": 10,
            "xAxisIndex": [0],
            "bottom": 10,
            "start": this.dataZoomStart,
            "end": this.dataZoomEnd,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '130%',
            handleStyle:{
                color:"#d3dee5",
            },
            textStyle:{
              color:"#fff"},
              borderColor:"#90979c"
          }, 
          {
            "type": "inside",
            "show": true,
            yAxisIndex: [0],
            zoomLock: true,
            "height": 200,
            "start": 0,
            "end": 100
          },
          {
              type: 'slider',
              show: true,
              yAxisIndex: [0],
              zoomLock: true,
              left: '0%',
              start: 0,
              end: 100
          },          
        ] : [],             
        xAxis: [
          {
            type: this.xAxisType,
            // boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
            axisLine: {
              lineStyle: {
                color: this.axisColor //坐标轴线线的颜色。
              }
            },
            splitLine: {
              show: false,
              color: "#f9f9f9"
            },              
            axisTick: {
              show: false //是否显示坐标轴刻度
            },  
            axisLabel: this.xAxisLabel                      
          },
          
        ],
        yAxis: [
          {
            type: "value", //坐标轴类型。'value' 数值轴，适用于连续数据;'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据;'time' 时间轴;'log' 对数轴.
            name: this.yAxisTitle[0],
            axisTick: {
              show: false //是否显示坐标轴刻度
            },
            axisLine: {
              lineStyle: {
                color: this.yAxisColor //坐标轴线线的颜色
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 14 //文字的字体大小
              }
            },
            splitLine: {
              lineStyle: {
                color: "#f7f7f7" //分隔线颜色设置
              }
            },
            scale:this.yAxisScale,
          },

          // 百分比
          {
            type: "value",
            color: this.axisColor,
            name: this.yAxisTitle[1],
            position: "right",
            nameTextStyle: {
              color: this.axisColor
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            // y轴的颜色和宽度
            axisLine: {
              show: true,
              lineStyle: {
                color: this.axisColor,
                width: 1, //这里是坐标轴的宽度
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 14 //文字的字体大小
              }
            },
            scale:this.yAxisScale,
          },

          // 横向bar,对比图
          {
            type: "category",
            axisTick: { show: false },
            position: "left",
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: this.yAxisColor
              }
            }
          }                   
        ],
        series: this.seriesArray
      };

      this.option = option;



    },
    
    // 设置options
    setMyEcharts() {
      var dom = this.$refs.chartBox;
      this.myChart = echarts.init(dom);          
      var winChart = this.myChart
      var _this =  this
      window.addEventListener("resize", () => {
        // if( winChart ) {
        //   winChart.resize()
        // }
        if(_this.myChart) {
          _this.myChart.resize()
        }
      });      

      this.setOption();
    },

    // 设置option
    setOption(option) {
      if(!this.myChart) {
        return
      }
      this.myChart.clear()
      this.myChart.setOption(option ? option : this.option, true)
      let myChart = this.myChart
      myChart.on('click', (params) => {
        this.tooltipConfig.content = params.seriesName
        this.tooltipConfig.color = params.color
        setTimeout( () => {
          this.tooltipConfig.content = ''
        },5000)
      });   

      myChart.on('legendselectchanged', (params) => {
        if(this.isLinkage) {
          this.$emit('update:legendselected', params.selected)
        }
      });   
      
  
    },
    legendSelected(type) {
        var selected = {}
        let columns = this.columns
        for (const item of columns) {
          //存在echartsSeriesOption, 则展示到echarts图表Y轴数据
          if(item.echartsSeriesOption) {
            selected[item.echartsSeriesOption.name] = type
          }
        }
  
        this.selected = selected
        this.option.legend.selected = this.selected
        if(this.option.toolbox.feature.myFull.title == '关闭全屏') {
          this.setFullCharsOptions()
        }else{
          this.setOption();
        }
    },
    /**
     * 处理表格数据，表格头部
     * @Author   jok
     * @DateTime 2017-12-12T15:23:37+0800
     */
    tableExportToExcel(data, columnsData) {

      let list = data.length ? data : this.seriesData;
      let columns = columnsData.length ? columnsData : this.columns


      let keys = [], names = [];

      for(let i of Object.keys(columns)) {
        let key = columns[i].key;
        let name = columns[i].label;
          // keys值
          keys.push(key)
          // 中文名
          names.push(name)
      }

      this.export_to_excel(list, keys, names)
    },

    // 导出表格
    export_to_excel (list,keys,names) {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/utils/exporttoexcel/Export2Excel');
        // 处理名称keys对应的数据
        const data = list.map(v => keys.map(j => v[j]));

        //excel栏目名称，数据，表格命名
        export_json_to_excel(names, data, this.excelTitle ? this.excelTitle : this.title  + this.date);
      })
    }    
  }
};
</script>
<style lang="stylus">
.line-bar-chart-box
  margin 0
  background-color #fff
  position relative
  &:hover
    box-shadow 0 0 12px rgba(81,130,228,.2)
  .title-box
    height 40px
    line-height 40px
    color #3a3a3a
    font-size 16px
    font-weight 600
    padding 0 12px
    border-bottom 1px solid #eee
    box-sizing border-box
    .index-box
      display inline
      padding 0 12px
      color #333
      background #eee
      border-radius 4px
      margin-right 8px
      font-size 14px
.line-bar-chart-box
  .chart
    margin 0 auto
</style>

<style lang="stylus" scoped>
#tooltip-box
  position absolute
  right 0px
  bottom 0px
  z-index 9
  background #fff
  padding 4px 8px
  border-radius 2px
  font-size 12px
</style>
