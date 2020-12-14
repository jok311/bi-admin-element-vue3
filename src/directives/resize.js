import { createApp } from 'vue'
const app = createApp({})
// 注册
const resize = app.directive('resize', {
  // Directive has a set of lifecycle hooks:
  // called before bound element's parent component is mounted
  // beforeMount() {},
  // // called when bound element's parent component is mounted
  mounted(el, binding, vnode) {
    el.draggable = false;
    el.onmousedown = function (e) {
        el.parentNode.draggable = false
        //鼠标按下，计算当前元素距离可视区的距离
        let disY = e.clientY;
        let h = parseInt(window.getComputedStyle(el.parentNode).height);
        document.onmousemove = function (e) {
            //通过事件委托，计算移动的距离
            let t = disY - e.clientY;
            el.parentNode.style.height = ((h+t)<5?5:(h+t)) + 'px';//最小宽度，默认5
            //回调函数
            binding.value(h+t)
        };
        document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
  },
  // called before the containing component's VNode is updated
  // beforeUpdate() {},
  // // called after the containing component's VNode and the VNodes of its children // have updated
  // updated() {},
  // // called before the bound element's parent component is unmounted
  // beforeUnmount() {},
  // // called when the bound element's parent component is unmounted
  // unmounted() {}
})

// console.log(resize)

export default resize


// export default {
//   // Directive has a set of lifecycle hooks:
//   // called before bound element's parent component is mounted
//   // beforeMount() {},
//   // // called when bound element's parent component is mounted
//   mounted(el, binding, vnode) {
//     const ctx = vnode.context
//     console.log(ctx, el, binding, vnode)
//   },
//   // called before the containing component's VNode is updated
//   // beforeUpdate() {},
//   // // called after the containing component's VNode and the VNodes of its children // have updated
//   // updated() {},
//   // // called before the bound element's parent component is unmounted
//   // beforeUnmount() {},
//   // // called when the bound element's parent component is unmounted
//   // unmounted() {}
// }

// import type { ObjectDirective } from 'vue'

// const Mousewheel: ObjectDirective = {
//   beforeMount(el, binding) {
//     mousewheel(el, binding.value)
//   },
// }

// export default Mousewheel
