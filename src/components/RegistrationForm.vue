<script setup>
    import PresentationCard from './cards/PresentationCard.vue'
    import CountBar from "./interactive/CountBar.vue"
    import WaitlistCard from "./cards/WaitlistCard.vue"
    import RegistrationHeaderCounter from "@/components/RegistrationHeaderCounter.vue"
    import {registerUser as submitRegistration, getVisitInfo, signInWithGoogle, getEventStatistics, getAuthentication} from "@/js/api.js"
    import {toast} from "@/js/toast.js"
    import {onMounted, ref} from 'vue'
    import {isAuthenticated, userProfile, clearVisitInfo, visitInfo, registration, clearFormData, eventStatistics, isVisitPresent, clearEventStatistics, currentPage } from '@/js/state.js'
    import { startLoading, stopLoading } from '@/js/loading.js'
    import { useI18n } from 'vue-i18n'
    import { getErrorMessage } from '@/js/errorMessages.js'
    import { supportEmail, supportEmailHref } from '@/js/supportContact.js'

    const { t, te } = useI18n()

    function applyUserInfo(apiResponse) {
        userProfile.value = apiResponse.payload.userProfile;
    
        console.log(userProfile.value)

        registration.firstName = userProfile.value.firstName;
        registration.lastName = userProfile.value.lastName;
        registration.email = userProfile.value.email;

        isAuthenticated.value = true;
    }

    onMounted(async () => {
        startLoading(t('registrationForm.loading.user'));
        
        try {
            const apiResponse = await getAuthentication("Juleaften");
            applyUserInfo(apiResponse);
        } catch (error) {
            isAuthenticated.value = false;
            userProfile.value = {};

            clearVisitInfo();
            clearFormData();
        } finally {
            stopLoading();
        }

        await fetchRegistration();
        
        await fetchEventStatistics();
    });

    async function onSubmitRegistration(event) {
        startLoading(t('registrationForm.loading.submit'))
        event.preventDefault();
        try {
            const apiResponse = await submitRegistration(registration);
            clearFormData();
            toast.success(apiResponse.message);
        } catch(error) {
            toast.error(getErrorMessage(error, t, te, 'REGISTRATION_FAILED'))
        } finally {
            stopLoading();
        }
    }

    function onGoogleSignIn(event) {
        startLoading(t('registrationForm.loading.google'))
        event.preventDefault();
        signInWithGoogle();
        stopLoading();
    }

    async function fetchEventStatistics() {
        startLoading(t('registrationForm.loading.eventInformation'))
        try {
            const apiResponse = await getEventStatistics("Juleaften"); 
            eventStatistics.value = apiResponse.payload;
        } catch (error) {
            clearEventStatistics();
            toast.error(getErrorMessage(error, t, te, 'EVENT_INFORMATION_FAILED'))
        } finally {
            stopLoading()
        } 
    }

    async function fetchRegistration() {
        startLoading(t('registrationForm.loading.registrationInformation'))
        try {
            const apiResponse = await getVisitInfo("Juleaften"); 
            visitInfo.value = apiResponse.payload;
        } catch (error) {
            clearVisitInfo();
        } finally {
            stopLoading()
        } 
    }
</script>


