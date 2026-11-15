<script setup>
    import ImageCard from "./ImageCard.vue"
    import CardContainer from "./CardContainer.vue"
    import ExpectationCard from "./ExpectationCard.vue"
    import InfoCard from "./InfoCard.vue"

    const cardsSettings = [
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
            additionalInfo: 'Stone Great Hall',
            color: '#B22A2C'
        }
    ]
</script>


<template>
    <div class="container flex-column pd2">
        <div class="header-logo">
            <i id="fire-icon" class="fa-sharp fa-solid fa-fire"/>
            <div id="logo-text">
                <span class="red-signature">The Heart Gathering</span>
                <span class="signature"><i class="fa-solid fa-tree f075"></i> Annual Retreat</span>
            </div>
        </div>
        <h1>Annual Heart Gathering Juletide</h1>
        <p class="text f1">Join us for a transformative experience of connection, growth, and inspiration. Our annual retreat is designed to foster meaningful connections, personal development, and a sense of community.</p>
        <CardContainer>
            <InfoCard v-for="card in cardsSettings" :key="card.title" v-bind="card"/>
        </CardContainer>
        <ImageCard/>
        <div class="section-divider">
            <span class="divider-star" aria-hidden="true">✦</span>
            <span class="divider-title">What to expect</span>
            <span class="divider-line" aria-hidden="true"><i></i></span>
        </div>
        <CardContainer>
            <ExpectationCard color="red"/>
            <ExpectationCard color="red"/>
            <ExpectationCard color="red"/>
        </CardContainer>
        
        <div class="signature f075 mrt1"><i class="fa-solid fa-leaf"></i> Dress: Cozy winter flannel, sweaters & warm knitwear</div>
    </div>
</template>

<style scoped>
    div, span, h4, h2, h1, p, i {
        background-color: white;
    }

    h1 {
        color: var(--dark-primary-color);
        margin: 1rem 0;
        font-size: 2.5rem;
    }

    .red-signature {
        font-family: 'Montserrat', sans-serif;
        text-transform: uppercase;
        font-weight: 700;
        font-style: bold;
        color: red;
        font-size: 0.6rem;
    }

    .signature {
        text-transform: capitalize;
    }

    .header-logo {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
    }

    #logo-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .section-divider {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        width: 100%;
        margin: 1.5rem 0 0.75rem;
        color: #07290C;
    }

    .divider-star {
        color: #B22A2C;
        font-size: 1.2rem;
        line-height: 1;
    }

    .divider-title {
        flex: 0 0 auto;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    .divider-line {
        position: relative;
        flex: 1;
        height: 0.5rem;
        margin-left: 0.25rem;
    }

    .divider-line::before {
        position: absolute;
        top: 50%;
        right: 0.15rem;
        left: 0;
        height: 2px;
        background: linear-gradient(90deg, #B22A2C, #B22A2C 70%, rgba(178, 42, 44, 0.25));
        clip-path: polygon(0 0, 100% 50%, 0 100%);
        content: '';
        transform: translateY(-50%);
    }

    .divider-line i {
        position: absolute;
        top: 50%;
        right: 0;
        width: 0.35rem;
        height: 0.35rem;
        border: 1px solid #B22A2C;
        background: white;
        transform: translateY(-50%) rotate(45deg);
    }

</style>