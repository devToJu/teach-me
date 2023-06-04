/**
 * Function of () => void
 */
export type Run = () => void

/**
 * Function of (T) => void
 * @param A value of type T
 */
export type Consumer<T> = (param: T) => void

/**
 * Function of () => T
 * @return A value of type T
 */
export type Supplier<T> = () => T