<template>
    <div class="registration-container" :class="{ 'registration-container--registered': isVisitPresent }">
        <PresentationCard/>
        <section class="registration-panel" v-if="!isVisitPresent">
            <RegistrationHeaderCounter/>
            
            <h1 class="reserve-spots-tag">{{ $t('registrationForm.title') }}</h1>
            <p class="text">{{ $t('registrationForm.description') }}</p>
            
            <CountBar/>
            
            <WaitlistCard :canJoinWaitlist="eventStatistics.isFull"/>
            
            <button v-show="!isAuthenticated" class="button google" @click="e => onGoogleSignIn(e)"><img class="svg" src="@/assets/google-icon.svg" alt="Google" width="24" height="24"/>{{ $t('registrationForm.googleSignIn') }}</button>
            
            <form v-show="!isVisitPresent" class="form" @submit="e => onSubmitRegistration(e)">
                <div class="form-divider" aria-hidden="true">{{ $t('registrationForm.manualDivider') }}</div>
                
                <div class="form-field">
                    <div class="input-title">
                        <label class="input-label" for="firstName">{{ $t('registrationForm.data.firstName') }}</label>
                        <span class="input-note">{{ $t('registrationForm.data.firstNameNote') }}</span>
                    </div>
                    <input class="input" type="text" :disabled="isAuthenticated" id="firstName" v-model="registration.firstName" :placeholder="$t('registrationForm.data.firstNamePlaceholder')" required />
                </div>
                <div class="form-field">
                    <div class="input-title">
                        <label class="input-label" for="lastName">{{ $t('registrationForm.data.lastName') }}</label>
                        <span class="input-note">{{ $t('registrationForm.data.lastNameNote') }}</span>
                    </div>
                    <input class="input" type="text" id="lastName" :disabled="isAuthenticated" v-model="registration.lastName" :placeholder="$t('registrationForm.data.lastNamePlaceholder')" required />
                </div>
                <div class="form-field">
                    <div class="input-title">
                        <label class="input-label" for="email">{{ $t('registrationForm.data.email') }}</label>
                        <span class="input-note">{{ $t('registrationForm.data.emailNote') }}</span>
                    </div>
                    <input class="input" type="email" id="email" :disabled="isAuthenticated" v-model="registration.email" :placeholder="$t('registrationForm.data.emailPlaceholder')" required />
                </div>
                
                <div class="form-field">
                    <div class="input-title">
                        <label class="input-label" for="companionship">{{ $t('registrationForm.data.company') }}</label>
                        <span class="input-note">{{ $t('registrationForm.data.companyNote') }}</span>
                    </div>
                    <select class="input" id="companionship" v-model="registration.companionship">
                        <option value="FAMILY">{{ $t('registrationForm.data.companionshipOptions.family') }}</option>
                        <option value="SINGLE">{{ $t('registrationForm.data.companionshipOptions.single') }}</option>
                        <option value="FRIENDS">{{ $t('registrationForm.data.companionshipOptions.friends') }}</option>
                        <option value="COUPLE">{{ $t('registrationForm.data.companionshipOptions.couple') }}</option>
                        <option value="MIXED">{{ $t('registrationForm.data.companionshipOptions.mixed') }}</option>
                    </select>
                </div>
                <div class="form-field" v-if="['FAMILY', 'FRIENDS', 'MIXED'].includes(registration.companionship)">
                    <div class="input-title">
                        <label class="input-label" for="companionCount">{{ $t('registrationForm.data.companionCount') }}</label>
                        <span class="input-note">{{ $t('registrationForm.data.companionCountNote') }}</span>
                    </div>
                    <input class="input" type="number" id="companionCount" v-model.number="registration.companionCount" name="companionCount" min="1" />
                </div>
                <div class="form-field">
                    <div class="input-title">
                        <label class="input-label" for="note">{{ $t('registrationForm.data.note') }}</label>
                        <span class="input-note">{{ $t('registrationForm.data.noteOptional') }}</span>
                    </div>
                    <textarea class="textarea" id="note" v-model="registration.note" maxlength="250" :placeholder="$t('registrationForm.data.notePlaceholder')"></textarea>
                </div>
                
                <button class="register-button" type="submit">{{ eventStatistics.isFull ? $t('registrationForm.joinWaitlist') : $t('registrationForm.register')}}</button>
                <span class="signature f05 help" v-if="supportEmail">{{ $t('registrationForm.helpPrefix') }} <a class="mail-help" :href="supportEmailHref">{{ supportEmail }}</a></span>
            </form>
            
        </section>
    </div>
</template>




