<script setup>
    defineProps({
        title: String,
        description: String,
        additionalInfo: String,
        icon: String,
        color: String
    })
</script>

<template>
    <div class="info-card" :style="{ '--card-accent': color || 'var(--primary-color)' }">
        <span class="icon-frame" aria-hidden="true">
            <i :class="icon"/>
        </span>
        <div class="card-content">
            <p class="card-title">{{ title }}</p>
            <strong class="card-value">{{ description }}</strong>
            <span v-if="additionalInfo" class="card-description">{{ additionalInfo }}</span>
        </div>
    </div>
</template>

<style scoped>
    .info-card {
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 0.9rem;
        min-width: 0;
        max-width: 100%;
        padding: 1.1rem 1.2rem;
        overflow: hidden;
        border: 1px solid rgba(7, 41, 12, 0.08);
        border-left: 4px solid var(--card-accent);
        border-radius: 16px;
        background: linear-gradient(145deg, #fffdfa, var(--neutral-color));
        box-shadow: 0 5px 16px rgba(48, 37, 25, 0.07);
        transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
    }

    .info-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 9px 22px rgba(48, 37, 25, 0.12);
    }

    .icon-frame {
        display: grid;
        flex: 0 0 2.6rem;
        width: 2.6rem;
        height: 2.6rem;
        place-items: center;
        border: 1px solid rgba(7, 41, 12, 0.06);
        border-radius: 12px;
        background: #fff4dd;
        color: var(--card-accent);
    }

    .icon-frame i {
        font-size: 1.1rem;
    }

    .card-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 0.25rem;
        min-width: 0;
    }

    .card-title {
        color: #756b61;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.07em;
        line-height: 1.35;
        text-transform: uppercase;
    }

    .card-value {
        color: var(--dark-primary-color);
        font-family: 'Literata', serif;
        font-size: 1rem;
        line-height: 1.35;
        overflow-wrap: anywhere;
    }

    .card-description {
        color: #756b61;
        font-size: 0.75rem;
        line-height: 1.5;
        overflow-wrap: anywhere;
    }

    @media (max-width: 450px) {
        .info-card {
            gap: 0.7rem;
            padding: 0.9rem;
        }

        .icon-frame {
            flex-basis: 2.3rem;
            width: 2.3rem;
            height: 2.3rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .info-card {
            transition: none;
        }
    }
</style>