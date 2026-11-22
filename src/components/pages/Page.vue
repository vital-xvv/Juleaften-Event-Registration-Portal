<script setup>
    import Main from '@/components/pages/Main.vue'
    import WelcomePage from '@/components/pages/WelcomePage.vue'
    import LoginPage from '@/components/pages/LoginPage.vue'
    import { computed } from 'vue'
    import { currentPage, isVisitPresent } from '@/js/state.js'

    const showLoginPage = computed(() => currentPage.value === 'login')
    const showRegistrationPage = computed(() =>
        !showLoginPage.value &&
        currentPage.value === 'registration' &&
        isVisitPresent.value
    )
</script>

<template>
    <main
        v-show="showLoginPage"
        id="login-panel"
        class="page-panel"
        aria-labelledby="login-title"
        tabindex="-1"
    >
        <LoginPage />
    </main>
    <main
        v-show="showRegistrationPage"
        id="registration-panel"
        class="page-panel"
        aria-labelledby="registration-tab"
        tabindex="-1"
    >
        <WelcomePage />
    </main>
    <main
        v-show="!showLoginPage && !showRegistrationPage"
        id="overview-panel"
        class="page-panel"
        aria-labelledby="overview-tab"
        tabindex="-1"
    >
        <Main />
    </main>
</template>

<style scoped>
    .page-panel {
        min-width: 0;
    }
</style>