<script setup>
    defineProps({
        title: String,
        description: String,
        icon: {
            type: String,
            default: 'fa-solid fa-star'
        },
        color: {
            type: String,
            default: '#B22A2C'
        }
    })
</script>

<template>
    <div class="card-container">
        <span class="corner-circle" :style="{ backgroundColor: color }" aria-hidden="true"></span>
        <span class="icon-frame" aria-hidden="true">
            <i :class="icon" class="expectation-icon" :style="{ color }"></i>
        </span>
        <h4>{{ title }}</h4>
        <p class="text f075 mrv05">{{ description }}</p>
    </div>
</template>

<style scoped>
    .card-container {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-width: 450px;
        padding: 1.25rem;
        border-radius: 16px;
        background-color: var(--neutral-color);
        transform-style: preserve-3d;
        transition: transform 250ms ease, box-shadow 250ms ease;
    }

    .card-container:hover,
    .card-container:active {
        transform: perspective(700px) rotateX(2deg) rotateY(-2deg);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
    }

    .icon-frame {
        position: relative;
        z-index: 1;
        display: grid;
        width: 3.25rem;
        height: 3.25rem;
        margin-bottom: 0.5rem;
        place-items: center;
        border: 1px solid rgba(7, 41, 12, 0.08);
        border-radius: 14px;
        background: linear-gradient(145deg, #fffdfa, #fff1d5);
        box-shadow: 0 4px 10px rgba(48, 37, 25, 0.08);
        transition: transform 220ms ease, box-shadow 220ms ease;
    }

    .card-container:hover .icon-frame,
    .card-container:active .icon-frame {
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 7px 14px rgba(48, 37, 25, 0.13);
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

    .expectation-icon {
        font-size: 1.35rem;
        filter: drop-shadow(0 1px 1px rgba(48, 37, 25, 0.12));
    }

    @media (max-width: 450px) {
        .card-container {
            padding: 1rem;
        }

        .icon-frame {
            width: 2.8rem;
            height: 2.8rem;
            margin-bottom: 0.7rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .card-container,
        .icon-frame {
            transition: none;
        }
    }
</style>