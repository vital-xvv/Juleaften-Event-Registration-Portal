<script setup>
    import { computed, ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { logout as endSession } from '@/js/api.js'
    import { getErrorMessage } from '@/js/errorMessages.js'
    import { toast } from '@/js/toast.js'
    import { clearFormData, clearVisitInfo, currentPage, isAuthenticated, userProfile } from '@/js/state.js'

    const isLoggingOut = ref(false)
    const { t, te } = useI18n()

    const displayName = computed(() => {
        const name = [userProfile.value?.firstName, userProfile.value?.lastName]
            .filter(value => typeof value === 'string' && value.trim())
            .join(' ')

        return name || 'Guest'
    })

    const initials = computed(() =>
        displayName.value
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part.charAt(0).toUpperCase())
            .join('')
    )

    function showLoginPage() {
        currentPage.value = 'login'
    }

    function clearCookies() {
        const cookieNames = document.cookie
            .split(';')
            .map(cookie => cookie.trim().split('=')[0])
            .filter(Boolean)
        const pathParts = window.location.pathname.split('/').filter(Boolean)
        const paths = new Set(['/'])
        let path = ''

        for (const part of pathParts) {
            path += `/${part}`
            paths.add(path)
        }

        const hostParts = window.location.hostname.split('.')
        const domains = [undefined]
        for (let index = 0; index < hostParts.length - 1; index += 1) {
            domains.push(`.${hostParts.slice(index).join('.')}`)
        }

        for (const name of cookieNames) {
            for (const cookiePath of paths) {
                for (const domain of domains) {
                    document.cookie = `${name}=; Max-Age=0; path=${cookiePath}${domain ? `; domain=${domain}` : ''}`
                }
            }
        }
    }

    async function handleLogout() {
        if (isLoggingOut.value) {
            return
        }

        isLoggingOut.value = true
        try {
            await endSession()
            isAuthenticated.value = false
            userProfile.value = {}
            await clearVisitInfo()
            await clearFormData()
            currentPage.value = 'overview'
            toast.success('You have been logged out.')
        } catch (error) {
            toast.error(getErrorMessage(error, t, te, 'LOGOUT_FAILED'))
        } finally {
            clearCookies()
            isLoggingOut.value = false
        }
    }
</script>

<template>
    <button
        v-if="!isAuthenticated"
        class="account-capsule login-capsule"
        type="button"
        aria-label="Log in"
        @click="showLoginPage"
    >
        <span class="avatar-mark" aria-hidden="true"><i class="fa-solid fa-user"></i></span>
        <span class="account-copy">
            <strong class="account-name">Log in</strong>
            <span class="account-role">Your account</span>
        </span>
    </button>
    <div v-else class="account-capsule profile-capsule">
        <span class="avatar-mark" aria-hidden="true">{{ initials }}</span>
        <span class="account-copy">
            <strong class="account-name">{{ displayName }}</strong>
            <span class="account-role">Guest</span>
        </span>
        <button
            class="logout-button"
            type="button"
            :disabled="isLoggingOut"
            @click="handleLogout"
        >
            <i class="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>
            <span>{{ isLoggingOut ? 'Logging out' : 'Log out' }}</span>
        </button>
    </div>
</template>

<style scoped>
    .account-capsule {
        box-sizing: border-box;
        display: inline-flex;
        grid-column: 3;
        justify-self: end;
        align-items: center;
        gap: 0.6rem;
        max-width: 100%;
        min-width: 0;
        padding: 0.35rem 0.55rem 0.35rem 0.4rem;
        border: 1px solid #eadfd1;
        border-radius: 999px;
        background: #fffdfa;
        color: var(--dark-primary-color, #34513a);
        box-shadow: 0 3px 10px rgba(48, 37, 25, 0.08);
    }

    .login-capsule {
        font: inherit;
        text-align: left;
        cursor: pointer;
        transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
    }

    .login-capsule:hover {
        transform: translateY(-1px);
        border-color: #d7b99b;
        box-shadow: 0 5px 14px rgba(48, 37, 25, 0.12);
    }

    .login-capsule:focus-visible,
    .logout-button:focus-visible {
        outline: 2px solid var(--primary-color, #b81515);
        outline-offset: 2px;
    }

    .avatar-mark {
        display: grid;
        flex: 0 0 2.4rem;
        width: 2.4rem;
        height: 2.4rem;
        place-items: center;
        border: 1px solid #e8c986;
        border-radius: 50%;
        background: linear-gradient(145deg, #fff5df, #f8e6d9);
        color: #8b292d;
        font-size: 0.85rem;
        font-weight: 700;
    }

    .account-copy {
        display: flex;
        flex-direction: column;
        min-width: 0;
        line-height: 1.25;
    }

    .account-name {
        overflow: hidden;
        max-width: clamp(4rem, 16vw, 9rem);
        color: var(--dark-primary-color, #34513a);
        font-size: 0.82rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .account-role {
        color: #756b61;
        font-size: 0.68rem;
    }

    .logout-button {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        gap: 0.35rem;
        padding: 0.5rem 0.65rem;
        border: 0;
        border-radius: 999px;
        background: #f8e9e7;
        color: #8b292d;
        font: inherit;
        font-size: 0.75rem;
        font-weight: 700;
        cursor: pointer;
    }

    .logout-button:hover:not(:disabled) {
        background: #f2d8d5;
    }

    .logout-button:disabled {
        cursor: wait;
        opacity: 0.7;
    }

    @media (max-width: 600px) {
        .account-capsule {
            gap: 0.4rem;
            padding: 0.25rem 0.4rem 0.25rem 0.3rem;
        }

        .avatar-mark {
            flex-basis: 2rem;
            width: 2rem;
            height: 2rem;
        }

        .account-role {
            display: none;
        }

        .account-name {
            max-width: clamp(3.5rem, 18vw, 6rem);
        }

        .logout-button {
            gap: 0.25rem;
            padding: 0.45rem 0.5rem;
            font-size: 0.7rem;
        }
    }

    @media (max-width: 450px) {
        .account-capsule {
            grid-column: 2;
            grid-row: 1;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .login-capsule {
            transition: none;
        }
    }
</style> 