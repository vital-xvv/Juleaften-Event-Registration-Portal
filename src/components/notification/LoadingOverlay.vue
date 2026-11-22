<script setup>
   import { loadingConfig } from '@/js/loading.js';
</script>

<template>
    <Teleport to="body">
        <Transition name="loading-overlay">
            <div
                v-if="loadingConfig.isLoading"
                class="loading-overlay"
                role="status"
                aria-live="polite"
                aria-busy="true"
            >
                <div class="loading-panel">
                    <span class="loading-spinner" aria-hidden="true"></span>
                    <span>{{loadingConfig.message}}</span>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
    .loading-overlay {
        position: fixed;
        z-index: 2000;
        inset: 0;
        display: grid;
        padding: 1rem;
        place-items: center;
        background-color: rgb(251 247 238 / 68%);
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
        cursor: wait;
    }

    .loading-panel {
        display: flex;
        align-items: center;
        gap: 0.875rem;
        padding: 1.25rem 1.5rem;
        border: 1px solid rgb(30 63 32 / 12%);
        border-radius: 0.875rem;
        background-color: white;
        box-shadow: 0 12px 32px rgb(7 41 12 / 16%);
        color: var(--dark-primary-color);
        font-family: 'Montserrat', sans-serif;
        font-size: 1rem;
        font-weight: 600;
    }

    .loading-spinner {
        width: 2rem;
        height: 2rem;
        flex: 0 0 auto;
        border: 3px solid rgb(30 63 32 / 18%);
        border-top-color: var(--primary-color);
        border-radius: 50%;
        animation: spin 750ms linear infinite;
    }

    .loading-overlay-enter-active,
    .loading-overlay-leave-active {
        transition: opacity 160ms ease;
    }

    .loading-overlay-enter-from,
    .loading-overlay-leave-to {
        opacity: 0;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .loading-spinner {
            animation-duration: 2s;
        }

        .loading-overlay-enter-active,
        .loading-overlay-leave-active {
            transition: none;
        }
    }
</style>
