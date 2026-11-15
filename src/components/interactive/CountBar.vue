<script setup>
    const guestCount = 42
    const guestCapacity = 60
    const fillPercent = Math.min(100, Math.round((guestCount / guestCapacity) * 100))
</script>

<template>
    <div class="container flex-column">
        <div class="count-label">
            <span class="signature f075">Gathering Capacity</span>
            <span class="signature-primary f075">{{ guestCount }} of {{ guestCapacity }} reserved ({{ fillPercent }}%)</span>
        </div>
        <div
            class="count-line"
            role="progressbar"
            :aria-valuenow="guestCount"
            :aria-valuemin="0"
            :aria-valuemax="guestCapacity"
            aria-label="Guests reserved"
        >
            <div class="count-line__fill" :style="{ width: `${fillPercent}%` }"></div>
        </div>
    </div>
</template>



<style scoped>
    .count-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .flex-column {
        gap: 0.5rem;
        flex: none;
    }

    .container {
        background-color: white;
        padding: 0.75rem 0.5rem;
        border-radius: 6px;
    }

    .count-line {
        width: 100%;
        height: 8px;
        overflow: hidden;
        border-radius: 999px;
        background-color: #e5e7eb;
    }

    .count-line__fill {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, yellow, orange, red);
        transition: width 200ms ease;
    }

    div, span {
        background-color: inherit;
    }
</style>