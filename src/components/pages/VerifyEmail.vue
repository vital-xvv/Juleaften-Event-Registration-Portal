<script setup>
    import { ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { verifyEmail } from '@/js/api.js'
    import { getErrorMessage } from '@/js/errorMessages.js'
    import { startLoading, stopLoading } from '@/js/loading'

    const { t, te } = useI18n()
    const verificationToken = ref(new URLSearchParams(window.location.search).get('token') || '')
    const status = ref(verificationToken.value ? 'ready' : 'invalid')
    const message = ref('');

    if (verificationToken.value) {
        const url = new URL(window.location.href)
        url.searchParams.delete('token')
        window.history.replaceState({}, document.title, `${url.pathname}${url.search}${url.hash}`)
    }

    async function onVerifyEmail() {
        if (!verificationToken.value || status.value === 'success') {
            return
        }

        startLoading("Verifying your profile...")
        status.value = 'verifying'
        message.value = ''

        try {
            const response = await verifyEmail(verificationToken.value)
            status.value = 'success'
            message.value = response?.message || 'Your email address has been verified.'
            window.location.assign('/')
        } catch (error) {
            status.value = 'error'
            message.value = getErrorMessage(error, t, te, 'EMAIL_VERIFICATION_INVALID_OR_EXPIRED')
        } finally {
            stopLoading();
        }
    }
</script>

<template>
    <main class="verify-page">
        <section class="verify-card" aria-labelledby="verify-title">
            <h1 id="verify-title">Email verification</h1>

            <p v-if="status === 'ready'">
                Click below to verify your email address.
            </p>
            <p v-else-if="status === 'verifying'" role="status">
                Verifying your email...
            </p>
            <p v-else-if="status === 'success'" role="status">
                {{ message }}
            </p>
            <p v-else-if="status === 'error'" role="alert">
                {{ message }}
            </p>
            <p v-else role="alert">
                {{ $t('errors.EMAIL_VERIFICATION_TOKEN_MISSING') }}
            </p>

            <button
                v-if="status === 'ready' || status === 'error'"
                class="verify-button"
                type="button"
                @click="onVerifyEmail"
            >
                {{ status === 'error' ? 'Try again' : 'Verify email' }}
            </button>
        </section>
    </main>
</template>

<style scoped>
    .verify-page {
        display: grid;
        min-height: 100vh;
        padding: 2rem 1rem;
        justify-items: center;
        align-items: start;
    }

    .verify-card {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        width: min(32rem, 100%);
        padding: 2rem;
        border-radius: 0.75rem;
        background-color: var(--darker-neutral-color);
        box-shadow: 0 8px 24px rgb(7 41 12 / 12%);
        text-align: center;
    }

    .verify-card p {
        color: var(--dark-primary-color);
        font-family: 'Montserrat', sans-serif;
        line-height: 1.5;
    }

    .verify-button {
        padding: 0.75rem 1.25rem;
        border-radius: 0.5rem;
        background-color: var(--primary-color);
        color: white;
        cursor: pointer;
        font: 600 1rem 'Montserrat', sans-serif;
    }

    .verify-button:hover {
        background-color: var(--dark-primary-color);
    }
</style>
