
<div align = "center">

<h1><a href="https://github.com/sanurb/NodeJS-DDD-skeleton">NodeJS-DDD-skeleton</a></h1>

<a href="https://github.com/sanurb/NodeJS-DDD-skeleton/blob/main/LICENSE">
<img alt="License" src="https://img.shields.io/github/license/sanurb/NodeJS-DDD-skeleton?style=flat&color=eee&label="> </a>

<a href="https://github.com/sanurb/NodeJS-DDD-skeleton/graphs/contributors">
<img alt="People" src="https://img.shields.io/github/contributors/sanurb/NodeJS-DDD-skeleton?style=flat&color=ffaaf2&label=People"> </a>

<a href="https://github.com/sanurb/NodeJS-DDD-skeleton/stargazers">
<img alt="Stars" src="https://img.shields.io/github/stars/sanurb/NodeJS-DDD-skeleton?style=flat&color=98c379&label=Stars"></a>

<a href="https://github.com/sanurb/NodeJS-DDD-skeleton/network/members">
<img alt="Forks" src="https://img.shields.io/github/forks/sanurb/NodeJS-DDD-skeleton?style=flat&color=66a8e0&label=Forks"> </a>

<a href="https://github.com/sanurb/NodeJS-DDD-skeleton/watchers">
<img alt="Watches" src="https://img.shields.io/github/watchers/sanurb/NodeJS-DDD-skeleton?style=flat&color=f5d08b&label=Watches"> </a>

<a href="https://github.com/sanurb/NodeJS-DDD-skeleton/pulse">
<img alt="Last Updated" src="https://img.shields.io/github/last-commit/sanurb/NodeJS-DDD-skeleton?style=flat&color=e06c75&label="> </a>

<h3>Short Sweet Headline</h3>

<figure>
  <img src="./assets/screenshot.png" alt="NodeJS-DDD-skeleton in action">
  <br/>
</figure>

</div>

This project serves as a robust starting point for building scalable and
maintainable Node.js applications, adhering to **Domain-Driven Design (DDD)** principles
and **Hexagonal Architecture**. It leverages modern tools and patterns
to ensure clear separation of concerns, testability, and extensibility.

