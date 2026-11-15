<script setup>
    import jesusBirthday from "@/assets/jesus birthday.jpg"
</script>

<template>
    <div class="image-card">
        <img :src="jesusBirthday" alt="Jesus is Born Picture" />
        <p class="image-card__caption text-bold f075">The way to the cross is free. The way to the cross is free. The way to the cross is free. The way to the cross is free. The way to the cross is free. The way to the cross is free. The way to the cross is free.</p>
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
        width: 450px;
        height: 100%;
        object-fit: cover;
    }

    @media screen and (max-width: 425px) {
        .image-card img {   
            width: 100%;
        }
    }

    .image-card__caption {
        align-self: end;
        margin: 0;
        padding: 0.75rem 1rem;
        color: white;
        background: rgb(0 0 0 / 45%);
        backdrop-filter: blur(1px);
    }
</style>