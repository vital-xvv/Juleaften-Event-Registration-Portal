<script setup>
    defineProps({
        canJoinWaitlist: Boolean
    })
</script>


<template>
    <div class="container waitlist-card" v-if="canJoinWaitlist">
        <i class="fa-solid fa-hourglass-start f075"></i>
        <div class="card-content flex-column">
            <span class="signature f075">Oops.. All seats have been reserved.</span>
            <span class="text f075">Please take notice, that the targeted capacity has been filled, you can join waitlist instead in case if someone cancels their visit..</span>
        </div>
    </div>
</template>

<style scoped>
    .waitlist-card {
        background-color: var(--darker-neutral-color);
        flex: none;
        padding: 1rem;
        align-items: baseline;
        border-radius: 12px;
    }

    .card-content {
        gap: 0.75rem;
    }

    .signature {
        text-transform: none;
    }

    i, span, div, p, h6, button {
        background-color: inherit;
        color: inherit;
    }

    .waitlist-button {
        align-self: flex-end;
        justify-self: flex-end;
    }

    .button {
        background-color: white;
        color: var(--secondary-red);
        transition: background 0.2s ease;
    }

    .button:hover,
    .button:active {
        background: rgb(220, 220, 220);
    }

</style>