<script setup>
    import InfoCard from './cards/BenefitCard.vue'
    import PresentationCard from './cards/PresentationCard.vue'
    import CountBar from "./interactive/CountBar.vue"
    import WaitlistCard from "./cards/WaitlistCard.vue"
</script>


<template>
    <div class="container registration-container">
        <PresentationCard/>
        <form class="container flex-column pd1 form">
            <div class="header-counter">
                <span id="counter-name" class="signature f075">FireSide Attendance</span>
                <span class="spots-counter" aria-label="18 spots available">
                    <span aria-hidden="true"><img class="svg" src="@/assets/fire.svg" width="24" height="24"/></span>
                    <strong>18</strong>
                    <span>spots available</span>
                </span>
            </div>
            <h1>Reserve your spot</h1>
            <p class="text">Space is warmly limited to ensure an authentic, unhurried fireside circle for all neighbors.</p>
            <CountBar/>
            <WaitlistCard/>
            <button class="button google"><img class="svg" src="@/assets/google-icon.svg" alt="Google" width="24" height="24"/>Continue with Google</button>
            
            <div class="form-divider" aria-hidden="true">or fill details manually</div>
            
        
            <div class="form-field">
                <div class="input-title">
                    <label class="input-label" for="firstName">First Name</label>
                    <span class="input-note">Primary Guest Name</span>
                </div>
                <input class="input" type="text" id="firstName" name="firstName" placeholder="Eleanor" required />
            </div>
            <div class="form-field">
                <div class="input-title">
                    <label class="input-label" for="lastName">Last Name</label>
                    <span class="input-note">Primary Guest Lastname</span>
                </div>
                <input class="input" type="text" id="lastName" name="lastName" placeholder="Vance" required />
            </div>
            <div class="form-field">
                <div class="input-title">
                    <label class="input-label" for="email">Email</label>
                    <span class="input-note">For confirmations & directions</span>
                </div>
                <input class="input" type="email" id="email" name="email" placeholder="eleanor.vance@example.com" required />
            </div>
            <div class="form-field">
                <div class="input-title">
                    <label class="input-label" for="comment">Note</label>
                    <span class="input-note">Optional</span>
                </div>
                <textarea class="textarea" id="comment" name="comment" maxlength="250" placeholder="e.g.,I will come a little later, so don't worry if you don't find me from the start..."></textarea>
            </div>
            
            <button class="register-button" type="submit">Register for the Gathering</button>
            <span class="signature f05 help">Questions or accessibility requests? Reach our parlor steward at <a class="mail-help" href="mailto:hello@evergreenyuletide.org">hello@evergreenyuletide.org</a></span>
        </form>

        
    </div>
</template>




<style scoped>

    .form {
        justify-content: flex-start;
        padding: 2rem;
    }

    #counter-name {
        color: red;
    }

    h1, h2 {
        color: var(--dark-primary-color);
    }

    .header-counter {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .spots-counter {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.2rem 2rem;
        border: 1px solid #f1b6b6;
        border-radius: 999px;
        background: #fff0f0;
        color: #a52a2a;
        font-size: 0.875rem;
        font-weight: 600;
        white-space: nowrap;
    }

    .spots-counter strong {
        font-size: 1rem;
    }

    .help {
        text-align: center;
        align-self: flex-end;
    }

    .mail-help {
        color: var(--secondary-red);
    }

    .registration-container {
        position: relative;
        box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.10),
                0 2px 6px -4px rgba(0, 0, 0, 0.06);
    }

    .registration-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
        border-radius: 12px 12px 0 0;
        pointer-events: none;
        background: linear-gradient(
            to right,
            var(--chr-primary, var(--primary-color)),
            red 50%,
            var(--chr-primary, var(--primary-color))
        );
    }

    @media screen and (max-width: 425px) {
        .registration-container {
            flex-direction: column;
            max-width: 300px;
        }
    }

    form.container {
        gap: 1rem;
    }

    .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .input-field {
        display: flex;
        flex-direction: column;
    }

    .input-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .input-label {
        font-family: 'Montserrat', sans-serif;
        color: var(--dark-primary-color);
        font-weight: 500;
        font-size: 0.75rem;
        text-transform: capitalize;
    }

    .input-note {
        font-family: 'Literata', serif;
        color: var(--dark-primary-color);
        font-weight: 300;
        font-size: 0.6rem;
        text-transform: capitalize;
    }

    .input, .textarea {
        font-family: 'Montserrat', sans-serif;
        background-color: white;
        color: var(--dark-primary-color);
        border-radius: 8px;
        font-size: 1rem;
        padding: 0.75rem;
        border: none;
        box-shadow: 2px 2px 3px rgba(30, 63, 32, 0.08);
    }

    .textarea {
        resize: none;
        min-height: 125px;
    }

    .form-divider {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #777;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .form-divider::before,
    .form-divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: #ddd;
    }

    label {
        font-weight: bold;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    textarea {
        min-height: 5rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }

    button {
        justify-content: center;
        gap: 2rem;
        height: 2.5rem;
    }

    .register-button {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        min-height: 3.25rem;
        padding: 0.8rem 1.25rem;
        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: 10px;
        background: linear-gradient(110deg, #a52a2a, #d44c35 45%, #a52a2a);
        color: #fff;
        font: 700 0.95rem 'Montserrat', sans-serif;
        letter-spacing: 0.02em;
        cursor: pointer;
        box-shadow: 0 5px 12px rgba(165, 42, 42, 0.25);
        transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
    }

    .register-button::before {
        content: '';
        position: absolute;
        z-index: -1;
        inset: -60% -30%;
        background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, 0.8) 48%, #ffe56b 52%, #ff8bd1 57%, #8deaff 62%, transparent 70%);
        transform: translateX(-100%) rotate(8deg);
        transition: transform 650ms ease;
    }

    .register-button:hover::before,
    .register-button:focus-visible::before {
        transform: translateX(100%) rotate(8deg);
    }

    .register-button:hover {
        transform: translateY(-2px);
        filter: brightness(1.08);
        box-shadow: 0 8px 20px rgba(165, 42, 42, 0.35), 0 0 14px rgba(255, 151, 196, 0.35);
    }

    .register-button:focus-visible {
        outline: 3px solid #f4a261;
        outline-offset: 3px;
    }

    .register-button:active {
        transform: translateY(1px) scale(0.985);
        filter: brightness(0.95);
        box-shadow: 0 2px 6px rgba(165, 42, 42, 0.28);
    }

    @media (prefers-reduced-motion: reduce) {
        .register-button,
        .register-button::before {
            transition: none;
        }
    }

    p {
        white-space: normal;
        overflow-wrap: wrap;
    }

    span, strong {
        background-color: inherit;
    }
</style>