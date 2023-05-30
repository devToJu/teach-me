export function stringIsNull(s: string): boolean {
    return s === null || s === undefined
}

export function stringIsEmpty(s: string): boolean {
    return stringIsNull(s) || s === ""
}

export function stringIsBlank(s: string): boolean {
    return stringIsEmpty(s) || s.trim().length <= 0
}