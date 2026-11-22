<script setup>
    import { currentPage, isVisitPresent } from '@/js/state.js';
    import Avatar from '../custom/Avatar.vue';
    import LanguageSwitcher from '../LanguageSwitcher.vue';

    function selectPage(page) {
        currentPage.value = page;
    }
</script>

<template>
    <header id="main-header">
        <div class="header-logo">
            <div><i id="fire-icon" class="fa-sharp fa-solid fa-fire"/></div>
            <div id="logo-text">
                <h3>{{ $t('event.info.shortName') }}</h3>
                <div class="signature-i">{{ $t('event.info.shortDesc') }}</div>
            </div>
        </div>
            
        <nav class="tab-container" aria-label="Pages">
            <button
                id="overview-tab"
                type="button"
                class="page-select"
                :class="{ active: currentPage === 'overview' }"
                :aria-current="currentPage === 'overview' ? 'page' : null"
                aria-controls="overview-panel"
                @click="selectPage('overview')"
            >
                {{ $t('tabs.overview') }}
            </button>
            <button
                v-if="isVisitPresent"
                id="registration-tab"
                type="button"
                class="page-select"
                :class="{ active: currentPage === 'registration' }"
                :aria-current="currentPage === 'registration' ? 'page' : null"
                aria-controls="registration-panel"
                @click="selectPage('registration')"
            >
                {{ $t('tabs.registration') }}
            </button>
        </nav>

        <div class="header-actions">
            <Avatar class="header-avatar"/>
            <LanguageSwitcher class="language-switcher"/>
        </div>
    </header>
</template>


<style scoped>

.tab-container {
    display: flex;
    gap: 0.5rem;
}

#main-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: var(--neutral-color);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    justify-items: space-between;
    padding: 0.5rem;
}

.container {
    padding: 0.25rem;
}

.header-logo {
    grid-column: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: flex-start;
    justify-self: flex-start;
    min-width: 0;
}

.header-logo > div:first-child {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    flex: 0 0 3rem;
    border: 1px solid rgba(184, 21, 21, 0.16);
    border-radius: 1rem;
    background: linear-gradient(145deg, #fff 0%, #fbefeb 100%);
    box-shadow: 0 2px 6px rgba(107, 40, 30, 0.1);
}

.header-actions {
    grid-column: 3;
    display: flex;
    align-items: center;
    justify-self: end;
    gap: 0.75rem;
    padding: 0.35rem 0.5rem;
    border: 1px solid rgba(107, 98, 90, 0.16);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.55);
}

#fire-icon {
    color: #b81515;
    font-size: 2rem;
    filter: drop-shadow(0 1px 1px rgba(107, 40, 30, 0.16));
}

#logo-text {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
}

#logo-text h3 {
    margin: 0;
    color: #493a35;
    font-size: 1.15rem;
    font-weight: 750;
    letter-spacing: 0.015em;
    line-height: 1.15;
}

.signature-i {
    color: #81736b;
    font-size: 0.78rem;
    line-height: 1.25;
}

.page-select {
    grid-column: 2;
    justify-self: center;
    position: relative;
    padding: 0.75rem 1.25rem;
    border: 0;
    border-radius: 0.75rem 0.75rem 0 0;
    background: transparent;
    color: #6b625a;
    font: inherit;
    font-weight: 500;
    font-size: 1.2rem;
    transition: color 180ms ease, background-color 180ms ease;
    cursor: pointer;
}

.page-select.active {
    color: var(--primary-color, #8b3f32);
    background: linear-gradient(180deg, rgba(184, 21, 21, 0.1), rgba(184, 21, 21, 0.02));
    font-weight: 700;
}

.page-select.active::after {
    content: "";
    position: absolute;
    right: 1rem;
    bottom: 0;
    left: 1rem;
    height: 3px;
    border-radius: 3px 3px 0 0;
    background: var(--primary-color, #b81515);
}

.page-select:focus-visible {
    outline: 2px solid var(--primary-color, #b81515);
    outline-offset: -2px;
}

.google {
    grid-column: 3;
    justify-self: end;
}

.google {
    border-radius: 24px;
}

@media screen and (max-width: 450px) {
    #main-header {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: auto auto;
        row-gap: 0.25rem;
    }

    h3, span {
        font-size: 0.5rem;
    }

    .button {
        padding: 0.5rem;
        gap: 0.5rem;
        font-size: 0.5rem;
    }

    #fire-icon {
        font-size: 1rem;
    }

    .header-logo {
        display: none;
    }

    .header-actions {
        grid-column: 1;
        grid-row: 1;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;
        gap: 0.35rem;
        padding: 0.15rem 0.25rem;
        border: 0;
        background: transparent;
        min-width: 0;
        justify-self: stretch;
    }

    .header-actions :deep(.account-capsule) {
        grid-column: auto;
        grid-row: auto;
        justify-self: start;
    }

    .header-actions :deep(button),
    .header-actions :deep(select) {
        min-height: 2rem;
        padding: 0.25rem 0.45rem;
        font-size: 0.75rem;
        line-height: 1.1;
    }

    .header-actions :deep(svg),
    .header-actions :deep(img) {
        width: 1.25rem;
        height: 1.25rem;
    }

    #logo-text {
        display: none;
    }

    .signature-i {
        font-size: 0.5rem;
    }

    .page-select {
        font-size: 0.7rem;
        text-align: center;
        padding: 0.4rem 0.5rem;
    }

    .tab-container {
        grid-column: 1 / -1;
        grid-row: 2;
        justify-content: center;
        gap: 0.35rem;
    }
}

@media screen and (max-width: 360px) {
    .header-actions {
        gap: 0.2rem;
        padding: 0.1rem 0.2rem;
    }

    .header-actions :deep(button),
    .header-actions :deep(select) {
        padding: 0.2rem 0.35rem;
        font-size: 0.7rem;
    }
}

</style>