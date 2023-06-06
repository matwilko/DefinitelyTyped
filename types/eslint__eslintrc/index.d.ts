// Type definitions for @eslint/eslintrc 2.0.3
// Project: https://github.com/eslint/eslintrc
// Definitions by: Matt Wilkinson <https://github.com/matwilko>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import type { ESLint, Linter, Rule } from 'eslint';
import { IMinimatch } from 'minimatch';
import { ErrorObject } from 'ajv';

export class FlatCompat {
    constructor({
        baseDirectory,
        resolvePluginsRelativeTo,
        recommendedConfig,
        allConfig,
    }?: {
        baseDirectory?: string;
        resolvePluginsRelativeTo?: string;
        recommendedConfig?: Linter.Config;
        allConfig?: Linter.Config;
    });

    baseDirectory: string;
    resolvePluginsRelativeTo: string;

    config(config: Linter.Config): Linter.FlatConfig[];
    env(env: Linter.Config['env']): Linter.FlatConfig[];
    extends(...configs: string[]): Linter.FlatConfig[];
    plugins(...plugins: string[]): Linter.FlatConfig[];
}

type EcmaVersion = 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021;

interface EcmaFeatures {
    /** Enabling `return` statements at the top-level. */
    globalReturn?: boolean;

    /** Enabling JSX syntax. */
    jsx?: boolean;

    /** Enabling strict mode always. */
    impliedStrict?: boolean;
}

interface ParserOptions {
    /** The optional features. */
    ecmaFeatures?: EcmaFeatures | undefined;

    /** The ECMAScript version (or revision number). */
    ecmaVersion?: EcmaVersion | undefined;

    /** The source code type. */
    sourceType?: 'script' | 'module' | undefined;
}

interface Environment {
    /** The definition of global variables. */
    globals?: Linter.BaseConfig['globals'] | undefined;

    /** The parser options that will be enabled under this environment. */
    parserOptions?: ParserOptions | undefined;
}

type Resolver = {
    /**
     * Resolves a Node module relative to another module
     * @param moduleName The name of a Node module, or a path to a Node module.
     * @param relativeToPath An absolute path indicating the module that `moduleName` should be resolved relative to. This must be
     * a file rather than a directory, but the file need not actually exist.
     * @returns {string} The absolute path that would result from calling `require.resolve(moduleName)` in a file located at `relativeToPath`
     */
    resolve(moduleName: string, relativeToPath: string): string;
};

interface ConfigArrayFactoryInternalSlots {
    /** The map for additional plugins. */
    additionalPluginPool: Map<string, ESLint.Plugin>;

    /** The path to the current working directory. */
    cwd: string;

    /** An absolute path the the directory that plugins should be resolved from. */
    resolvePluginsRelativeTo: string | undefined;

    /** The rules that are built in to ESLint. */
    builtInRules: Map<string, Rule.RuleModule>;

    /** The module resolver object. */
    resolver?: Resolver;

    /** The path to the definitions for eslint:all. */
    eslintAllPath: string;

    /** Returns the config data for eslint:all. */
    getEslintAllConfig: () => Linter.Config;

    /** The path to the definitions for eslint:recommended. */
    eslintRecommendedPath: string;

    /** Returns the config data for eslint:recommended. */
    getEslintRecommendedConfig: () => Linter.Config;
}

interface ConfigArrayFactoryLoadingContext {
    /**  The path to the current configuration. */
    filePath: string;

    /**  The base path to resolve relative paths in `overrides[].files`, `overrides[].excludedFiles`, and `ignorePatterns`. */
    matchBasePath: string;

    /**  The name of the current configuration. */
    name: string;

    /**  The base path to resolve plugins. */
    pluginBasePath: string;

    /**  The type of the current configuration. This is `"config"` in normal. This is `"ignore"` if it came from `.eslintignore`. This is `"implicit-processor"` if it came from legacy file-extension processors. */
    type: 'config' | 'ignore' | 'implicit-processor';
}

interface ConfigArrayFactoryOptions {
    /** The map for additional plugins. */
    additionalPluginPool?: Map<string, ESLint.Plugin>;

    /** The path to the current working directory. */
    cwd?: string;

    /** A path to the directory that plugins should be resolved from. Defaults to `cwd`. */
    resolvePluginsRelativeTo?: string;

    /** The rules that are built in to ESLint. */
    builtInRules: Map<string, Rule.RuleModule>;

