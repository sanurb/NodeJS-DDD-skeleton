import { HttpError, Status } from "@reflet/http";
import { ProblemType } from "./HttpProblemType";

// Only 4xx and 5xx
type ErrorStatus = Status.Error;

/**
 * CustomError class adhering to the Problem Details standard.
 */
export class CustomError extends Error {
  public readonly status: number;
  public readonly detail?: string;
  public readonly instance?: string;
  public readonly type: string;
  public readonly extensions?: Record<string, unknown>;

  /**
   * Constructor for CustomError
   */
  constructor(
    status: ErrorStatus,
    detail?: string,
    instance?: string,
    type?: string,
    extensions: Record<string, unknown> = {},
  ) {
    super((detail || (HttpError as any)[status]?.name) ?? "Unknown Error");
    this.status = status;
    this.detail = detail;
    this.instance = instance;
    this.type = type ?? ProblemType[status] ?? "about:blank";
    this.extensions = { ...extensions };

    // Set the prototype explicitly for extending built-in classes
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Static factory method to create a CustomError without using `new`.
   */
  static create(
    status: ErrorStatus,
    detail?: string,
    instance?: string,
    type?: string,
    extensions: Record<string, unknown> = {},
  ): CustomError {
    return new CustomError(status, detail, instance, type, extensions);
  }

  /**
   * Converts the error object to JSON format following the Problem Details structure.
   */
  toJSON(): Record<string, unknown> {
    const problemDetails: Record<string, unknown> = {
      type: this.type,
      title: this.message,
      status: this.status,
      detail: this.detail || this.message,
      instance: this.instance,
    };
    return {
      ...problemDetails,
      ...(this.extensions && { ...this.extensions }),
    };
  }
}
