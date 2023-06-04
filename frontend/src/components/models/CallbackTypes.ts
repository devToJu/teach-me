/**
 * Function of () => void
 */
export type Run = () => void

/**
 * Function of (T) => void
 * @param A value of type T
 */
export type Consumer<T> = (param: T) => void