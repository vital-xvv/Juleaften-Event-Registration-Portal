<script setup>
    import { computed } from 'vue'
    import { useI18n } from 'vue-i18n'

    const { locale, t } = useI18n()

    const props = defineProps({
        user: {
            type: Object,
            default: () => ({})
        },
        visitInfo: {
            type: Object,
            default: null
        }
    })

    const firstName = computed(() => props.user?.firstName?.trim() || 'friend')

    const companionshipLabels = computed(() => ({
        FAMILY: t('my-registration.companionships.family'),
        FRIENDS: t('my-registration.companionships.friends'),
        SINGLE: t('my-registration.companionships.single'),
        COUPLE: t('my-registration.companionships.couple'),
        MIXED: t('my-registration.companionships.mixed')
    }))

    const statusLabels = computed(() => ({
        REGISTERED: t('my-registration.statuses.registered'),
        CANCELLED: t('my-registration.statuses.cancelled'),
        WAITING: t('my-registration.statuses.waiting'),
        INACTIVE: t('my-registration.statuses.inactive')
    }))

    const companionshipLabel = computed(() => {
        const companionship = props.visitInfo?.companionship
        return companionshipLabels.value[companionship] || companionship || ''
    })

    const statusLabel = computed(() => {
        const status = props.visitInfo?.status
        return statusLabels.value[status] || status || ''
    })

    const statusClass = computed(() => props.visitInfo?.status?.toLowerCase() || '')

    const formattedRegistrationDate = computed(() => {
        const value = props.visitInfo?.registrationDate
        let parts

        if (Array.isArray(value)) {
            parts = value
        } else if (typeof value === 'string') {
            const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/)
            if (!match) {
                return value
            }
            parts = match.slice(1).map(Number)
        } else {
            return ''
        }

        const [year, month, day, hour = 0, minute = 0] = parts
        const date = new Date(Date.UTC(year, month - 1, day, hour, minute))
        if (Number.isNaN(date.getTime())) {
            return typeof value === 'string' ? value : ''
        }

        const dateLocale = locale.value === 'ua' ? 'uk-UA' : 'en-DK'

        return new Intl.DateTimeFormat(dateLocale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23',
            timeZone: 'UTC'
        }).format(date)
    })

    const eventVisitCount = computed(() => {
        const visits = props.visitInfo?.event?.visit
        return Array.isArray(visits) ? visits.length : null
    })
</script>

<template>
    <section class="welcome-visit" aria-labelledby="welcome-title">
        <div class="welcome-eyebrow signature">{{ $t('my-registration.greetingLine') }}</div>
        <h1 id="welcome-title">{{$t('my-registration.greeting')}}, {{ firstName }}!</h1>
        <p class="welcome-intro">
            {{ $t('my-registration.welcomeIntro') }}
        </p>

        <div class="visit-details">
            <div class="visit-detail">
                <span class="visit-icon" aria-hidden="true">
                    <i class="fa-solid fa-calendar-days"></i>
                </span>
                <div>
                    <span class="detail-label">{{ $t('event.info.dateLabel') }}</span>
                    <strong>{{ $t('event.info.eventDate') }}</strong>
                </div>
            </div>
            <div class="visit-detail">
                <span class="visit-icon" aria-hidden="true">
                    <i class="fa-regular fa-clock"></i>
                </span>
                <div>
                    <span class="detail-label">{{ $t('event.info.timeLabel') }}</span>
                    <strong>{{ $t('event.info.eventTime') }}</strong>
                    <span class="detail-note">{{ $t('event.info.timeNote') }}</span>
                </div>
            </div>
            <div class="visit-detail">
                <span class="visit-icon" aria-hidden="true">
                    <i class="fa-solid fa-location-dot"></i>
                </span>
                <div>
                    <span class="detail-label">{{ $t('event.info.locationLabel') }}</span>
                    <strong>{{ $t('event.info.eventLocation') }}</strong>
                    <span class="detail-note">{{ $t('event.info.eventPreciseLocation') }}</span>
                </div>
            </div>
        </div>

        <section v-if="visitInfo" class="registration-details" aria-labelledby="registration-details-title">
            <h2 id="registration-details-title">{{ $t('my-registration.title') }}</h2>
            <div class="registration-facts">
                <div v-if="visitInfo.event?.name" class="registration-fact">
                    <span class="detail-label">{{ $t('my-registration.data.eventTitle') }}</span>
                    <strong>{{ visitInfo.event.name }}</strong>
                </div>
                <div class="registration-fact registration-fact--wide">
                    <span class="detail-label">{{ $t('my-registration.data.comment') }}</span>
                    <span class="visit-note">{{ visitInfo.note?.trim() || 'No note provided.' }}</span>
                </div>
                <div v-if="visitInfo.status" class="registration-fact">
                    <span class="detail-label">{{ $t('my-registration.data.status') }}</span>
                    <strong class="status-badge" :class="`status-badge--${statusClass}`">
                        {{ statusLabel }}
                    </strong>
                </div>
                <div v-if="companionshipLabel" class="registration-fact">
                    <span class="detail-label">{{ $t('my-registration.data.commingWith') }}</span>
                    <strong>{{ companionshipLabel }}</strong>
                </div>
                <div v-if="visitInfo.companyCount !== null && visitInfo.companyCount !== undefined" class="registration-fact">
                    <span class="detail-label">{{ $t('my-registration.data.companionCount') }}</span>
                    <strong>{{ visitInfo.companyCount }}</strong>
                </div>
                <div v-if="formattedRegistrationDate" class="registration-fact">
                    <span class="detail-label">{{ $t('my-registration.data.registrationDate') }}</span>
                    <strong>{{ formattedRegistrationDate }}</strong>
                </div>
                <div v-if="visitInfo.event?.capacity !== null && visitInfo.event?.capacity !== undefined" class="registration-fact">
                    <span class="detail-label">{{ $t('my-registration.data.eventCapacity') }}</span>
                    <strong>{{ visitInfo.event.capacity }}</strong>
                </div>
                <div v-if="eventVisitCount !== null" class="registration-fact">
                    <span class="detail-label">Registered visits</span>
                    <strong>{{ eventVisitCount }}</strong>
                </div>
            </div>
        </section>

        <p class="welcome-note">
            {{ $t('my-registration.favour') }}
        </p>
    </section>
