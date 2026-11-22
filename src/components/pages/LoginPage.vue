<script setup>
    import { reactive, ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { getAuthentication, getEventStatistics, getVisitInfo, login, signInWithGoogle } from '@/js/api.js'
    import { getErrorMessage } from '@/js/errorMessages.js'
    import { currentPage, eventStatistics, isAuthenticated, isVisitPresent, registration, userProfile, visitInfo } from '@/js/state.js'
    import { toast } from '@/js/toast.js'

    const { t, te } = useI18n()

    const credentials = reactive({
        email: '',
        password: ''
    })
    const isSubmitting = ref(false)
    const errorMessage = ref('')

    function loginError(error, sessionCreated) {
        if (sessionCreated) {
            return t('errors.ACCOUNT_DETAILS_UNAVAILABLE')
        }

        const status = error?.response?.status
        const fallbackCode = status === 400 || status === 401
            ? 'INVALID_CREDENTIALS'
            : 'LOGIN_FAILED'

        return getErrorMessage(error, t, te, fallbackCode)
    }

    async function handleLogin() {
        if (isSubmitting.value) {
            return
        }

        isSubmitting.value = true
        errorMessage.value = ''
        let sessionCreated = false

        try {
            const loginResponse = await login({
                email: credentials.email.trim(),
                password: credentials.password
            })
            sessionCreated = true

            const [authenticationResponse, visitResponse, statisticsResponse] = await Promise.all([
                getAuthentication(),
                getVisitInfo('Juleaften'),
                getEventStatistics('Juleaften')
            ])
            const profile = authenticationResponse.payload?.userProfile
            const visit = visitResponse.payload
            if (!profile || !visit) {
                throw new Error('Account details were missing from the response.')
            }

            userProfile.value = profile
            eventStatistics.value = statisticsResponse.payload
            visitInfo.value = visit
            registration.firstName = profile.firstName
            registration.lastName = profile.lastName
            registration.email = profile.email
            isAuthenticated.value = true
            currentPage.value = isVisitPresent.value ? 'registration' : 'overview'
            credentials.password = ''
            toast.success(loginResponse.message || 'You have been signed in.')
        } catch (error) {
            errorMessage.value = loginError(error, sessionCreated)
        } finally {
            isSubmitting.value = false
        }
    }

</script>

<template>
    <section class="login-page" aria-labelledby="login-title">
        <div class="login-card">
            <div class="login-mark" aria-hidden="true">
                <i class="fa-solid fa-fire"></i>
            </div>
            <p class="login-eyebrow">{{ $t('event.info.shortName') }}</p>
            <h1 id="login-title">{{ $t('login.greetingBack') }}</h1>
            <p class="login-description">
                {{$t('login.signInCall')}}
            </p>
            <form class="login-form" @submit.prevent="handleLogin">
                <div class="form-field">
                    <label for="login-email">{{$t('login.data.email')}}</label>
                    <input
                        id="login-email"
                        v-model="credentials.email"
                        type="email"
                        name="email"
                        autocomplete="username"
                        placeholder="you@example.com"
                        required
                    >
                </div>
                <div class="form-field">
                    <label for="login-password">{{$t('login.data.password')}}</label>
                    <input
                        id="login-password"
                        v-model="credentials.password"
                        type="password"
                        name="password"
                        autocomplete="current-password"
                        minlength="8"
                        required
                        placeholder="················"
                        
                    >
                </div>
                <p v-if="errorMessage" class="login-error" role="alert">{{ errorMessage }}</p>
                <button class="email-login-button" type="submit" :disabled="isSubmitting">
                    {{ isSubmitting ? $t('login.signingIn') : $t('login.signInButton') }}
                </button>
            </form>
            <div class="login-divider" aria-hidden="true"><span>{{$t('login.orTab')}}</span></div>
            <button class="google-button" type="button" @click="signInWithGoogle">
                <img src="@/assets/google-icon.svg" alt="" width="22" height="22">
                <span>{{$t('registrationForm.googleSignIn')}}</span>
            </button>
            <button class="back-button" type="button" @click="currentPage = 'overview'">
                {{$t('login.backToOverview')}}
            </button>
        </div>
    </section>
</template>

<style scoped>
    .login-page {
        box-sizing: border-box;
        display: grid;
        min-height: min(70vh, 42rem);
        padding: 2rem 1rem;
        place-items: center;
    }

    .login-card {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: min(100%, 28rem);
        padding: clamp(1.5rem, 5vw, 3rem);
        border: 1px solid #f0dfc0;
        border-radius: 1.25rem;
        background: linear-gradient(145deg, #fffdfa, #fff6e5);
        box-shadow: 0 12px 30px rgba(48, 37, 25, 0.12);
        text-align: center;
    }

    .login-mark {
        display: grid;
        width: 3.5rem;
        height: 3.5rem;
        margin-bottom: 1rem;
        place-items: center;
        border-radius: 50%;
        background: #fbe9e5;
        color: #a52a2a;
        font-size: 1.5rem;
    }

    .login-eyebrow {
        margin: 0 0 0.5rem;
        color: #a52a2a;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    h1 {
        margin: 0;
        color: var(--dark-primary-color, #34513a);
        font-family: 'Literata', serif;
        font-size: clamp(1.8rem, 5vw, 2.4rem);
    }

    .login-description {
        max-width: 24rem;
        margin: 0.75rem 0 1.5rem;
        color: #625e56;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        text-align: left;
    }

    .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .form-field label {
        color: var(--dark-primary-color, #34513a);
        font-family: 'Montserrat', sans-serif;
        font-size: 0.82rem;
        font-weight: 600;
    }

    .form-field input {
        box-sizing: border-box;
        width: 100%;
        min-height: 3rem;
        padding: 0.75rem 0.85rem;
        border: 1px solid #ded5c9;
        border-radius: 0.65rem;
        background: #ffffff;
        color: #333333;
        font: 0.95rem 'Montserrat', sans-serif;
    }

    .form-field input:focus-visible {
        outline: 2px solid var(--primary-color, #b81515);
        outline-offset: 2px;
    }

    .login-error {
        margin: 0;
        color: #a52a2a;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.85rem;
        line-height: 1.45;
    }

    .email-login-button {
        width: 100%;
        min-height: 3.1rem;
        padding: 0.75rem 1rem;
        border: 0;
        border-radius: 0.75rem;
        background: linear-gradient(110deg, #a52a2a, #c94335);
        color: #ffffff;
        font: 700 0.95rem 'Montserrat', sans-serif;
        cursor: pointer;
    }

    .email-login-button:hover:not(:disabled) {
        filter: brightness(1.06);
    }

    .email-login-button:focus-visible {
        outline: 2px solid #a52a2a;
        outline-offset: 3px;
    }

    .email-login-button:disabled {
        cursor: wait;
        opacity: 0.7;
    }

    .login-divider {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        margin: 1.25rem 0;
        color: #82786e;
        font: 600 0.75rem 'Montserrat', sans-serif;
    }

    .login-divider::before,
    .login-divider::after {
        height: 1px;
        flex: 1;
        background: #e6ddd1;
        content: "";
    }

    .google-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        width: 100%;
        min-height: 3.25rem;
        padding: 0.75rem 1rem;
        border: 1px solid #d9d4cd;
        border-radius: 0.75rem;
        background: #ffffff;
        color: #333333;
        font: 600 0.95rem 'Montserrat', sans-serif;
        cursor: pointer;
        transition: background-color 160ms ease, box-shadow 160ms ease;
    }

    .google-button:hover {
        background: #f8f7f5;
        box-shadow: 0 4px 12px rgba(48, 37, 25, 0.1);
    }

    .google-button:focus-visible,
    .back-button:focus-visible {
        outline: 2px solid var(--primary-color, #b81515);
        outline-offset: 3px;
    }

    .back-button {
        margin-top: 1rem;
        padding: 0.5rem;
        border: 0;
        background: transparent;
        color: #8b292d;
        font: 600 0.85rem 'Montserrat', sans-serif;
        cursor: pointer;
    }

    .back-button:hover {
        text-decoration: underline;
    }

    @media (prefers-reduced-motion: reduce) {
        .google-button {
            transition: none;
        }
    }
</style>
