<script setup>
    import { computed } from "vue"
    import { useI18n } from "vue-i18n"
    import ImageCard from "./ImageCard.vue"
    import CardContainer from "./CardContainer.vue"
    import ExpectationCard from "./ExpectationCard.vue"
    import InfoCard from "./InfoCard.vue"

    const { tm, rt, locale } = useI18n()
    const expectationCards = computed(() => {
        // Read locale explicitly so this computed value refreshes on language changes.
        locale.value
        const cards = tm('event.info.expectationCards')
        return Array.isArray(cards)
            ? cards.map(card => ({
                ...card,
                title: rt(card.title),
                desc: rt(card.desc)
            }))
            : []
    }); 
    const infoCards = computed(() => {
        locale.value
        const cards = tm('event.info.infoCards')
        return Array.isArray(cards)
            ? cards.map(card => ({
                ...card,
                title: rt(card.title),
                description: rt(card.value),
                additionalInfo: rt(card.description)
            }))
            : []
    })
</script>


<template>
    <div class="main-body">
       
        <div class="header-logo">
            <i id="fire-icon" class="fa-sharp fa-solid fa-fire"/>
            <div id="logo-text">
                <span class="red-signature">{{ $t('event.info.shortName') }}</span>
                <span class="signature"><i class="fa-solid fa-tree f075"></i> {{ $t('event.info.shortDesc') }}</span>
            </div>
        </div>
        
        <h1>{{ $t('event.info.name') }}</h1>
        
        <p class="text">{{ $t('event.info.description') }}</p>

        <CardContainer :cardsCount="infoCards.length">
            <InfoCard
                v-for="card in infoCards"
                :key="card.title"
                v-bind="card"
            />
        </CardContainer>
        
        <ImageCard/>
        
        <div class="section-divider">
            <span class="divider-star" aria-hidden="true">✦</span>
            <span class="divider-title">{{ $t('event.info.expect') }}</span>
            <span class="divider-line" aria-hidden="true"><i></i></span>
        </div>

        <CardContainer :cardsCount="expectationCards.length">
            <ExpectationCard
                v-for="(card, index) in expectationCards"
                :key="`expectation-${index}-${card.title}`"
                :title="card.title"
                :description="card.desc"
                :icon="card.icon"
                :color="card.color"
            />
        </CardContainer>
        
        <div class="signature f075 dress-advice"><i class="fa-solid fa-leaf"></i> {{ $t('event.info.advice') }}</div>
    </div>
</template>

<style scoped>
    div, span, h4, h2, h1, p, i {
        background-color: white;
    }

    .main-body {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        flex-direction: column;
        padding: 2rem;
    }

    h1 {
        color: var(--dark-primary-color);
        font-size: 2.5rem;
        white-space: pre-line;
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

    .dress-advice {
        margin-top: auto;
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

    @media (max-width: 450px) {

        h1 {
            font-size: 1.5rem;
        }

        .main-body {
            padding: 1rem;
        }

        .text {
            font-size: 0.75rem;
        }
    }

</style>