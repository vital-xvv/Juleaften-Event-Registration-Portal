<script setup>
    import { computed } from 'vue'
    import { eventStatistics } from '@/js/state.js'

    const availablePlaces = computed(() => Math.max(
        eventStatistics.value.capacity - eventStatistics.value.filledCapacity,
        0
    ))
</script>

<template>
    <section class="capacity-card" :aria-label="$t('registrationForm.capacity.title')">
        <div class="capacity-heading">
            <span class="capacity-title">{{ $t('registrationForm.capacity.title') }}</span>
            <span class="capacity-available" :class="{ 'capacity-available--full': availablePlaces === 0 }">
                {{ $t('registrationForm.capacity.available', { count: availablePlaces }) }}
            </span>
        </div>
        <span class="capacity-summary">
            {{ $t('registrationForm.capacity.reserved', {
                filled: eventStatistics.filledCapacity,
                capacity: eventStatistics.capacity,
                percentage: eventStatistics.filledPercentage
            }) }}
        </span>
        <div
            class="count-line"
            role="progressbar"
            :aria-valuenow="(eventStatistics.filledCapacity)"
            :aria-valuemin="0"
            :aria-valuemax="eventStatistics.capacity"
            :aria-label="$t('registrationForm.capacity.progressLabel')"
        >
            <div class="count-line__fill" :style="{ width: `${eventStatistics.filledPercentage}%` }"></div>
        </div>
    </section>
</template>



<style scoped>
    .capacity-card {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        flex: none;
        padding: 0.9rem 1rem;
        border: 1px solid #e8e4da;
        border-radius: 10px;
        background: linear-gradient(145deg, #ffffff, #fbf7ee);
        box-shadow: 0 3px 10px rgb(30 63 32 / 6%);
    }

    .capacity-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .capacity-title {
        color: var(--dark-primary-color);
        font: 700 0.8rem 'Montserrat', sans-serif;
    }

    .capacity-available {
        padding: 0.25rem 0.55rem;
        border-radius: 999px;
        background: #e8f1e7;
        color: #24552b;
        font: 600 0.7rem 'Montserrat', sans-serif;
    }

    .capacity-available--full {
        background: #f8e9e5;
        color: #9c302a;
    }

    .capacity-summary {
        color: #625e56;
        font: 400 0.75rem/1.4 'Montserrat', sans-serif;
    }

    .count-line {
        width: 100%;
        height: 0.65rem;
        container-type: inline-size;
        overflow: hidden;
        border-radius: 999px;
        background-color: #e8e7df;
    }

    .count-line__fill {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, #4b9b5b, #d6aa35 72%, #bd413b);
        background-size: 100cqi 100%;
        background-repeat: no-repeat;
        transition: width 300ms ease;
    }
</style>