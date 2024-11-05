/**
 * @module Option
 *
 * Provides an `Option` type for representing values that may or may not exist.
 *
 * This module enables explicit handling of optional values, reducing the reliance on `null` or `undefined`.
 * It encourages developers to consider both the presence and absence of a value, leading to more predictable
 * and maintainable code.
 */
import { type Result, isOk } from "./Result";

/**
 * Represents an optional value: every `Option` is either `Some` and contains a value, or `None`, and does not.
 *
 * @template T The type of the value that might be present.
 */
export type Option<T> = Some<T> | None;

/**
 * Contains a value.
 *
 * @template T The type of the contained value.
 */
interface Some<T> {
  /** Discriminant property for type narrowing. Always `true` for `Some`. */
  readonly isSome: true;
  /** The contained value. */
  readonly value: T;
}

/**
 * Does not contain a value.
 */
interface None {
  /** Discriminant property for type narrowing. Always `false` for `None`. */
  readonly isSome: false;
}

/**
 * Creates a `Some` containing the given value.
 *
 * @template T The type of the value.
 * @param value - The value to wrap in `Some`.
 * @returns A `Some` containing the value.
 */
export const Some = <T>(value: T): Some<T> => ({ isSome: true, value });

/**
 * The singleton instance representing `None`.
 */
export const None: None = { isSome: false };

/**
 * Type guard to check if an `Option` is `Some`.
 *
 * @template T The type of the value.
 * @param option - The `Option` to check.
 * @returns `true` if the `Option` is `Some`, `false` otherwise.
 */
export function isSome<T>(option: Option<T>): option is Some<T> {
  return option.isSome;
}

/**
 * Type guard to check if an `Option` is `None`.
 *
 * @template T The type of the value.
 * @param option - The `Option` to check.
 * @returns `true` if the `Option` is `None`, `false` otherwise.
 */
export function isNone<T>(option: Option<T>): option is None {
  return !option.isSome;
}

/**
 * Converts a `Result` into an `Option`, discarding any error information.
 *
 * This is useful when you're only interested in whether a computation succeeded,
 * not in the specific error that might have occurred.
 *
 * @template T The type of the value.
 * @param result - The `Result` to convert.
 * @returns `Some` if the `Result` is `Ok`, or `None` if it is `Err`.
 */
export function toOption<T>(result: Result<T, unknown>): Option<T> {
  return isOk(result) ? Some(result.value) : None;
}

/**
 * Applies a function to the contained value (if any), mapping it to a new `Option`.
 *
 * Allows for transforming the value inside an `Option` without needing to check for `None`.
 *
 * @template T The original type of the value.
 * @template U The new type of the value after mapping.
 * @param option - The `Option` to map.
 * @param fn - The function to apply to the value.
 * @returns A new `Option` containing the mapped value, or `None` if the original `Option` was `None`.
 *
 * @example
 * ```typescript
 * const opt = Some(5);
 * const mapped = mapOption(opt, x => x * 2); // Some(10)
 * ```
 */
export function mapOption<T, U>(option: Option<T>, fn: (value: T) => U): Option<U> {
  return isSome(option) ? Some(fn(option.value)) : None;
}

/**
 * Applies a function that returns an `Option` to the contained value (if any), and flattens the result.
 *
 * Useful for chaining operations that may return an `Option`, without nesting.
 *
 * @template T The original type of the value.
 * @template U The new type after chaining.
 * @param option - The `Option` to chain.
 * @param fn - The function to apply, which returns an `Option`.
 * @returns The result of applying `fn` to the value, or `None` if the original `Option` was `None`.
 *
 * @example
 * ```typescript
 * const opt = Some(5);
 * const chained = chainOption(opt, x => x > 0 ? Some(x * 2) : None); // Some(10)
 * ```
 */
export function chainOption<T, U>(option: Option<T>, fn: (value: T) => Option<U>): Option<U> {
  return isSome(option) ? fn(option.value) : None;
}

/**
 * Unwraps an `Option`, returning the contained value or a default.
 *
 * Provides a way to handle `None` by specifying a default value.
 *
 * @template T The type of the value.
 * @param option - The `Option` to unwrap.
 * @param defaultValue - The value to return if the `Option` is `None`.
 * @returns The contained value if `Some`, or `defaultValue` if `None`.
 *
 * @example
 * ```typescript
 * const opt = None;
 * const value = unwrapOrOption(opt, 0); // 0
 * ```
 */
export function unwrapOrOption<T>(option: Option<T>, defaultValue: T): T {
  return isSome(option) ? option.value : defaultValue;
}
