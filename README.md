<div align = "center">

<h1><a href="https://github.com/sanurb/bare-minimum">bare-minimum</a></h1>

<a href="https://github.com/sanurb/bare-minimum/blob/main/LICENSE">
<img alt="License" src="https://img.shields.io/github/license/sanurb/bare-minimum?style=flat&color=eee&label="> </a>

<a href="https://github.com/sanurb/bare-minimum/graphs/contributors">
<img alt="People" src="https://img.shields.io/github/contributors/sanurb/bare-minimum?style=flat&color=ffaaf2&label=People"> </a>

<a href="https://github.com/sanurb/bare-minimum/stargazers">
<img alt="Stars" src="https://img.shields.io/github/stars/sanurb/bare-minimum?style=flat&color=98c379&label=Stars"></a>

<a href="https://github.com/sanurb/bare-minimum/network/members">
<img alt="Forks" src="https://img.shields.io/github/forks/sanurb/bare-minimum?style=flat&color=66a8e0&label=Forks"> </a>

<a href="https://github.com/sanurb/bare-minimum/watchers">
<img alt="Watches" src="https://img.shields.io/github/watchers/sanurb/bare-minimum?style=flat&color=f5d08b&label=Watches"> </a>

<a href="https://github.com/sanurb/bare-minimum/pulse">
<img alt="Last Updated" src="https://img.shields.io/github/last-commit/sanurb/bare-minimum?style=flat&color=e06c75&label="> </a>

<h3>Short Sweet Headline 🎇🎉</h3>

<figure>
  <img src="./assets/screenshot.png" alt="bare-minimum in action">
  <br/>
  <figcaption>bare-minimum in action</figcaption>
</figure>

</div>

bare-minimum is a `<utility/tool>` that allows `<target_audience>` to `<action>`.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [✨ Features](#-features)
- [⚡ Setup](#-setup)
  - [⚙️ Requirements](#-requirements)
  - [💻 Installation](#-installation)
- [🚀 Usage](#-usage)
- [🏗️ What's Next](#-whats-next)
  - [✅ To-Do](#-to-do)
- [🧑‍💻 Behind The Code](#-behind-the-code)
  - [🌈 Inspiration](#-inspiration)
  - [💡 Challenges/Learnings](#-challengeslearnings)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ✨ Features

- 📁 **Modular Structure**: Designed using **Domain-Driven Design (DDD)** principles with bounded contexts for scalability and separation of concerns.

- 💨 **Rapid TypeScript Compilation**: Uses **SWC** for fast TypeScript compilation and **tsx** for quick script execution.

- 🌐 **Stable Node Environment**: Requires Node.js version `>18.x` for compatibility with modern ECMAScript features and libraries.

- 🔧 **Environment Management**: Configured with **dotenv** for loading and managing environment variables securely and efficiently.

- 🔗 **Dependency Injection**: Powered by **DIOD**, a lightweight and strongly-typed dependency injection library for TypeScript.

- 🔒 **Enhanced Security**: Configured with **Helmet** for HTTP header protection and **@fastify/cors** for secure cross-origin requests.

- 📊 **Logging**: Integrated with **pino-http**, a high-performance logging library, ensuring detailed and efficient application logs.

- 🧪 **Comprehensive Testing**:
  - **Unit Tests**: Managed with **Jest**, including mocking support with **jest-mock-extended**.
  - **Integration Tests**: Implemented with **Supertest** for end-to-end HTTP testing.
  - **Behavior-Driven Development**: Supported via **Cucumber.js** for writing and automating high-level feature tests.

- 🔄 **Code Quality Assurance**:
  - **Husky**: Ensures pre-commit checks with hooks.
  - **Lint-Staged**: Automatically formats and fixes staged files.
  - **Biome.js**: Unified tool for linting, formatting, and type-checking.

- 📃 **Value Object Utilities**: Implements reusable value object abstractions (e.g., `UuidValueObject`, `StringValueObject`) for strong typing in the domain layer.

- 🐳 **Docker Support**: Ready for containerization with pre-configured Docker and Docker Compose files for streamlined deployment.

- ⚙️ **High-Performance Framework**: Built on **Fastify**, known for its lightweight, fast, and plugin-based architecture.

- 📜 **Clean Code Practices**: Adheres to SOLID principles, DRY, and KISS to ensure readable, maintainable, and extensible code.

- 📝 **Mocking and Testing Utilities**: Includes **@faker-js/faker** for generating fake data during tests and development.

- 🔑 **Advanced TypeScript Features**: Leverages **TypeScript** and **type-fest** for utility types, ensuring type safety and reducing boilerplate.

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

## ⚡ Setup

### ⚙️ Requirements

- foo >= bar
- bazz

### 💻 Installation

Installing bare-minimum is as simple as cloning and symlinking!

```bash
git clone https://github.com/sanurb/bare-minimum
cd bare-minimum
<install_command>
```

## 🚀 Usage

```bash
USAGE:
    bare-minimum [FLAGS] [OPTIONS]
Example:
    bare-minimum
```

## 🏗️ What's Next

Planning to add `<feature/module>`.

### ✅ To-Do

- [x] Setup repo
- [ ] Think real hard
- [ ] Start typing

## 🧑‍💻 Behind The Code

### 🌈 Inspiration

bare-minimum was inspired by `<reason/idea>`.

### 💡 Challenges/Learnings

- The main challenges were `<issue/difficulty>`
- I learned about `<learning/accomplishment>`

<hr>

<div align="center">

<strong>⭐ hit the star button if you found this useful ⭐</strong><br>

<a href="https://github.com/sanurb/bare-minimum">Source</a>
| <a href="https://linkedin.com/in/sanurb" target="_blank">LinkedIn </a>
| <a href="https://sanurb.github.io/projects" target="_blank">Other Projects </a>

</div>
