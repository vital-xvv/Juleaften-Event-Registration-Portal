<template>
  <div
    class="card-holder"
    :style="{ '--cards-count': cardsCount }"
  >
    <slot/>
  </div>
</template>

<script setup>
    defineProps({
        cardsCount: Number
    })
</script>

<style>
    .card-holder {
        display: grid;
        width: 100%;
        min-width: 0;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
        gap: 1rem;
        justify-items: stretch;
    }

    @media (max-width: 450px) {
        .card-holder {
            grid-template-columns: minmax(0, 1fr);
        }
    }

</style>