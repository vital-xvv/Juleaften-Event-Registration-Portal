<script setup>
    import AuthenticatedWelcome from '@/components/AuthenticatedWelcome.vue'
    import { userProfile, visitInfo } from '@/js/state.js'
</script>

<template>
    <div class="welcome-page">
        <AuthenticatedWelcome :user="userProfile" :visit-info="visitInfo" />
    </div>
</template>

<style scoped>
    .welcome-page {
        box-sizing: border-box;
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
        padding: 1rem;
    }

    @media (max-width: 450px) {
        .welcome-page {
            padding: 0.5rem;
        }
    }
</style>
