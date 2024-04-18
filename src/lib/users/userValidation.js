const REGEX = {
    USERNAME: /^[a-z0-9]+$/,
    START_WITH_NUMBER: /^[0-9]/,
    NAME: /^[a-záéíóúü\s-]+$/i,
    DASH: /( -|- |^-|-$)/,
    SPACES: /\s{2}/,
    DOUBLE_DASH: /-{2}/
}

export const validateUsername = (username) => {
    if (username.length === 0) return;
    if (!REGEX.USERNAME.test(username))
    return 'Sólo minúsculas y números'
    if (REGEX.START_WITH_NUMBER.test(username))
    return 'No puede comenzar por número'
    if (username.length < 6 || username.length > 15)
    return 'Longitud entre 6 y 15'
}

export const validateName = (name) => {
    if (name.length === 0) return;
    if (!REGEX.NAME.test(name)) // Validación *****
    return "Sólo letras, espacios y guiones"
    if (REGEX.DASH.test(name))
    return "Sólo guiones en medio de palabras"
    if (REGEX.DOUBLE_DASH.test(name))
    return "Sólo un guión a la vez"
    if (REGEX.SPACES.test(name))
    return "No puede haber más de un espacio"
    if (name.length < 2 || name.length > 30)
    return 'Longitud entre 2 y 30'
}