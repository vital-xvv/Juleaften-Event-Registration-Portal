<script setup>
    import RegistrationForm from '@/components/RegistrationForm.vue'
    import BenefitCard from '@/components/cards/BenefitCard.vue'
    import CardContainer from "../cards/CardContainer.vue"

    const footerCardsSettings = [
        {
            icon: 'fa-solid fa-calendar',
            title: 'Complimentary Hearth',
            description: 'Saturday, November 18th at 2:00 PM',
            additionalInfo: '5:00 PM - 9:00 PM DK',
            color: '#07290C'

        },
        {
            icon: 'fa-solid fa-location-dot',
            title: 'All Ages & Families',
            description: 'The Heart Gathering, Copenhagen, Denmark',
            additionalInfo: '',
            color: '#B22A2C'
        },
        {
            icon: 'fa-solid fa-user-group',
            title: 'Winter Parking & Shuttles',
            description: '50+ people expected to attend',
            additionalInfo: '',
            color: '#446744'
        }
    ]
</script>

<template>
    <div class="container flex-column">
        <RegistrationForm/>
        <CardContainer>
            <BenefitCard v-for="card in footerCardsSettings" :key="card.title" v-bind="card"/>
        </CardContainer>
    </div>
</template>


<style scoped>

    .container {
        border-radius: 14px;
        margin: 0.5rem auto;
        max-width: 1000px;
    }

    @media screen and (max-width: 425px) {
        .container {
            width: 200px;
        }
    }

</style>