import { Status } from "@reflet/http";
import type { JsonObject, JsonValue, ReadonlyDeep } from "type-fest";
import { CustomError } from "./CustomError";

/**
 * Custom type that handles both `null` and `undefined` properly,
 * while maintaining deep immutability for other types.
 */
type DeepReadonlyNullable<T> = T extends object ? ReadonlyDeep<T> | null | undefined : T;

/**
 * Utility function to deeply freeze an object, making it immutable at all nested levels.
 */
function deepFreeze<T>(obj: T): DeepReadonlyNullable<T> {
  if (obj === null || obj === undefined) {
    return obj as DeepReadonlyNullable<T>;
  }

  if (typeof obj !== "object" || Object.isFrozen(obj)) {
    return obj as DeepReadonlyNullable<T>;
  }

  for (const prop of Object.keys(obj)) {
    const value = (obj as Record<string, unknown>)[prop];
    if (typeof value === "object" && value !== null) {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj) as DeepReadonlyNullable<T>;
}

/**
 * ServiceResponse class for encapsulating success and error responses.
 */
export class ServiceResponse<T extends JsonValue> {
  readonly data?: DeepReadonlyNullable<T>;
  readonly meta?: DeepReadonlyNullable<JsonObject>;
  readonly error?: CustomError;

  private constructor(params: { data?: T; meta?: JsonObject; error?: CustomError }) {
    this.data = params.data !== undefined ? deepFreeze(params.data) : undefined;
    this.meta = params.meta !== undefined ? deepFreeze(params.meta) : undefined;
    this.error = params.error;

    // Freeze the entire instance to ensure immutability
    Object.freeze(this);
  }

  /**
   * Static factory for creating a successful response.
   */
  static success<T extends JsonValue>(data: T, meta?: JsonObject): ServiceResponse<T> {
    return new ServiceResponse<T>({ data, meta });
  }

  /**
   * Static factory for creating an error response based on CustomError.
   */
  static failure(
    status: Status.Error,
    detail?: string,
    instance?: string,
    type?: string,
    extensions: Record<string, unknown> = {},
  ): ServiceResponse<null> {
    const error = CustomError.create(status, detail, instance, type, extensions);
    return new ServiceResponse<null>({ error });
  }

  /**
   * Converts the ServiceResponse into a JSON object,
   * handling both success and error cases.
   */
  toJSON(): Record<string, unknown> {
    if (this.error) {
      return this.error.toJSON();
    }
    return {
      data: this.data,
      ...(this.meta && { meta: this.meta }),
    };
  }
}