    /** The module resolver object. */
    resolver?: Resolver;

    /** The path to the definitions for eslint:all. */
    eslintAllPath: string;

    /** Returns the config data for eslint:all. */
    getEslintAllConfig: () => Linter.Config;

    /** The path to the definitions for eslint:recommended. */
    eslintRecommendedPath: string;

    /** Returns the config data for eslint:recommended. */
    getEslintRecommendedConfig: () => Linter.Config;
}

interface CascadingConfigArrayFactoryInternalSlots {
    /** The config array of `baseConfig` option. */
    baseConfigArray: Linter.Config;

    /** The config data of `baseConfig` option. This is used to reset `baseConfigArray`. */
    baseConfigData: Linter.Config;

    /** The config array of CLI options. */
    cliConfigArray: Legacy.ConfigArray;

    /** The config data of CLI options. This is used to reset `cliConfigArray`. */
    cliConfigData: Linter.Config;

    /** The factory for config arrays. */
    configArrayFactory: Legacy.ConfigArrayFactory;

    /** The cache from directory paths to config arrays. */
    configCache: Map<string, Legacy.ConfigArray>;

    /** The base directory to start lookup. */
    cwd: string;

    /** The cache from config arrays to finalized config arrays. */
    finalizeCache: WeakMap<Legacy.ConfigArray, Legacy.ConfigArray>;

    /** The path to the alternative file of `.eslintignore`. */
    ignorePath?: string;

    /** The value of `--rulesdir` option. This is used to reset `baseConfigArray`. */
    rulePaths: string[] | null;

    /** The value of `--config` option. This is used to reset `cliConfigArray`. */
    specificConfigPath: string | null;

    /** if `false` then it doesn't load config files. */
    useEslintrc: boolean;

    /** The function to use to load rules. */
    loadRules: (rulesPath: string, cwd: CascadingConfigArrayFactoryInternalSlots) => Map<string, Rule.RuleModule>;

    /** The rules that are built in to ESLint. */
    builtInRules: Map<string, Rule.RuleModule>;

    /** The module resolver object. */
    resolver?: Resolver;

    /** The path to the definitions for eslint:all. */
    eslintAllPath: string;

    /** Returns the config data for eslint:all. */
    getEslintAllConfig: () => Linter.Config;

    /** The path to the definitions for eslint:recommended. */
    eslintRecommendedPath: string;

    /** Returns the config data for eslint:recommended. */
    getEslintRecommendedConfig: () => Linter.Config;
}

interface CascadingConfigArrayFactoryOptions {
    /** The map for additional plugins. */
    additionalPluginPool?: Map<string, ESLint.Plugin>;

    /** The config by `baseConfig` option. */
    baseConfig?: Linter.Config;

    /** The config by CLI options (`--env`, `--global`, `--ignore-pattern`, `--parser`, `--parser-options`, `--plugin`, and `--rule`). CLI options overwrite the setting in config files. */
    cliConfig?: Linter.Config;

    /** The base directory to start lookup. */
    cwd?: string;

    /** The path to the alternative file of `.eslintignore`. */
    ignorePath?: string;

    /** * The value of `--rulesdir` option. */
    rulePaths?: string[];

    /** * The value of `--config` option. */
    specificConfigPath?: string;

    /** * if `false` then it doesn't load config files. */
    useEslintrc?: boolean;

    /** The function to use to load rules. */
    loadRules: (rulesPath: string, cwd: CascadingConfigArrayFactoryInternalSlots) => Map<string, Rule.RuleModule>;

    /** The rules that are built in to ESLint. */
    builtInRules: Map<string, Rule.RuleModule>;

    /** The module resolver object. */
    resolver?: Resolver;

    /** The path to the definitions for eslint:all. */
    eslintAllPath: string;

    /** Returns the config data for eslint:all. */
    getEslintAllConfig: () => Linter.Config;

    /** The path to the definitions for eslint:recommended. */
    eslintRecommendedPath: string;

    /** Returns the config data for eslint:recommended. */
    getEslintRecommendedConfig: () => Linter.Config;
}

type DependentParser = Legacy.ConfigDependency<Linter.ParserModule>;
type DependentPlugin = Legacy.ConfigDependency<ESLint.Plugin>;

