<script setup>
    defineProps({
        canJoinWaitlist: Boolean
    })
</script>


<template>
    <aside v-if="canJoinWaitlist" class="waitlist-card" role="status" aria-labelledby="waitlist-title">
        <span class="waitlist-icon" aria-hidden="true">
            <i class="fa-solid fa-hourglass-half"></i>
        </span>
        <div class="waitlist-content">
            <h2 id="waitlist-title">{{ $t('registrationForm.waitlist.title') }}</h2>
            <p>{{ $t('registrationForm.waitlist.description') }}</p>
        </div>
    </aside>
</template>

<style scoped>
    .waitlist-card {
        display: grid;
        grid-template-columns: 2.75rem minmax(0, 1fr);
        align-items: start;
        gap: 0.9rem;
        padding: 1rem 1.1rem;
        border: 1px solid #ead7a4;
        border-radius: 12px;
        background: linear-gradient(145deg, #fff8e6, #fffdfa);
        box-shadow: 0 4px 12px rgb(75 55 18 / 8%);
    }

    .waitlist-icon {
        display: grid;
        width: 2.75rem;
        height: 2.75rem;
        place-items: center;
        border-radius: 50%;
        background: #f5e8c8;
        color: #805c16;
        font-size: 1.1rem;
    }

    .waitlist-content {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
    }

    .waitlist-content h2 {
        color: #594316;
        font: 700 0.95rem 'Montserrat', sans-serif;
    }

    .waitlist-content p {
        color: #625e56;
        font: 400 0.82rem/1.5 'Montserrat', sans-serif;
    }

    @media (max-width: 450px) {
        .waitlist-card {
            grid-template-columns: 2.25rem minmax(0, 1fr);
            gap: 0.7rem;
            padding: 0.9rem;
        }

        .waitlist-icon {
            width: 2.25rem;
            height: 2.25rem;
        }
    }
</style>