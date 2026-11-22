<script setup>
    import { dismissToast, toasts } from '@/js/toast.js'
</script>

<template>
    <TransitionGroup
        name="toast"
        tag="div"
        class="toast-container"
        aria-label="Notifications"
    >
        <div
            v-for="notification in toasts"
            :key="notification.id"
            class="toast"
            :class="`toast--${notification.type}`"
            :role="notification.type === 'error' ? 'alert' : 'status'"
        >
            <span class="toast-icon" aria-hidden="true">
                <svg v-if="notification.type === 'success'" viewBox="0 0 24 24">
                    <path d="m6 12 4 4 8-8" />
                </svg>
                <svg v-else-if="notification.type === 'error'" viewBox="0 0 24 24">
                    <path d="M12 7v6m0 4h.01" />
                </svg>
                <svg v-else viewBox="0 0 24 24">
                    <path d="M12 11v5m0-9h.01" />
                </svg>
            </span>
            <span class="toast-message">{{ notification.message }}</span>
            <button
                type="button"
                class="toast-dismiss"
                aria-label="Dismiss notification"
                @click="dismissToast(notification.id)"
            >
                &times;
            </button>
        </div>
    </TransitionGroup>
</template>

<style scoped>
    .toast-container {
        position: fixed;
        top: calc(var(--header-height, 4.5rem) + 0.75rem);
        left: 50%;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        width: min(24rem, calc(100vw - 2rem));
        margin-top: 0.75rem;
        transform: translateX(-50%);
        align-items: stretch;
        justify-content: flex-start;
        pointer-events: none;
    }

    .toast {
        width: 100%;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.875rem 1rem;
        border: 1px solid #e8e8e4;
        border-left: 4px solid;
        border-radius: 0.75rem;
        background-color: white;
        color: #26332a;
        box-shadow: 0 8px 24px rgb(7 41 12 / 16%);
        font-family: 'Montserrat', sans-serif;
        font-size: 0.95rem;
        line-height: 1.45;
        pointer-events: auto;
    }

    .toast-icon {
        display: grid;
        flex: 0 0 2rem;
        width: 2rem;
        height: 2rem;
        place-items: center;
        border-radius: 50%;
        background-color: #e8f2e9;
        color: #1e6a3a;
    }

    .toast-icon svg {
        width: 1.2rem;
        height: 1.2rem;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
    }

    .toast-message {
        flex: 1;
        min-width: 0;
        overflow-wrap: anywhere;
        font-weight: 500;
    }

    .toast--success {
        border-color: var(--primary-color);
    }

    .toast--success .toast-icon {
        background-color: #e8f2e9;
        color: #1e6a3a;
    }

    .toast--error {
        border-color: var(--secondary-red);
    }

    .toast--error .toast-icon {
        background-color: #fbeaea;
        color: #a52a2a;
    }

    .toast--info {
        border-color: var(--tetriary-color);
    }

    .toast--info .toast-icon {
        background-color: #fbf2da;
        color: #80600c;
    }

    .toast-dismiss {
        flex: 0 0 auto;
        display: grid;
        width: 1.75rem;
        height: 1.75rem;
        place-items: center;
        border-radius: 50%;
        color: #68736b;
        font-size: 1.4rem;
        line-height: 1;
        cursor: pointer;
    }

    .toast-dismiss:hover {
        background-color: #f1f2ef;
        color: #26332a;
    }

    .toast-enter-active,
    .toast-leave-active,
    .toast-move {
        transition: opacity 180ms ease, transform 180ms ease;
    }

    .toast-enter-from {
        opacity: 0;
        transform: translateY(-1rem);
    }

    .toast-leave-to {
        opacity: 0;
        transform: translateY(-0.5rem);
    }

    @media (prefers-reduced-motion: reduce) {
        .toast-enter-active,
        .toast-leave-active,
        .toast-move {
            transition: none;
        }
    }
</style>