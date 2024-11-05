/**
 * @module Result
 *
 * Provides a `Result` type for handling operations that may succeed (`Ok`) or fail (`Err`).
 *
 * This module encourages explicit and predictable error handling by representing outcomes as values,
 * avoiding the need for exceptions. It promotes handling both success and error cases,
 * leading to more robust and maintainable code.
 *
 * The `Result` type is inspired by functional programming concepts and languages like Rust,
 * adapted to leverage TypeScript's type system and control flow analysis.
 */

export type Result<T, E> = Ok<T> | Err<E>;

/**
 * Represents a successful result.
 *
 * @template T The type of the successful value.
 */
export interface Ok<T> {
  /** Discriminant property for type narrowing. Always `true` for `Ok`. */
  readonly isOk: true;
  /** The successful value. */
  readonly value: T;
}

/**
 * Represents a failed result.
 *
 * @template E The type of the error value.
 */
export interface Err<E> {
  /** Discriminant property for type narrowing. Always `false` for `Err`. */
  readonly isOk: false;
  /** The error value. */
  readonly error: E;
}

/**
 * Creates a successful `Result` with the given value.
 *
 * @template T The type of the successful value.
 * @param value - The value to wrap in an `Ok`.
 * @returns An `Ok` containing the given value.
 */
export const Ok = <T>(value: T): Ok<T> => ({ isOk: true, value });

/**
 * Creates a failed `Result` with the given error.
 *
 * @template E The type of the error value.
 * @param error - The error to wrap in an `Err`.
 * @returns An `Err` containing the given error.
 */
export const Err = <E>(error: E): Err<E> => ({ isOk: false, error });

/**
 * Type guard function to check if a `Result` is an `Ok`.
 *
 * @template T The success type.
 * @template E The error type.
 * @param result - The `Result` to check.
 * @returns `true` if the `Result` is an `Ok`, `false` otherwise.
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.isOk;
}

/**
 * Type guard function to check if a `Result` is an `Err`.
 *
 * @template T The success type.
 * @template E The error type.
 * @param result - The `Result` to check.
 * @returns `true` if the `Result` is an `Err`, `false` otherwise.
 */
export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return !result.isOk;
}

/**
 * Transforms the successful value of a `Result` using a mapping function.
 *
 * This allows you to apply a function to the `Ok` value while leaving any `Err` untouched,
 * facilitating operations on the success case without affecting error handling.
 *
 * @template T The original success type.
 * @template U The new success type after mapping.
 * @template E The error type.
 * @param result - The `Result` to map.
 * @param fn - The function to apply to the `Ok` value.
 * @returns A new `Result` with the mapped value if the original was `Ok`, or the original `Err`.
 */
export function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
  return isOk(result) ? Ok(fn(result.value)) : result;
}

/**
 * Transforms the error value of a `Result` using a mapping function.
 *
 * Useful for normalizing or transforming errors without altering successful outcomes.
 *
 * @template T The success type.
 * @template E The original error type.
 * @template F The new error type after mapping.
 * @param result - The `Result` to map.
 * @param fn - The function to apply to the `Err` value.
 * @returns A new `Result` with the mapped error if the original was `Err`, or the original `Ok`.
 */
export function mapErr<T, E, F>(result: Result<T, E>, fn: (error: E) => F): Result<T, F> {
  return isErr(result) ? Err(fn(result.error)) : result;
}

/**
 * Chains together operations that may fail, propagating any errors.
 *
 * This function allows sequencing of dependent operations, where each may fail,
 * without nesting callbacks or using exceptions.
 *
 * @template T The original success type.
 * @template U The success type of the next operation.
 * @template E The error type.
 * @param result - The initial `Result`.
 * @param fn - A function that takes the successful value and returns a new `Result`.
 * @returns The result of applying `fn` to the `Ok` value, or the original `Err`.
 */
export function chain<T, U, E>(result: Result<T, E>, fn: (value: T) => Result<U, E>): Result<U, E> {
  return isOk(result) ? fn(result.value) : result;
}

/**
 * Chains error-handling operations, allowing for recovery or transformation.
 *
 * Enables handling of errors by returning a new `Result`, potentially recovering from failure.
 *
 * @template T The success type.
 * @template E The original error type.
 * @template F The new error type after chaining.
 * @param result - The initial `Result`.
 * @param fn - A function that takes the error and returns a new `Result`.
 * @returns The result of applying `fn` to the `Err` value, or the original `Ok`.
 */
export function chainErr<T, E, F>(result: Result<T, E>, fn: (error: E) => Result<T, F>): Result<T, F> {
  return isErr(result) ? fn(result.error) : result;
}