/**
 * A predicate that tests whether a given file path is ignored.
 * @param filePath The absolute path that is checked.
 * @param dot Whether or not to ignore dotfiles.
 */
declare function IgnorePatternTest(filePath: string, dot: boolean): boolean;

type IgnorePatternPredicate = typeof IgnorePatternTest & {
    /** The path of the common ancestor directory of the ignored paths */
    basePath: string;

    /** The patterns being tested */
    patterns: string[];
};

interface Pattern {
    /**
     * The positive matchers.
     */
    includes: IMinimatch[] | null;
    /**
     * The negative matchers.
     */
    excludes: IMinimatch[] | null;
}

export namespace Legacy {
    /**
     * The Config Array.
     *
     * `ConfigArray` instance contains all settings, parsers, and plugins.
     * You need to call `ConfigArray#extractConfig(filePath)` method in order to
     * extract, merge and get only the config data which is related to an arbitrary
     * file.
     */
    export class ConfigArray extends Array {
        /** Get the plugin environments. */
        readonly pluginEnvironments: ReadonlyMap<string, Environment> | null;

        /** Get the plugin processors. */
        readonly pluginProcessors: ReadonlyMap<string, Linter.Processor> | null;

        /** Get the plugin rules. */
        readonly pluginRules: ReadonlyMap<string, Rule.RuleModule> | null;

        /** Check if this config has `root` flag. */
        isRoot(): boolean;

        /**
         * Extract the config data which is related to a given file.
         * @param filePath The absolute path to the target file.
         * */
        extractConfig(filePath: string): ExtractedConfig;

        /**
         * Check if a given path is an additional lint target.
         * @param filePath The absolute path to the target file.
         */
        isAdditionalTargetPath(filePath: string): boolean;
    }

    /**
     * Create a new context with default values.
     * @param slots The internal slots.
     * @param providedType The type of the current configuration. Default is `"config"`.
     * @param providedName The name of the current configuration. Default is the relative path from `cwd` to `filePath`.
     * @param providedFilePath The path to the current configuration. Default is empty string.
     * @param providedMatchBasePath The type of the current configuration. Default is the directory of `filePath` or `cwd`.
     */
    export function createConfigArrayFactoryContext(
        slots: ConfigArrayFactoryInternalSlots,
        providedType?: 'config' | 'ignore' | 'implicit-processor' | undefined,
        providedName?: string | undefined,
        providedFilePath?: string | undefined,
        providedMatchBasePath?: string | undefined,
    ): ConfigArrayFactoryLoadingContext;

    /**
     * This class provides the functionality that enumerates every file which is
     * matched by given glob patterns and that configuration.
     */
    export class CascadingConfigArrayFactory {
        constructor(options: CascadingConfigArrayFactoryOptions);

        /** The path to the current working directory.
         * This is used by tests.
         */
        readonly cwd: string;

        /**
         * Get the config array of a given file.
         * If `filePath` was not given, it returns the config which contains only
         * `baseConfigData` and `cliConfigData`.
         * @param filePath The file path to a file.
         * @param options The options.
         * @param options.ignoreNotFoundError If `true` then it doesn't throw `ConfigurationNotFoundError`.
         */
        getConfigArrayForFile(
            filePath?: string,
            { ignoreNotFoundError }?: { ignoreNotFoundError?: boolean },
        ): ConfigArray;

        /**
         * Set the config data to override all configs.
         * Require to call `clearCache()` method after this method is called.
         * @param configData The config data to override all configs.
         */
        setOverrideConfig(configData: Linter.Config): void;

        /** Clear config cache. */
        clearCache(): void;
    }

    /** The factory of `ConfigArray` objects. */
    export class ConfigArrayFactory {
        constructor(options: ConfigArrayFactoryOptions);

        /**
         * Create `ConfigArray` instance from a config data.
         * @param configData The config data to create.
         * @param [options] The options.
         * @param [options.basePath] The base path to resolve relative paths in `overrides[].files`, `overrides[].excludedFiles`, and `ignorePatterns`.
         * @param [options.filePath] The path to this config data.
         * @param [options.name] The config name.
         * @returns Loaded config. An empty `ConfigArray` if any config doesn't exist.
         */
        create(
            configData: Linter.Config,
            { basePath, filePath, name }?: { basePath: string; filePath: string; name: string },
        ): ConfigArray;

