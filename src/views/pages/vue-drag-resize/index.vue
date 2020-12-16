<template>
  <div id="app">
    <div>
      <vue-resize-sensor @resize="onResize">
        <div style="background: #eee;margin-bottom: 4px;height: 72px;">
          resize
        </div>
        <div style="background: #eee;margin-bottom: 4px;height: 72px;">
          resize
        </div>
        <div style="background: #eee;margin-bottom: 4px;height: 72px;">
          resize
        </div>
        <div style="background: #eee;margin-bottom: 4px;height: 72px;">
          resize
        </div>
        <div style="background: #eee;margin-bottom: 4px;height: 72px;">
          resize
        </div>
        <div style="background: #eee;margin-bottom: 4px;height: 72px;">
          resize
        </div>
        <div style="background: #eee;margin-bottom: 4px;height: 72px;">
          resize
        </div>
        <div style="background: #eee;margin-bottom: 4px;height: 72px;">
          resize
        </div>
      </vue-resize-sensor>
    </div>
  </div>
</template>

<script>
    import VueResizeSensor from '@seregpie/vue-resize-sensor';


    export default {
        name: 'App',

        components: {
                VueResizeSensor,

        },

        data() {
            return {
                width: 0,
                height: 0,
                top: 0,
                left: 0
            }
        },

        methods: {
            onResize(newRect) {
                this.width = newRect.width;
                this.height = newRect.height;
                this.top = newRect.top;
                this.left = newRect.left;
            }
        }
    }
</script>