<template>
<div class="app-main-box">
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" />
        </keep-alive>
    </router-view>
</div>
</template>

<script>
export default {
    name: 'AppMain',
}
</script>

<style lang="stylus">
.app-main-box
    height 100vh
    flex 1
    overflow-y scroll
</style>
