<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg v-else :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { computed } from 'vue'
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const isExternal = computed(() => external(props.iconClass) ) 
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : `svg-icon` )
    const styleExternalIcon = computed(() => {
      return {
        mask: `url(${props.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
      }
    })
    function external(path) {
      return /^(https?:|mailto:|tel:)/.test(path)
    }

    return {
      isExternal,
      iconName,
      svgClass,
      styleExternalIcon
    }
  },
  // computed: {
  //   isExternal() {
  //     return isExternal(this.iconClass)
  //   },
  //   iconName() {
  //     return `#icon-${this.iconClass}`
  //   },
  //   svgClass() {
  //     if (this.className) {
  //       return 'svg-icon ' + this.className
  //     } else {
  //       return 'svg-icon'
  //     }
  //   },
  //   styleExternalIcon() {
  //     return {
  //       mask: `url(${this.iconClass}) no-repeat 50% 50%`,
  //       '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
  //     }
  //   }
  // }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