</template>

<style scoped>
    .welcome-visit {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1.1rem;
        padding: 1.5rem;
        overflow: hidden;
        border: 1px solid #f0dfc0;
        border-radius: 1rem;
        background: linear-gradient(145deg, #fffdfa 0%, #fff6e5 100%);
        box-shadow: 0 10px 24px rgb(112 75 28 / 10%);
    }

    .event-location {
        white-space: pre-line;;
    }

    .welcome-visit::before {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 5px;
        background: linear-gradient(90deg, #b22a2c, #e5b454, #1e6a3a);
        content: "";
    }

    .text {
        background-color: inherit;
    }

    .welcome-eyebrow {
        align-self: flex-start;
        padding: 0.4rem 0.75rem;
        border-radius: 999px;
        background-color: #fbe9e5;
        color: #a52a2a;
        font-size: 0.7rem;
        letter-spacing: 0.12em;
    }

    #welcome-title {
        font-size: clamp(1.7rem, 3vw, 2.4rem);
        line-height: 1.15;
    }

    .welcome-intro,
    .welcome-note {
        color: #34513a;
        font-family: 'Montserrat', sans-serif;
        line-height: 1.6;
    }

    .visit-details {
        display: grid;
        gap: 0.75rem;
        margin: 0.25rem 0;
    }

    .registration-details {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding-top: 0.5rem;
    }

    .registration-details h2 {
        color: var(--dark-primary-color);
        font-family: 'Literata', serif;
        font-size: 1.25rem;
    }

    .registration-facts {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.65rem;
    }

    .registration-fact {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        min-width: 0;
        padding: 0.75rem;
        border: 1px solid #f1e7d3;
        border-radius: 0.75rem;
        background-color: #fffefa;
        color: var(--dark-primary-color);
        font-family: 'Montserrat', sans-serif;
        font-size: 0.85rem;
        line-height: 1.45;
        overflow-wrap: anywhere;
        box-shadow: 0 3px 8px rgb(112 75 28 / 5%);
    }

    .registration-fact--wide {
        grid-column: 1 / -1;
    }

    .registration-fact strong {
        color: var(--dark-primary-color);
        font-size: 0.9rem;
    }

    .status-badge {
        align-self: flex-start;
        padding: 0.2rem 0.6rem;
        border-radius: 999px;
        background-color: #dcf2e2;
        color: #1e6a3a !important;
    }

    .status-badge--cancelled,
    .status-badge--inactive {
        background-color: #fbeaea;
        color: #a52a2a !important;
    }

    .status-badge--waiting {
        background-color: #fff0c7;
        color: #79550a !important;
    }

    .visit-note {
        white-space: pre-wrap;
    }

    .visit-info-error {
        padding: 0.75rem;
        border-radius: 0.65rem;
        background-color: #fff0ed;
        color: #a52a2a;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.85rem;
    }

    .visit-detail {
        display: flex;
        align-items: center;
        gap: 0.875rem;
        padding: 0.875rem;
        border: 1px solid #f1e7d3;
        border-radius: 0.75rem;
        background-color: #fffefa;
        box-shadow: 0 3px 8px rgb(112 75 28 / 5%);
    }

    .visit-icon {
        display: grid;
        flex: 0 0 2.5rem;
        width: 2.5rem;
        height: 2.5rem;
        place-items: center;
        border-radius: 50%;
        background: linear-gradient(145deg, #fff0d4, #ffe8d9);
        color: #a52a2a;
        font-size: 1rem;
        box-shadow: 0 3px 8px rgb(165 42 42 / 10%);
    }

    .visit-detail > div {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        min-width: 0;
    }

    .detail-label {
        color: #6b625a;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    .visit-detail strong {
        color: var(--dark-primary-color);
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
    }

    .detail-note {
        color: #6b625a;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.75rem;
    }

    .welcome-note {
        margin-top: 0.1rem;
        padding: 0.85rem 1rem;
        border-left: 3px solid #e5b454;
        border-radius: 0.25rem 0.65rem 0.65rem 0.25rem;
        background-color: #fff4d8;
        color: #5d4a20;
        font-size: 0.9rem;
        font-weight: 500;
    }

    @media (max-width: 450px) {
        .welcome-visit {
            padding: 1.1rem;
        }

        .registration-facts {
            grid-template-columns: 1fr;
        }
    }
</style>
