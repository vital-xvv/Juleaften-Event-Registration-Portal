export function getErrorMessage(error, t, te, fallbackCode = 'UNKNOWN_ERROR') {
    const backendCode = error?.response?.data?.code

    if (typeof backendCode === 'string' && backendCode.trim()) {
        const codeKey = `errors.${backendCode.trim().toUpperCase()}`
        if (te(codeKey)) {
            return t(codeKey)
        }
    }

    if (!error?.response) {
        return t('errors.NETWORK_ERROR')
    }

    const fallbackKey = `errors.${fallbackCode}`
    return te(fallbackKey) ? t(fallbackKey) : t('errors.UNKNOWN_ERROR')
}
