<template>
<div id="app">
    <!-- <router-link to="/">Home</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/login">login</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/dash/template">/dash/template</router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <router-link to="/dash/box">/dash/box</router-link> -->
    <router-view />
</div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style lang="stylus" scoped>
#app
  background-color #f6f8f9 
	height 100vh 
	width 100vw
</style>
