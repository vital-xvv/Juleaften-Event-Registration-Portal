export const supportEmail = (import.meta.env.VITE_EMAIL_SUPPORT || '')
    .trim()
    .replace(/^mailto:/i, '')

export const supportEmailHref = supportEmail ? `mailto:${supportEmail}` : ''
