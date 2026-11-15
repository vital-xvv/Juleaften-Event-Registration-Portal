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
    <div class="container info-card">
        <div class="icon-frame">
            <i :class="icon" :style="{ 'color': color }"/>
        </div>
        <div class="card-content flex-column">
            <p class="signature f05">{{ title }}</p>
            <span class="signature-primary f075">{{ description }}</span>
            <span class="signature-i f075">{{ additionalInfo }}</span>
        </div>
    </div>
</template>

<style scoped>
    div.info-card {
        align-items: center;
        gap: 1rem;
        justify-content: flex-start;
        border-radius: 14px;
        background-color: var(--neutral-color);
        padding: 0.5rem;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }

    div.info-card:hover {
        background-color: var(--darker-neutral-color);
    }

    div.info-card i {
        font-size: 1rem;
        transition: color 0.2s ease;
    }

    div.card-content {
        display: flex;
        gap: 0.25rem;
    }

    div .icon-frame{
        align-self: center;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div, p, span, i {
        background-color: inherit;
    }
</style>