import { FastifyReply, FastifyRequest } from "fastify";
import { HookHandlerDoneFunction } from "fastify/types/hooks";

import { type BaseController } from "../../../../Apps/Shared";
import { Class, NewableClass } from "../../Domain";

const AllowedHttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  OPTIONS: "OPTIONS",
} as const;

type HttpMethod = keyof typeof AllowedHttpMethods;

type ControllerMiddleware = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => Promise<void> | void;

export interface ControllerArgs {
  method: HttpMethod;
  path: string;
  middlewares?: ControllerMiddleware[];
  schema?: Record<string, unknown>;
}

interface ControllerProps extends ControllerArgs {
  target: NewableClass<BaseController>;
}

export const controllers: ControllerProps[] = [];

export const isController = (props?: ControllerArgs): Class<BaseController> => {
  return (target: Class<BaseController>): Class<BaseController> => {
    if (props) {
      controllers.push({ ...props, target: target as NewableClass<BaseController> });
    }

    return target;
  };
};