        /**
         * Load a config file.
         * @param [options] The options.
         * @param [options.basePath] The base path to resolve relative paths in `overrides[].files`, `overrides[].excludedFiles`, and `ignorePatterns`.
         * @param [options.name] The config name.
         * @returns Loaded config. An empty `ConfigArray` if any config doesn't exist.
         */
        loadFile(filePath: string, { basePath, name }?: { basePath: string; name: string }): ConfigArray;

        /**
         * Load the config file on a given directory if exists.
         * @param directoryPath The path to a directory.
         * @param [options] The options.
         * @param [options.basePath] The base path to resolve relative paths in `overrides[].files`, `overrides[].excludedFiles`, and `ignorePatterns`.
         * @param [options.name] The config name.
         * @returns Loaded config. An empty `ConfigArray` if any config doesn't exist.
         */
        loadInDirectory(directoryPath: string, options: { basePath: string; name: string }): ConfigArray;

        /**
         * Check if a config file on a given directory exists or not.
         * @param directoryPath The path to a directory.
         * @returns The path to the found config file. If not found then null.
         */
        static getPathToConfigFileInDirectory(directoryPath: string): string | null;

        /**
         * Load `.eslintignore` file.
         * @param filePath The path to a `.eslintignore` file to load.
         * @returns Loaded config. An empty `ConfigArray` if any config doesn't exist.
         */
        loadESLintIgnore(filePath: string): ConfigArray;

        /**
         * Load `.eslintignore` file in the current working directory.
         * @returns Loaded config. An empty `ConfigArray` if any config doesn't exist.
         */
        loadDefaultESLintIgnore(): ConfigArray;
    }

    /**
     * The class is to store parsers or plugins.
     * This class hides the loaded object from `JSON.stringify()` and `console.log`.
     */
    export class ConfigDependency<T> {
        /**
         * @param data The dependency data.
         * @param [data.definition] The dependency if the loading succeeded.
         * @param [data.error] The error object if the loading failed.
         * @param [data.filePath] The actual path to the dependency if the loading succeeded.
         * @param data.id The ID of this dependency.
         * @param data.importerName The name of the config file which loads this dependency.
         * @param data.importerPath The path to the config file which loads this dependency.
         */
        constructor({
            definition,
            error,
            filePath,
            id,
            importerName,
            importerPath,
        }: {
            definition?: T;
            error?: Error;
            filePath?: string;
            id: string;
            importerName: string;
            importerPath: string;
        });

        /** The loaded dependency if the loading succeeded. */
        definition: T | null;

        /** The error object if the loading failed. */
        error: Error | null;

        /** The loaded dependency if the loading succeeded. */
        filePath: string | null;

        /** The ID of this dependency. */
        id: string;

        /** The name of the config file which loads this dependency. */
        importerName: string;

        /** The path to the config file which loads this dependency. */
        importerPath: string;
    }

    /** The class for extracted config data. */
    export class ExtractedConfig {
        /** The config name what `noInlineConfig` setting came from. */
        configNameOfNoInlineConfig: string;

        /** Environments. */
        env: Record<string, boolean>;

        /** Global variables. */
        globals: Linter.BaseConfig['globals'];

        /** Parser definition. */
        parser: DependentParser | null;

        /** Options for the parser. */
        parserOptions: object;

        /** Plugin definitions. */
        plugins: Record<string, DependentPlugin>;

        /** Processor ID. */
        processor: string | null;

        /** Rule settings. */
        rules: Linter.BaseConfig['rules'];

        settings: object;

        /**
         * Convert this config to the compatible object as a config file content.
         * @returns {ConfigData} The converted object.
         */
        toCompatibleObjectAsConfigFileContent(): Linter.Config;
    }

    export class IgnorePattern {
        /** The default patterns. */
        static readonly DefaultPatterns: string[];

        /**
         * Create the default predicate function.
         * @param cwd The current working directory.
         */
        static createDefaultIgnore(cwd: string): IgnorePatternPredicate;

        /**
         * Create the predicate function from multiple `IgnorePattern` objects.
         * @param ignorePatterns The list of ignore patterns.
         */
        static createIgnore(ignorePatterns: IgnorePattern[]): IgnorePatternPredicate;

        /**
         * Initialize a new `IgnorePattern` instance.
         * @param patterns The glob patterns that ignore to lint.
         * @param basePath The base path of `patterns`.
         */
        constructor(patterns: string[], basePath: string);