<style scoped>

    .registration-panel {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 1rem;
        padding: 2rem;
        min-width: 0;
        background-color: var(--neutral-color);
    }

    h1, h2 {
        color: var(--dark-primary-color);
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 1rem;
        min-width: 0;
    }

    .help {
        text-align: center;
        margin-top: auto;
    }

    .mail-help {
        color: var(--secondary-red);
    }

    .registration-container {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: stretch;
        place-content: center;
        grid-template-rows: auto;
        position: relative;
        width: 100%;
        min-width: 0;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.10),
                0 2px 6px -4px rgba(0, 0, 0, 0.06);
    }

    .registration-container--registered {
        grid-template-columns: minmax(0, 1fr);
    }

    .registration-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
        border-radius: 12px 12px 0 0;
        pointer-events: none;
        background: linear-gradient(
            to right,
            var(--chr-primary, var(--primary-color)),
            red 50%,
            var(--chr-primary, var(--primary-color))
        );
    }

    @media (max-width: 450px) {
        .registration-container {
            grid-template-columns: minmax(0, 1fr);
        }

        .registration-panel {
            padding: 1rem;
        }

        .input, .textarea {
            box-sizing: border-box;
            width: 100%;
            min-width: 0;
        }

        .reserve-spots-tag {
            font-size: 1.5rem;
        }
    }

    .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .input-field {
        display: flex;
        flex-direction: column;
    }

    .input-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .input-label {
        font-family: 'Montserrat', sans-serif;
        color: var(--dark-primary-color);
        font-weight: 500;
        font-size: 0.75rem;
        text-transform: capitalize;
    }

    .input-note {
        font-family: 'Literata', serif;
        color: var(--dark-primary-color);
        font-weight: 300;
        font-size: 0.6rem;
        text-transform: capitalize;
    }

    .input, .textarea {
        font-family: 'Montserrat', sans-serif;
        background-color: white;
        color: var(--dark-primary-color);
        border-radius: 8px;
        font-size: 1rem;
        padding: 0.75rem;
        border: none;
        box-shadow: 2px 2px 3px rgba(30, 63, 32, 0.08);
    }

    .input:disabled, .textarea:disabled {
        color: #999;
        cursor: not-allowed;
    }

    .textarea {
        resize: none;
        min-height: 125px;
    }

    .form-divider {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #777;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .form-divider::before,
    .form-divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: #ddd;
    }

    label {
        font-weight: bold;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    textarea {
        min-height: 5rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }

    button {
        justify-content: center;
        gap: 2rem;
        height: 2.5rem;
    }

    .register-button {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        min-height: 3.25rem;
        padding: 0.8rem 1.25rem;
        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: 10px;
        background: linear-gradient(110deg, #a52a2a, #d44c35 45%, #a52a2a);
        color: #fff;
        font: 700 0.95rem 'Montserrat', sans-serif;
        letter-spacing: 0.02em;
        cursor: pointer;
        box-shadow: 0 5px 12px rgba(165, 42, 42, 0.25);
        transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
    }

    .register-button::before {
        content: '';
        position: absolute;
        z-index: -1;
        inset: -60% -30%;
        background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.8) 48%, #ffe56b 52%, #ff8bd1 57%, #8deaff 62%, transparent 70%);
        transform: translateX(-100%) rotate(8deg);
        transition: transform 650ms ease;
    }

    .register-button:hover::before,
    .register-button:focus-visible::before {
        transform: translateX(100%) rotate(8deg);
    }

    .register-button:hover {
        transform: translateY(-2px);
        filter: brightness(1.08);
        box-shadow: 0 8px 20px rgba(165, 42, 42, 0.35), 0 0 14px rgba(255, 151, 196, 0.35);
    }

    .register-button:focus-visible {
        outline: 3px solid #f4a261;
        outline-offset: 3px;
    }

    .register-button:active {
        transform: translateY(1px) scale(0.985);
        filter: brightness(0.95);
        box-shadow: 0 2px 6px rgba(165, 42, 42, 0.28);
    }

    @media (prefers-reduced-motion: reduce) {
        .register-button,
        .register-button::before {
            transition: none;
        }
    }

    @media (max-width: 450px) {

    }

    p {
        white-space: normal;
        overflow-wrap: wrap;
    }

    span, strong {
        background-color: inherit;
    }
</style>