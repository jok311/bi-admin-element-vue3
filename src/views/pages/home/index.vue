<template>
  <div class="home-page">
    <!-- home-page
    <HelloWorld /> -->
    home
    <ul id="items">
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </ul>    
  </div>
</template>
<script>
// import HelloWorld from '/src/components/HelloWorld.vue'
import Sortable from "sortablejs";
export default {
  // components: { HelloWorld }
  setup() {
    console.log(1119999)
  },
  mounted() {
    console.log(111)
    var el = document.getElementById("items");
    var sortable = Sortable.create(el);
  }
}
</script>