        /** The glob patterns that ignore to lint. */
        patterns: string[];

        /** The base path of `patterns`. */
        basePath: string;

        /**
         * If `true` then patterns which don't start with `/` will match the paths to the outside of `basePath`. Defaults to `false`.
         *
         * It's set `true` for `.eslintignore`, `package.json`, and `--ignore-path` for backward compatibility.
         * It's `false` as-is for `ignorePatterns` property in config files.
         */
        loose: boolean;

        /**
         * Get `patterns` as modified for a given base path. It modifies the
         * absolute paths in the patterns as prepending the difference of two base
         * paths.
         * @param newBasePath The base path.
         */
        getPatternsRelativeTo(newBasePath: string): string[];
    }

    /** The class to test given paths are matched by the patterns. */
    export class OverrideTester {
        /**
         * Create a tester with given criteria.
         * If there are no criteria, returns `null`.
         * @param files The glob patterns for included files.
         * @param excludedFiles The glob patterns for excluded files.
         * @param basePath The path to the base directory to test paths.
         */
        static create(
            files: string | string[],
            excludedFiles: string | string[],
            basePath: string,
        ): OverrideTester | null;

        /**
         * Combine two testers by logical and.
         * If either of the testers was `null`, returns the other tester.
         * The `basePath` property of the two must be the same value.
         * @param a A tester.
         * @param b Another tester.
         */
        static and(a: OverrideTester | null, b: OverrideTester | null): OverrideTester | null;

        /**
         * @param patterns The matchers.
         * @param basePath The base path.
         * @param endsWithWildcard If `true` then a pattern ends with `*`.
         */
        constructor(patterns: Pattern[], basePath: string, endsWithWildcard?: boolean);

        /** The matchers */
        patterns: Pattern[];

        /** The base path */
        basePath: string;

        /** If `true` then a pattern ends with `*`. */
        endsWithWildcard: boolean;

        /**
         * Test if a given path is matched or not.
         * @param filePath The absolute path to the target file.
         */
        test(filePath: string): boolean;
    }

    /**
     * Get the used extracted configs.
     * CLIEngine will use this method to collect used deprecated rules.
     * @param instance The config array object to get.
     */
    export function getUsedExtractedConfigs(instance: ConfigArray): ExtractedConfig[];

    export const environments: Map<string, Environment>;

    export namespace ConfigOps {
        /**
         * Normalizes the severity value of a rule's configuration to a number
         * @param ruleConfig A rule's configuration value, generally
         * received from the user. A valid config value is either 0, 1, 2, the string "off" (treated the same as 0),
         * the string "warn" (treated the same as 1), the string "error" (treated the same as 2), or an array
         * whose first element is one of the above values. Strings are matched case-insensitively.
         */
        export function getRuleSeverity(ruleConfig: Linter.RuleEntry): Linter.Severity;

        /**
         * Converts old-style severity settings (0, 1, 2) into new-style
         * severity settings (off, warn, error) for all rules. Assumption is that severity
         * values have already been validated as correct.
         * @param config The config object to normalize.
         */
        export function normalizeToStrings(config: Linter.Config): void;

        /**
         * Determines if the severity for the given rule configuration represents an error.
         * @param ruleConfig The configuration for an individual rule.
         * @returns True if the rule represents an error, false if not.
         */
        export function isErrorSeverity(ruleConfig: Linter.RuleEntry): boolean;

        /**
         * Checks whether a given config has valid severity or not.
         * @param ruleConfig The configuration for an individual rule.
         */
        export function isValidSeverity(ruleConfig: unknown): ruleConfig is Linter.RuleEntry;

        /**
         * Checks whether every rule of a given config has valid severity or not.
         * @param config The configuration for rules.
         */
        export function isEverySeverityValid(config: unknown): config is Linter.RulesRecord;

        /**
         * Normalizes a value for a global in a config
         * @param configuredValue The value given for a global in configuration or in
         * a global directive comment
         * @throws Error if global value is invalid
         */
        export function normalizeConfigGlobal(
            configuredValue: boolean | string | null,
        ): typeof configuredValue extends 'off'
            ? 'off'
            : typeof configuredValue extends true | 'true' | 'writable' | 'writeable'
            ? 'writable'
            : typeof configuredValue extends null | false | 'false' | 'readable' | 'readonly'
            ? 'readonly'
            : 'readonly' | 'writeable' | 'off';
    }

