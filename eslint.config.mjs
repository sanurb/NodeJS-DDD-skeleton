import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import prettier from "eslint-plugin-prettier";
import jest from "eslint-plugin-jest";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import _import from "eslint-plugin-import";
import editorconfig from "eslint-plugin-editorconfig";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "node_modules/**/*",
        "**/.eslintrc.js",
        "**/jest.config.js",
        "**/cucumber.js",
        "**/commitlint.config.js",
        "**/dist/",
        "**/docker_data",
        "**/Setup.js",
    ],
}, ...fixupConfigRules(compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "prettier",
)), {
    plugins: {
        prettier,
        jest: fixupPluginRules(jest),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        "simple-import-sort": simpleImportSort,
        import: fixupPluginRules(_import),
        editorconfig,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "commonjs",

        parserOptions: {
            tsconfigRootDir: "/home/sanurb/work/NodeJS-DDD-skeleton",
            project: ["./tsconfig.eslint.json"],
        },
    },

    settings: {
        "import/resolver": {
            node: {
                extensions: [".ts"],
            },
        },
    },

    rules: {
        "import/no-unresolved": ["off"],
        "import/prefer-default-export": ["off"],
        "prefer-destructuring": ["off"],
        "max-classes-per-file": ["error", 1],
        "lines-between-class-members": ["off"],
        "@/quotes": ["error", "single", {
            avoidEscape: true,
        }],

        "@typescript-eslint/no-floating-promises": ["error"],
        "@typescript-eslint/no-inferrable-types": ["error"],
        "@typescript-eslint/no-misused-promises": ["error"],
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-unnecessary-type-assertion": ["error"],
        "@typescript-eslint/no-unsafe-assignment": ["warn"],
        "@typescript-eslint/no-unsafe-call": ["warn"],
        "@typescript-eslint/no-unsafe-member-access": ["warn"],
        "@typescript-eslint/no-unsafe-return": ["error"],
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-var-requires": ["error"],
        "@typescript-eslint/require-await": ["error"],
        "@typescript-eslint/restrict-plus-operands": ["error"],
        "@typescript-eslint/restrict-template-expressions": ["error"],
        "@typescript-eslint/unbound-method": ["error"],
        "@typescript-eslint/no-for-in-array": ["error"],
        "@typescript-eslint/prefer-regexp-exec": ["error"],
        "@typescript-eslint/prefer-readonly": ["error"],

        "@typescript-eslint/explicit-function-return-type": ["error", {
            allowExpressions: true,
        }],

        "class-methods-use-this": ["off"],
        "consistent-return": ["error"],
        "dot-notation": ["error"],
        "max-len": ["off"],
        "no-empty": ["error"],
        "no-restricted-syntax": ["error"],
        "no-return-await": ["error"],
        "no-shadow": ["off"],
        "no-underscore-dangle": [0],
        "no-unreachable": ["error"],
        "no-useless-constructor": ["off"],
        "@typescript-eslint/no-useless-constructor": ["error"],
        "import/default": ["error"],
        "import/no-cycle": ["error"],
        "import/no-useless-path-segments": ["error"],
        "prettier/prettier": ["error"],
        "jest/no-export": ["off"],

        "jest/expect-expect": ["error", {
            assertFunctionNames: ["expect**", "request.**.expect"],
        }],

        "array-callback-return": ["error", {
            checkForEach: true,
        }],

        "no-await-in-loop": "error",
        "no-constant-binary-expression": "error",
        "no-constructor-return": "error",
        "no-promise-executor-return": "error",
        "no-self-compare": "error",
        "no-template-curly-in-string": "error",
        "no-unmodified-loop-condition": "error",
        "no-unreachable-loop": "error",
        "no-unused-private-class-members": "error",
        "require-atomic-updates": "error",

        camelcase: ["error", {
            ignoreImports: true,
            properties: "never",
        }],

        eqeqeq: "error",
        "new-cap": "off",
        "no-array-constructor": "error",

        "no-console": ["error", {
            allow: ["error"],
        }],

        "no-else-return": ["error", {
            allowElseIf: false,
        }],

        "no-extend-native": "error",
        "no-lonely-if": "error",
        "no-param-reassign": "error",
        "no-return-assign": "error",
        "no-throw-literal": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "prefer-const": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        radix: "error",
        yoda: "error",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",

        "import/no-restricted-paths": ["error", {
            zones: [{
                target: "./src",
                from: "./ui",
            }],
        }],

        "import/no-webpack-loader-syntax": "error",
        "simple-import-sort/exports": "error",
        "simple-import-sort/imports": "error",
    },
}, {
    files: ["*/tests/**"],

    plugins: {
        jest: fixupPluginRules(jest),
    },

    rules: {
        "@typescript-eslint/unbound-method": ["off"],
        "jest/unbound-method": ["error"],
    },
}, {
    files: ["*/tests/**"],
    ignores: ["**/*.test.ts"],

    plugins: {
        jest: fixupPluginRules(jest),
    },

    rules: {
        "jest/no-export": ["off"],
    },
}, {
    files: ["./tests/**/*.steps.ts"],

    rules: {
        "new-cap": ["off"],
    },
}];
