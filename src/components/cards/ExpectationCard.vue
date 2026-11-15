<script setup>
    defineProps({
        color: String
    })
</script>


<template>
    <div class="card-container">
        <span class="corner-circle" :style="{ backgroundColor: color }" aria-hidden="true"></span>
        <div class="icon-frame"><i class="fa-solid fa-music f1_5" :style="{color : color}"></i></div>
        <h4>Acoustic caroling</h4>
        <p class="text f075 mrv05">Traditional folk hymns, acoustic guitar, and seasonal poetry readings.</p>
    </div>
</template>

<style scoped>
    .card-container {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: baseline;
        align-items: flex-start;
        max-width: 425px;
        padding: 1rem;
        border-radius: 16px;
        background-color: var(--neutral-color);
        align-items: flex-start;
        transform-style: preserve-3d;
        transition: transform 250ms ease, box-shadow 250ms ease;
    }

    .card-container:hover,
    .card-container:active {
        transform: perspective(700px) rotateX(2deg) rotateY(-2deg);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
    }

    .corner-circle {
        position: absolute;
        right: -1rem;
        bottom: -1rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        opacity: 0.3;
        pointer-events: none;
        transition: transform 350ms ease, opacity 350ms ease;
    }

    .card-container:hover .corner-circle,
    .card-container:active .corner-circle {
        transform: scale(1.5);
        opacity: 0.45;
    }

    .icon-frame {
        align-self: flex-start;
        padding: 0;
        padding-bottom: 0.5rem;
    }
</style>