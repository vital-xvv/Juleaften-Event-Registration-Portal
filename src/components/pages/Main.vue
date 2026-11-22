<script setup>
    import RegistrationForm from '@/components/RegistrationForm.vue'
    import BenefitCard from '@/components/cards/BenefitCard.vue'
    import CardContainer from "../cards/CardContainer.vue"
    import ToastContainer from '../notification/ToastContainer.vue'
</script>

<template>
    <div class="main-page-content">
        <RegistrationForm class="card-with-form"/>
        <ToastContainer class="toast-container"/>
    </div>
</template>


<style scoped>

    .main-page-content {
        border-radius: 14px;
        padding: 1rem;
        row-gap: 1rem;
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        grid-template-rows: auto 1fr;
        justify-items: center;
        background-image: url("@/assets/Minimalist Christmas Tree Pattern.png");
        background-repeat: repeat;
        background-size: 600px auto;
    }

    .card-with-form {
        grid-column: 2 / span 4;
        grid-row: 1;
    }

    .toast-container {
        grid-column: 5 / 7;
        grid-row: 1;
        justify-self: end;
    }

    @media screen and (max-width: 450px) {
        .main-page-content {
            grid-template-columns: 1fr;
        }

        .toast-container {
            grid-column: 1;
        }
    }

</style>