import { Status } from "@reflet/http";

/**
 * Map that associates HTTP status codes with corresponding problem type URIs.
 * This helps to standardize problem responses and provides a clear structure
 * for handling various HTTP errors.
 */
export const ProblemType = {
  [Status.NoContent]: "https://httpstatuses.io/204",
  [Status.BadRequest]: "https://httpstatuses.io/400",
  [Status.Unauthorized]: "https://httpstatuses.io/401",
  [Status.PaymentRequired]: "https://httpstatuses.io/402",
  [Status.Forbidden]: "https://httpstatuses.io/403",
  [Status.NotFound]: "https://httpstatuses.io/404",
  [Status.MethodNotAllowed]: "https://httpstatuses.io/405",
  [Status.NotAcceptable]: "https://httpstatuses.io/406",
  [Status.ProxyAuthenticationRequired]: "https://httpstatuses.io/407",
  [Status.RequestTimeout]: "https://httpstatuses.io/408",
  [Status.Conflict]: "https://httpstatuses.io/409",
  [Status.Gone]: "https://httpstatuses.io/410",
  [Status.LengthRequired]: "https://httpstatuses.io/411",
  [Status.PreconditionFailed]: "https://httpstatuses.io/412",
  [Status.PayloadTooLarge]: "https://httpstatuses.io/413",
  [Status.UriTooLong]: "https://httpstatuses.io/414",
  [Status.UnsupportedMediaType]: "https://httpstatuses.io/415",
  [Status.RequestedRangeNotSatisfiable]: "https://httpstatuses.io/416",
  [Status.ExpectationFailed]: "https://httpstatuses.io/417",
  [Status.ImATeapot]: "https://httpstatuses.io/418",
  [Status.MisdirectedRequest]: "https://httpstatuses.io/421",
  [Status.UnprocessableEntity]: "https://httpstatuses.io/422",
  [Status.Locked]: "https://httpstatuses.io/423",
  [Status.FailedDependency]: "https://httpstatuses.io/424",
  [Status.TooEarly]: "https://httpstatuses.io/425",
  [Status.UpgradeRequired]: "https://httpstatuses.io/426",
  [Status.PreconditionRequired]: "https://httpstatuses.io/428",
  [Status.TooManyRequests]: "https://httpstatuses.io/429",
  [Status.RequestHeaderFieldsTooLarge]: "https://httpstatuses.io/431",
  [Status.UnavailableForLegalReasons]: "https://httpstatuses.io/451",
  [Status.InternalServerError]: "https://httpstatuses.io/500",
  [Status.NotImplemented]: "https://httpstatuses.io/501",
  [Status.BadGateway]: "https://httpstatuses.io/502",
  [Status.ServiceUnavailable]: "https://httpstatuses.io/503",
  [Status.GatewayTimeout]: "https://httpstatuses.io/504",
  [Status.HttpVersionNotSupported]: "https://httpstatuses.io/505",
  [Status.VariantAlsoNegotiates]: "https://httpstatuses.io/506",
  [Status.InsufficientStorage]: "https://httpstatuses.io/507",
  [Status.LoopDetected]: "https://httpstatuses.io/508",
  [Status.NotExtended]: "https://httpstatuses.io/510",
  [Status.NetworkAuthenticationRequired]: "https://httpstatuses.io/511",
} as const;

export type ProblemTypeKey = keyof typeof ProblemType;
export type ProblemTypeValue = (typeof ProblemType)[ProblemTypeKey];
