<script setup>
    import Header from '@/components/layouts/Header.vue'
    import Footer from '@/components/layouts/Footer.vue'
    import Page from '@/components/pages/Page.vue'
    import ToastContainer from '@/components/notification/ToastContainer.vue'
    import VerifyEmail from '@/components/pages/VerifyEmail.vue'
    import LoadingOverlay from '../notification/LoadingOverlay.vue'


    const isVerifyEmailPage = window.location.pathname.replace(/\/+$/, '') === '/verify-email'

</script>

<template>
    <div class="layout-background">
        <LoadingOverlay/>
        <VerifyEmail v-if="isVerifyEmailPage"/>
        <div v-else>
            <Header />
            <ToastContainer />
            <Page />
            <Footer />
        </div>
    </div>
</template>

<style scoped>

.layout-background {
    background-image: url("@/assets/Minimalist Christmas Tree Pattern.png");
    background-repeat: repeat;
    background-size: 600px auto;
}
</style>