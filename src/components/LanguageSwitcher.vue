<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

function changeLanguage(language) {
    locale.value = language

    localStorage.setItem('locale', language)
    document.documentElement.lang = language
}
</script>

<template>
    <div class="language-switcher" role="group" aria-label="Choose language">
        <button
            type="button"
            :class="{ active: locale === 'en' }"
            :aria-pressed="locale === 'en'"
            aria-label="Switch to English"
            @click="changeLanguage('en')"
        >
            EN
        </button>

        <button
            type="button"
            :class="{ active: locale === 'ua' }"
            :aria-pressed="locale === 'ua'"
            aria-label="Switch to Ukrainian"
            @click="changeLanguage('ua')"
        >
            УКР
        </button>
    </div>
</template>

<style scoped>
.language-switcher {
    display: inline-flex;
    align-items: center;
    align-self: center;
    flex: 0 0 auto;
    white-space: nowrap;
    padding: 3px;
    gap: 2px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.22);
    box-shadow: 0 4px 16px rgba(20, 12, 8, 0.12);
    backdrop-filter: blur(8px);
}

button {
    min-width: 42px;
    height: 34px;
    padding: 0 10px;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
    opacity: 0.9;
    transition:
        color 180ms ease,
        background-color 180ms ease,
        box-shadow 180ms ease,
        opacity 180ms ease,
        transform 180ms ease;
}

button:hover:not(.active) {
    background: rgba(255, 255, 255, 0.1);
    opacity: 1;
}

button.active {
    background: #fff;
    color: #5f3828;
    box-shadow: 0 2px 8px rgba(31, 20, 14, 0.16);
    opacity: 1;
}

button:active {
    transform: scale(0.96);
}

button:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
}

@media (max-width: 640px) {
    button {
        min-width: 38px;
        height: 32px;
        line-height: 32px;
    }
}
</style>