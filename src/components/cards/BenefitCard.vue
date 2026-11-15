<script setup>
defineProps({
    title: String,
    description: String,
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
            <h5 class="f075">{{ title }}</h5>
            <span class="signature f075">{{ description }}</span>
        </div>
    </div>
</template>

<style scoped>
    div.info-card {
        align-items: center;
        gap: 1rem;
        justify-content: flex-start;
        border-radius: 14px;
        background-color: var(--darker-neutral-color);
        padding: 1rem;
        width: 325px;
    }

    div.info-card i {
        font-size: 1.5rem;
    }

    div.card-content {
        display: flex;
        gap: 0.5rem;
    }

    div .icon-frame{
        align-self: center;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    * {
        background-color: var(--darker-neutral-color);
    }

    @media screen and (max-width: 425px) {
        .icon-card {
            max-width: 200px;
        }
    }
</style>