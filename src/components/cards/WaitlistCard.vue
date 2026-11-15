<script setup>
</script>


<template>
    <div class="container waitlist-card">
        <div class="icon-frame">
            <i class="fa-solid fa-hourglass-start f075"></i>
        </div>
        <div class="card-content flex-column">
            <span class="signature f075">Prefer flexible standby?</span>
            <span class="text f075">Once capacity is reached, new RSVPs join the queue automatically. You may also join the standby list directly.</span>
            <button class="waitlist-button button signature"><i class="fa-regular fa-hourglass"/>Join Waitlist Instead</button>
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

    .icon-frame {
        padding: 0 0.5rem;
        color: var(--secondary-red);
    }

    .icon-frame, .card-content {
        align-self: baseline;
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