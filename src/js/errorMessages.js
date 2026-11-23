export function getErrorMessage(error, t, te, fallbackCode = 'UNKNOWN_ERROR') {
    const backendCodes = [
        error?.response?.data?.exceptionCode,
        error?.response?.data?.code
    ]

    for (const backendCode of backendCodes) {
        if (typeof backendCode !== 'string' || !backendCode.trim()) {
            continue
        }

        const normalizedCode = backendCode.trim()
            .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
            .toUpperCase()
        const codeKey = `errors.${normalizedCode}`
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