/**
 * Maps both the `Ok` and `Err` values of a `Result`.
 *
 * Useful when you need to transform both success and error outcomes,
 * such as formatting messages or converting types.
 *
 * @template T The original success type.
 * @template U The new success type after mapping.
 * @template E The original error type.
 * @template F The new error type after mapping.
 * @param result - The `Result` to map.
 * @param onOk - The function to apply to the `Ok` value.
 * @param onErr - The function to apply to the `Err` value.
 * @returns A new `Result` with both success and error values potentially transformed.
 */
export function bimap<T, U, E, F>(result: Result<T, E>, onOk: (value: T) => U, onErr: (error: E) => F): Result<U, F> {
  return isOk(result) ? Ok(onOk(result.value)) : Err(onErr(result.error));
}

/**
 * Folds a `Result` into a single value by applying a function to the `Ok` or `Err`.
 *
 * This function reduces the `Result` to a value of a different type, enabling consolidation
 * of success and error handling into a single outcome.
 *
 * @template T The success type.
 * @template E The error type.
 * @template U The result type after folding.
 * @param result - The `Result` to fold.
 * @param onOk - The function to apply if the `Result` is `Ok`.
 * @param onErr - The function to apply if the `Result` is `Err`.
 * @returns The result of applying the appropriate function to the `Result`.
 */
export function fold<T, E, U>(result: Result<T, E>, onOk: (value: T) => U, onErr: (error: E) => U): U {
  return isOk(result) ? onOk(result.value) : onErr(result.error);
}

/**
 * Unwraps a `Result`, yielding the contained `Ok` value or a default.
 *
 * Provides a way to extract the success value with a fallback, simplifying code that can proceed
 * with a default in case of failure.
 *
 * @template T The success type.
 * @template E The error type.
 * @param result - The `Result` to unwrap.
 * @param defaultValue - The value to return if the `Result` is an `Err`.
 * @returns The `Ok` value or the `defaultValue` if the `Result` is an `Err`.
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  return isOk(result) ? result.value : defaultValue;
}

/**
 * Matches a `Result` against handlers for `Ok` and `Err`, executing the corresponding function.
 *
 * This provides a clear and expressive way to handle both cases of a `Result`,
 * akin to pattern matching in functional programming languages.
 *
 * @template T The success type.
 * @template E The error type.
 * @template U The result type after matching.
 * @param result - The `Result` to match.
 * @param patterns - An object with `Ok` and `Err` functions to handle each case.
 * @returns The result of applying the appropriate function to the `Result`.
 */
export function match<T, E, U>(result: Result<T, E>, patterns: { Ok: (value: T) => U; Err: (error: E) => U }): U {
  return isOk(result) ? patterns.Ok(result.value) : patterns.Err(result.error);
}

/**
 * Represents an asynchronous `Result`, i.e., a `Result` wrapped in a `Promise`.
 *
 * This is useful for asynchronous operations that may succeed or fail,
 * allowing for consistent error handling in async contexts.
 *
 * @template T The success type.
 * @template E The error type.
 */
export type AsyncResult<T, E> = Promise<Result<T, E>>;

/**
 * Asynchronously maps the successful value of an `AsyncResult` using a mapping function.
 *
 * Facilitates the transformation of the `Ok` value in an async `Result` chain,
 * while preserving error propagation.
 *
 * @template T The original success type.
 * @template U The new success type after mapping.
 * @template E The error type.
 * @param result - The `AsyncResult` to map.
 * @param fn - An asynchronous function to apply to the `Ok` value.
 * @returns A new `AsyncResult` with the mapped value if the original was `Ok`, or the original `Err`.
 */
export async function mapAsync<T, U, E>(
  result: AsyncResult<T, E>,
  fn: (value: T) => U | Promise<U>,
): AsyncResult<U, E> {
  const res = await result;
  return isOk(res) ? Ok(await fn(res.value)) : res;
}

/**
 * Asynchronously chains together operations that may fail, propagating any errors.
 *
 * Allows for sequential asynchronous operations where each step depends on the previous,
 * without the complexity of nested promises or try/catch blocks.
 *
 * @template T The original success type.
 * @template U The success type of the next operation.
 * @template E The error type.
 * @param result - The initial `AsyncResult`.
 * @param fn - A function that takes the successful value and returns a new `AsyncResult`.
 * @returns The result of applying `fn` to the `Ok` value, or the original `Err`.
 */
export async function chainAsync<T, U, E>(
  result: AsyncResult<T, E>,
  fn: (value: T) => AsyncResult<U, E>,
): AsyncResult<U, E> {
  const res = await result;
  return isOk(res) ? fn(res.value) : res;
}
