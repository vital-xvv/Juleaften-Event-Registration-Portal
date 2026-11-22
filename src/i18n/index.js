import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import ua from './locales/ua.json'

const savedLocale = localStorage.getItem('locale')

const supportedLocales = ['en', 'ua']

const initialLocale = supportedLocales.includes(savedLocale) ? savedLocale: 'ua'

const i18n = createI18n({
    legacy: false,

    locale: initialLocale,
    fallbackLocale: 'ua',

    messages: {
        en,
        ua
    }
})

// Keep the selected language after refreshing the page
i18n.global.locale.value = initialLocale

export default i18n;