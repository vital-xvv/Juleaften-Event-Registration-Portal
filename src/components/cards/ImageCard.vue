<script setup>
    import jesusBirthday from "@/assets/jesus birthday.jpg"
</script>

<template>
    <div class="image-card">
        <img :src="jesusBirthday" alt="Jesus is Born Picture" />
        <p class="image-card__caption text-bold f075">{{ $t('event.info.imageDescription') }}</p>
    </div>
</template>

<style scoped>
    .image-card {
        display: grid;
        overflow: hidden;
        border-radius: 0.75rem;
    }

    .image-card > * {
        grid-area: 1 / 1;
    }

    .image-card img {
        display: block;
        width: 100%;
        min-width: 0;
        height: 100%;
        object-fit: cover;
    }

    .image-card__caption {
        white-space: pre-line;
        align-self: end;
        margin: 0;
        padding: 0.75rem 1rem;
        color: white;
        background: rgb(0 0 0 / 45%);
        backdrop-filter: blur(1px);
    }
    
</style>he