- [✨ Features](#features)
- [🛠️ Project Structure](#🛠️-project-structure)
- [🛠 Running the Project](#🛠-running-the-project)
  - [Requirements](#requirements)
  - [Setup](#setup)
- [🧪 Testing](#🧪-testing)
  - [Builder Pattern Example](#builder-pattern-example)
- [🔗 Dependency Injection](#🔗-dependency-injection)
  - [Overview](#overview)
    - [Example: Use Case Registration](#example-use-case-registration)
    - [Automatic Registration](#automatic-registration)
- [🛣️ Routes](#🛣️-routes)
  - [Example: Defining a Route](#example-defining-a-route)
<!--toc:end-->

## ✨ Features

- 📁 **Modular Structure**: Organized by feature and bounded contexts for easy navigation and scalability.

- 🌐 Stable Node Environment: Latest LTS Node version in `.nvmrc`

- 💨 **Rapid TypeScript Compilation**: Uses **SWC** for fast TypeScript compilation and **tsx** for quick script execution.

- 🔧 **Environment Management**: Configured with **dotenv** for loading and managing environment variables securely and efficiently.

- 🔗 **Dependency Injection**: Powered by [**DIOD**](https://github.com/artberri/diod), a lightweight and strongly-typed dependency injection library for TypeScript.

- 🔒 **Security**: Configured with **Helmet** for HTTP header protection and **@fastify/cors** for CORS.

- 📊 **Logging**: Integrated with **pino-http**, a high-performance logging library.

- 🧪 **Comprehensive Testing**:
  - **Unit Tests**: Managed with **Jest**, including mocking support with **jest-mock-extended**.
  - **Integration Tests**: Implemented with **Supertest** for end-to-end HTTP testing.
  - **Behavior-Driven Development**: Supported via **Cucumber.js** for writing and automating high-level feature tests.

- 🔄 **Code Quality Assurance**:
  - **Husky**: Ensures pre-commit checks with hooks.
  - **Lint-Staged**: Automatically formats and fixes staged files.
  - [**Biome.js**](https://github.com/biomejs/biome): Unified tool for linting, formatting, and type-checking.

- 📃 **TypeScript Utilities**: Implements reusable value object abstractions (e.g., `UuidValueObject`, `StringValueObject`)
for strong typing in the domain layer. type-fest for utilities types.

- 🐳 **Docker Support**: Ready for containerization with pre-configured Docker and Docker Compose files for streamlined deployment.

- ⚙️ **High-Performance Framework**: Built on **Fastify**, known for its lightweight, fast, and plugin-based architecture.

- 📝 **Mocking and Testing Utilities**: Includes **@faker-js/faker** for generating fake data during tests and development.

## 🛠️ Project Structure

```bash
src/
├── Apps                  // Entrypoints for the application. Handles web server setup, routes, and middleware.
│   ├── App.ts            // Main entry point for bootstrapping the application.
│   ├── Core              // Core logic for app-specific functionalities, such as controllers.
│   │   └── Controllers
│   │       └── Dummy     // Example controllers for demonstration or testing purposes.
│   ├── FastifyServer.ts  // Fastify configuration and server instantiation.
│   ├── Shared            // Shared components and utilities across all applications.
│   │   ├── Config
│   │   │   ├── Di        // Dependency Injection container configuration.
│   │   │   ├── MongoDbConfig.ts // MongoDB connection configuration and setup.
│   │   │   ├── Routes    // Routes definitions for Fastify.
│   │   │   └── env.ts    // Environment variables loader and validation.
│   │   ├── Controllers
│   │   │   └── BaseController.ts // Base class for all controllers with reusable methods.
│   │   ├── Middlewares
│   │   │   └── AuthMiddleware.ts // Authentication middleware.
│   │   └── index.ts      // Entry point for shared app-level utilities.
│   └── types             // Type definitions for TypeScript.
│       └── global
│           └── index.d.ts // Global TypeScript type declarations.
├── Contexts              // Business logic grouped by domain contexts (DDD bounded contexts).
│   ├── Core              // Core domain or context-specific logic.
│   │   └── Dummy         // Example bounded context for demonstration.
│   │       ├── Application
│   │       ├── Domain
│   │       └── Infrastructure
│   └── Shared            // Shared kernel for reusable domain logic, types, and utilities.
│       ├── Core
│       │   ├── Responses // Standardized response format classes.
│       │   └── Types     // Shared types and interfaces.
│       ├── Domain
│       │   ├── Aggregate // Aggregate root classes for domain objects.
│       │   ├── Bus       // Interfaces and contracts for Event Bus, Command Bus, etc.
│       │   ├── Decorators // Domain-level decorators for behavior injection.
│       │   ├── Exceptions // Custom exceptions and error handling.
│       │   ├── Utils      // Utility classes for the domain layer.
│       │   ├── ValueObject // Reusable value object implementations (e.g., UUID, String).
│       │   └── index.ts   // Entry point for shared domain utilities.
│       └── Infrastructure
│           ├── Bus        // Infrastructure implementation of buses (e.g., Event Bus).
│           ├── Decorators // Infrastructure-level decorators (e.g., controller decorators).
│           ├── Persistence // Database access implementations.
│           └── index.ts   // Entry point for shared infrastructure utilities.
```

## 🛠 Running the Project

### Requirements

- **Node.js**: Version 18 or higher.
- **pnpm**: Preferred for dependency management.

### Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the server in development mode:

   ```bash
   pnpm dev
   ```

3. For production mode:

   ```bash
   pnpm start
   ```

4. Create a local environment file (cp .env .env.test) if you want to modify any parameter

---

## 🧪 Testing

Testing is divided into three categories: **unit**, **integration**, and **e2e**, following the **Builder Pattern** to create test entities.

- **Unit Tests**:
  Focus on isolated use cases, mocking infrastructure dependencies.

  ```bash
  pnpm test:unit
  ```

- **Integration Tests**:
  Test infrastructure services in isolation.

  ```bash
  pnpm test:integration
  ```

- **End-to-End Tests (E2E)**:
  Validate the entire system with real infrastructure dependencies.

  ```bash
  pnpm test:e2e
  ```

### Builder Pattern Example

The **Builder Pattern** simplifies the creation of complex objects during tests:

```typescript
const user = UserBuilder.aUser().withName('John').withAge(30).build();
```

---

## 🔗 Dependency Injection

### Overview

The project uses **[DIOD](https://github.com/artberri/diod)** for Dependency Injection (DI). DIOD simplifies defining and resolving dependencies, using decorators to register services dynamically.

#### Example: Use Case Registration

```typescript
export const useCases = new Set<Class<unknown>>();

export const isUseCase = (): Class<unknown> => {
  return <TFunction extends Class<unknown>>(target: TFunction): TFunction => {
    useCases.add(target);
    return target;
  };
};

@isUseCase()
class CreateUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus
  ) {}
}
```

#### Automatic Registration

The server dynamically loads dependencies from files using a custom loader:

```typescript
const searchPatterns = [
  `${rootPath}/Apps/**/Controllers/**/*Controller.{ts,js}`,
  `${rootPath}/Contexts/**/Application/UseCases/**/*.{ts,js}`,
  `${rootPath}/Contexts/**/Application/EventHandlers/**/*.{ts,js}`,
  `${rootPath}/Contexts/**/Infrastructure/**/*.{ts,js}`,
];

/**
 * Is necessary to load all files before register the dependencies
 * because the decorators are executed when the file is imported
 */
export const filesLoader = async (): Promise<void> => {
  try {
    const files = await glob(searchPatterns, { onlyFiles: true });

    await Promise.all(files.map((file) => import(file)));
  } catch (error) {
    console.error("Error loading files:", error);
    throw error;
  }
};
```

---

## 🛣️ Routes

Routes are defined using the `@isController()` decorator. This allows configuration of routes with metadata like HTTP methods, paths, middlewares, and schemas.

#### Example: Defining a Route

```typescript
@isController({
  method: 'post',
  path: '/posts',
  middlewares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
      },
      required: ['name', 'description'],
    },
  },
})
export class CreatePostController extends BaseController {
  constructor(private readonly useCase: CreatePost) {
    super();
  }

  public async run(req: Request, res: Response): Promise<void> {
    await this.useCase.run(req.body);
    this.sendOk();
  }
}
```

- **method**: HTTP method (e.g., `GET`, `POST`).
- **path**: URL endpoint.
- **middlewares**: Executed before the route handler.
- **schema**: Validates input with Fastify's built-in validation.

<hr>

<div align="center">

<strong>⭐ hit the star button if you found this useful ⭐</strong><br>

<a href="https://github.com/sanurb/NodeJS-DDD-skeleton">Source</a>
| <a href="https://linkedin.com/in/sanurb" target="_blank">LinkedIn </a>
| <a href="https://sanurb.github.io/projects" target="_blank">Other Projects </a>

</div>
