import { verify } from "@node-rs/jsonwebtoken";
import type { FastifyReply, FastifyRequest } from "fastify";

import { Status } from "@reflet/http";
import { CustomError } from "../../../Contexts/Shared/Core/Responses/CustomError";
import { ServiceResponse } from "../../../Contexts/Shared/Core/Responses/ServiceResponse";
import { env } from "../Config/env";

const findTokenOrThrow = (request: FastifyRequest): string => {
  const token = request.headers.authorization?.split(" ").pop();

  if (!token) {
    throw new Error("The access token is required");
  }

  return token;
};

export const AuthMiddleware = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  /**
   * Maximum allowed size for a JWT token (in bytes).
   * The recommended size limit is 8KB.
   * @see https://stackoverflow.com/questions/26033983/what-is-the-maximum-size-of-jwt-token
   */
  const MAX_TOKEN_SIZE = 7 * 1024; // 7KB = 7168 bytes

  try {
    const token = findTokenOrThrow(request);
    const tokenSize = Buffer.byteLength(token, "utf8");

    if (tokenSize > MAX_TOKEN_SIZE) {
      reply
        .code(Status.PayloadTooLarge)
        .send(
          ServiceResponse.failure(
            Status.PayloadTooLarge,
            `JWT token size exceeds the allowed limit of ${MAX_TOKEN_SIZE / 1024}KB`,
            "/problems/token-too-large",
          ).toJSON(),
        );
      return;
    }

    const decoded = await verify(token, env.jwt.privateKey);
    request.userId = decoded.sub;
  } catch (err) {
    const error = err as CustomError;
    reply
      .code(Status.Unauthorized)
      .send(ServiceResponse.failure(Status.Unauthorized, error.message, "/problems/unauthorized").toJSON());
  }
};