    export class ConfigValidator {
        constructor({ builtInRules }?: { builtInRules?: Map<string, Rule.RuleModule> });

        builtInRules: Map<string, Rule.RuleModule>;

        /**
         * Gets a complete options schema for a rule.
         * @param rule A new-style rule object
         * @returns JSON Schema for the rule's options.
         */
        getRuleOptionsSchema(rule: Rule.RuleModule): Rule.RuleMetaData['schema'];

        /**
         * Validates a rule's severity and returns the severity value. Throws an error if the severity is invalid.
         * @param options The given options for the rule.
         */
        validateRuleSeverity(options: Linter.RuleEntry): Linter.Severity;

        /**
         * Validates the non-severity options passed to a rule, based on its schema.
         * @param rule The rule to validate
         * @param localOptions The options for the rule, excluding severity
         */
        validateRuleSchema(rule: Rule.RuleModule, localOptions: unknown[]): void;

        /**
         * Validates a rule's options against its schema.
         * @param rule The rule that the config is being validated for
         * @param ruleId The rule's unique name.
         * @param options The given options for the rule.
         * @param source The name of the configuration source to report in any errors. If null or undefined,
         * no source is prepended to the message.
         */
        validateRuleOptions(rule: Rule.RuleModule, ruleId: string, options: Linter.RuleEntry, source?: string): void;

        /**
         * Validates an environment object
         * @param environment The environment config object to validate.
         * @param source The name of the configuration source to report in any errors.
         * @param getAdditionalEnv A map from strings to loaded environments.
         */
        validateEnvironment(
            environment: Record<string, Environment> | undefined,
            source?: string,
            getAdditionalEnv?: (id: string) => Environment,
        ): void;

        /**
         * Validates a rules config object
         * @param rulesConfig The rules config object to validate.
         * @param source The name of the configuration source to report in any errors.
         * @param getAdditionalRule A map from strings to loaded rules
         */
        validateRules(
            rulesConfig: Linter.RulesRecord | undefined,
            source?: string,
            getAdditionalRule?: (id: string) => Rule.RuleModule,
        ): void;

        /**
         * Validates a `globals` section of a config file
         * @param globalsConfig The `globals` section
         * @param source The name of the configuration source to report in the event of an error.
         */
        validateGlobals(globalsConfig: Linter.BaseConfig['globals'], source?: string): void;

        /**
         * Validate `processor` configuration.
         * @param processorName The processor name.
         * @param source The name of config file.
         * @param getProcessor The getter of defined processors.
         */
        validateProcessor(
            processorName: string | undefined,
            source?: string,
            getProcessor?: (id: string) => Linter.Processor,
        ): void;

        /**
         * Formats an array of schema validation errors.
         * @param errors An array of error messages to format.
         * @returns Formatted error message
         */
        formatErrors(errors: ErrorObject[]): string;

        /**
         * Validates the top level properties of the config object.
         * @param config The config object to validate.
         * @param source The name of the configuration source to report in any errors.
         */
        validateConfigSchema(config: Linter.Config, source?: string): void;

        /**
         * Validates an entire config object.
         * @param config The config object to validate.
         * @param source The name of the configuration source to report in any errors.
         * @param getAdditionalRule A map from strings to loaded rules.
         * @param getAdditionalEnv A map from strings to loaded envs.
         */
        validate(
            config: Object,
            source?: string,
            getAdditionalRule?: (ruleId: string) => Rule.RuleModule,
            getAdditionalEnv?: (id: string) => Environment,
        ): void;

        /**
         * Validate config array object.
         * @param configArray The config array to validate.
         */
        validateConfigArray(configArray: ConfigArray): void;
    }

    export const ModuleResolver: Resolver;

    export namespace naming {
        /**
         * Brings package name to correct format based on prefix
         * @param name The name of the package.
         * @param prefix Can be either "eslint-plugin", "eslint-config" or "eslint-formatter"
         */
        export function normalizePackageName(name: string, prefix: string): string;

        /**
         * Removes the prefix from a fullname.
         * @param fullname The term which may have the prefix.
         * @param prefix The prefix to remove.
         */
        export function getShorthandName(fullname: string, prefix: string): string;

        /**
         * Gets the scope (namespace) of a term.
         * @param term The term which may have the namespace.
         */
        export function getNamespaceFromTerm(term: string): string;
    }
}
