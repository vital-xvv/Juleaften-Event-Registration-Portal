<script setup>
    import { supportEmail, supportEmailHref } from '@/js/supportContact.js'

    const copyrightYear = new Date().getFullYear()
</script>

<template>
    <footer id="main-footer">
        <div class="footer-content">
            <div class="footer-brand">
                <span class="footer-mark" aria-hidden="true">
                    <i class="fa-solid fa-tree"></i>
                </span>
                <span class="copyright">{{ $t('footer.copyright', { year: copyrightYear, event: $t('event.info.shortName') }) }}</span>
            </div>

            <a v-if="supportEmail" class="support-link" :href="supportEmailHref">
                <span class="support-icon" aria-hidden="true">
                    <i class="fa-solid fa-envelope"></i>
                </span>
                <span class="support-copy">
                    <span class="support-label">{{ $t('footer.supportLabel') }}</span>
                    <strong>{{ supportEmail }}</strong>
                </span>
                <i class="fa-solid fa-arrow-up-right-from-square support-arrow" aria-hidden="true"></i>
            </a>

            <span class="footer-credit">
                <span>{{ $t('footer.creditPrefix') }}</span>
                <a href="https://github.com/vital-xvv/">
                    <i class="fa-brands fa-github" aria-hidden="true"></i>
                    Vital
                </a>
            </span>
        </div>
    </footer>
</template>


<style scoped>
    #main-footer {
        /* position: sticky;
        bottom: 0;
        z-index: 1000; */
        padding: 1.1rem clamp(1rem, 3vw, 2.5rem);
        border-top: 1px solid rgba(229, 180, 84, 0.55);
        background:
            radial-gradient(ellipse at 50% 0, rgba(229, 180, 84, 0.13), transparent 55%),
            linear-gradient(120deg, #12351b, #07290c);
        color: #fff8e9;
        box-shadow: 0 -8px 24px rgba(7, 41, 12, 0.18);
    }

    .footer-content {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        align-items: center;
        gap: 1.25rem;
        width: min(100%, 80rem);
        margin: 0 auto;
    }

    .footer-brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 0;
    }

    .footer-mark {
        display: grid;
        flex: 0 0 2.4rem;
        width: 2.4rem;
        height: 2.4rem;
        place-items: center;
        border: 1px solid rgba(255, 233, 177, 0.35);
        border-radius: 50%;
        background: rgba(255, 248, 233, 0.1);
        color: #f2c65e;
    }

    .copyright {
        color: rgba(255, 248, 233, 0.8);
        font-family: 'Montserrat', sans-serif;
        font-size: 0.72rem;
        line-height: 1.5;
    }

    .support-link {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        max-width: 100%;
        padding: 0.5rem 0.8rem;
        border: 1px solid #fff0ae;
        border-radius: 999px;
        background: linear-gradient(135deg, #fff1ad, #edb943);
        color: #18371f;
        box-shadow: 0 0 0 3px rgba(229, 180, 84, 0.16), 0 5px 16px rgba(0, 0, 0, 0.18);
        text-decoration: none;
        transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;
    }

    .support-link:hover {
        transform: translateY(-2px);
        filter: brightness(1.05);
        box-shadow: 0 0 0 4px rgba(229, 180, 84, 0.22), 0 8px 20px rgba(0, 0, 0, 0.22);
    }

    .support-link:focus-visible,
    .footer-credit a:focus-visible {
        outline: 2px solid #fff1ad;
        outline-offset: 3px;
    }

    .support-icon {
        display: grid;
        flex: 0 0 1.75rem;
        width: 1.75rem;
        height: 1.75rem;
        place-items: center;
        border-radius: 50%;
        background: rgba(7, 41, 12, 0.1);
        color: #a94324;
    }

    .support-copy {
        display: flex;
        flex-direction: column;
        min-width: 0;
        gap: 0.1rem;
    }

    .support-label {
        color: #526047;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.58rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .support-copy strong {
        overflow-wrap: anywhere;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.76rem;
    }

    .support-arrow {
        margin-left: 0.15rem;
        color: #a94324;
        font-size: 0.7rem;
    }

    .footer-credit {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        justify-self: end;
        color: rgba(255, 248, 233, 0.72);
        font-family: 'Montserrat', sans-serif;
        font-size: 0.72rem;
        text-align: right;
    }

    .footer-credit a {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.22rem 0.55rem;
        border: 1px solid rgba(242, 198, 94, 0.45);
        border-radius: 999px;
        background: rgba(255, 248, 233, 0.08);
        color: #f2c65e;
        font-size: 0.66rem;
        font-weight: 700;
        text-decoration: none;
        transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;
    }

    .footer-credit a:hover {
        transform: translateY(-1px);
        border-color: rgba(242, 198, 94, 0.8);
        background: rgba(255, 241, 173, 0.15);
    }

    @media (max-width: 700px) {
        .footer-content {
            grid-template-columns: minmax(0, 1fr);
            justify-items: center;
            gap: 1rem;
        }

        .footer-brand {
            justify-content: center;
            text-align: center;
        }

        .support-link {
            justify-content: center;
            width: auto;
            padding: 0.45rem 0.7rem;
        }

        .support-icon {
            flex-basis: 1.6rem;
            width: 1.6rem;
            height: 1.6rem;
        }

        .support-copy strong {
            font-size: 0.72rem;
        }

        .footer-credit {
            justify-self: center;
            text-align: center;
        }
    }

    @media (max-width: 450px) {
        #main-footer {
            padding: 0.85rem 0.75rem;
        }

        .footer-content {
            gap: 0.5rem
        }

        .support-link {
            padding: 0.5rem;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .support-link,
        .footer-credit a {
            transition: none;
        }
    }
</style>