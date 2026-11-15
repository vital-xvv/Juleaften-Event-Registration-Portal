<template>
  <div class="card-holder">
    <slot/>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .card-holder {
        display: grid;
        grid-template-columns: auto;
        grid-auto-flow: column;
        margin: 1rem 0;
        gap: 1rem;
    }

    @media screen and (max-width: 425px) {
        .card-holder {
            display: grid;
            grid-template-columns: 1fr;
            grid-auto-flow: row;
            flex-direction: column;
        }
    }
</style>