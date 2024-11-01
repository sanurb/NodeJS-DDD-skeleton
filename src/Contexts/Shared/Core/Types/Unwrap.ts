/**
 * @module Unwrap
 *
 * Provides utilities for unwrapping `Result` and `AsyncResult` types.
 *
 * These functions facilitate error propagation by allowing early exits from functions when encountering errors,
 * simulating the behavior of the `?` operator found in languages like Rust.
 *
 * Use these utilities to streamline error handling in synchronous and asynchronous code,
 * while maintaining explicit control flow and avoiding unintentional exceptions.
 */

import { type Result, AsyncResult, Err, Ok } from './Result';

/**
 * Unwraps a `Result`, returning the contained `Ok` value or throwing an `UnwrapError`.
 *
 * This function is useful for reducing boilerplate when you want to propagate errors upwards,
 * similar to the `?` operator in Rust. It allows functions to return early when a `Result` is an `Err`,
 * by throwing an internal exception that can be caught and converted back into a `Result`.
 *
 * **Note:** Use `unwrap` within a `tryResult` function or an equivalent error boundary to handle the potential `UnwrapError`.
 * Avoid letting `UnwrapError` escape into higher levels of your application to prevent unintended crashes.
 *
 * @template T - The type of the successful value.
 * @template E - The type of the error.
 * @param result - The `Result` to unwrap.
 * @throws {UnwrapError<E>} If the `Result` is an `Err`.
 * @returns The contained `Ok` value.
 *
 * @example
 * ```typescript
 * function computeValue(): Result<number, string> {
 *   return tryResult(() => {
 *     const result = someOperation();
 *     const value = unwrap(result); // Throws if result is Err
 *     return Ok(value + 1);
 *   });
 * }
 * ```
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.isOk) {
    return result.value;
  }
  throw new UnwrapError(result.error);
}

/**
 * Internal error used by `unwrap` and `unwrapAsync` to signal an early return.
 *
 * This error is intended to be caught internally and converted back into a `Result`.
 * It should not be exposed outside of the module using `tryResult` or similar functions.
 *
 * **Important:** Do not catch `UnwrapError` in higher-level code; it is meant for internal control flow.
 *
 * @template E - The type of the error.
 */
class UnwrapError<E> extends Error {
  /** The error value contained in the original `Err`. */
  public readonly error: E;

  constructor(error: E) {
    super('UnwrapError');
    this.error = error;
  }
}

/**
 * Asynchronously unwraps an `AsyncResult`, returning the contained `Ok` value or throwing an `UnwrapError`.
 *
 * Similar to `unwrap`, but works with asynchronous `Result` values.
 *
 * **Note:** Use `unwrapAsync` within a `tryAsyncResult` function to handle the potential `UnwrapError`.
 * This pattern allows for cleaner asynchronous code by avoiding nested `if` checks for each operation.
 *
 * @template T - The type of the successful value.
 * @template E - The type of the error.
 * @param result - The `AsyncResult` to unwrap.
 * @throws {UnwrapError<E>} If the `AsyncResult` resolves to an `Err`.
 * @returns A promise that resolves to the contained `Ok` value.
 *
 * @example
 * ```typescript
 * async function fetchData(): AsyncResult<Data, Error> {
 *   return await tryAsyncResult(async () => {
 *     const result = await someAsyncOperation();
 *     const data = await unwrapAsync(result); // Throws if result is Err
 *     return processData(data);
 *   });
 * }
 * ```
 */
export async function unwrapAsync<T, E>(result: AsyncResult<T, E>): Promise<T> {
  const res = await result;
  if (res.isOk) {
    return res.value;
  }
  throw new UnwrapError(res.error);
}

/**
 * Executes an asynchronous function and captures any `UnwrapError`, converting it back into an `AsyncResult`.
 *
 * This function allows you to write asynchronous code that uses `unwrapAsync` for early returns on errors,
 * while still returning an `AsyncResult` to the caller. It helps maintain predictable control flow in async operations.
 *
 * **Note:** Any other errors thrown inside `fn` will propagate normally unless caught elsewhere.
 *
 * @template T - The type of the successful value.
 * @template E - The type of the error.
 * @param fn - An asynchronous function that may throw `UnwrapError<E>`.
 * @returns An `AsyncResult` containing the `Ok` value returned by `fn`, or the `Err` value from an `UnwrapError`.
 *
 * @example
 * ```typescript
 * async function processData(): AsyncResult<ResultType, Error> {
 *   return await tryAsyncResult(async () => {
 *     const data = await unwrapAsync(fetchData());
 *     // Additional processing...
 *     return data;
 *   });
 * }
 * ```
 */
export async function tryAsyncResult<T, E>(fn: () => Promise<T>): AsyncResult<T, E> {
  try {
    const value = await fn();
    return Ok(value);
  } catch (e) {
    if (e instanceof UnwrapError) {
      return Err(e.error);
    }
    throw e;
  }
}
