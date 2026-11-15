<script setup>
    import Main from '@/components/pages/Main.vue'

    import {ref} from 'vue'

    const currPage = ref(1)
    
</script>

<template>
    <Main v-if="currPage == 1"/>
</template>

<style scoped>
</style>