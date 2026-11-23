<script setup>
    import { computed } from 'vue'
    import { eventStatistics } from '@/js/state.js'

    const availablePlaces = computed(() => Math.max(
        eventStatistics.value.capacity - eventStatistics.value.filledCapacity,
        0
    ))
</script>

<template>
    <div class="header-counter">
        <span class="counter-title signature">{{ $t('registrationForm.capacity.counterTitle') }}</span>
        <span
            class="spots-counter"
            :aria-label="$t('registrationForm.capacity.available', { count: availablePlaces })"
        >
            <span aria-hidden="true">
                <img class="svg" src="@/assets/fire.svg" width="24" height="24" alt="" />
            </span>
            <strong>{{ availablePlaces }}</strong>
            <span>{{ $t('registrationForm.capacity.availableShort') }}</span>
        </span>
    </div>
</template>

<style scoped>
    .header-counter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.75rem;
    }

    .counter-title {
        color: red;
        font-size: 0.75rem;
    }

    .spots-counter {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0 1rem;
        border: 1px solid #f1b6b6;
        border-radius: 999px;
        background: #fff0f0;
        color: #a52a2a;
        font-size: 0.875rem;
        font-weight: 600;
        white-space: nowrap;
    }

    .spots-counter strong {
        font-size: 1rem;
    }

    @media (max-width: 450px) {
        .counter-title {
            font-size: 0.5rem;
        }

        .spots-counter {
            padding-inline: 0.75rem;
        }
    }
</style>
