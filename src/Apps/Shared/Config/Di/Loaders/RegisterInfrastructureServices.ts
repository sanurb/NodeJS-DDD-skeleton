import { MongoClient } from "mongodb";

import { SessionMongoDbClient } from "../../MongoDbConfig";
import { env } from "../../env";
import { Container } from "../DiContainer";

export const registerInfrastructureServices = (container: Container): void => {
  // Mongo
  container
    .register(SessionMongoDbClient)
    .useFactory(() => {
      return new MongoClient(env.mongo.mongoUri);
    })
    .asSingleton();
};
