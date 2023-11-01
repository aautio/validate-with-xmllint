module.exports = {
    env: {
        mocha: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    globals: {
        __dirname: true,
        module: true,
        require: true,
    },
    ignorePatterns: [
        'coverage/*',
        'dist/*',
        'node_modules/*',
    ],
    overrides: [
        {
            files: [
                '*.{spec,test}.{js,ts,tsx}',
                '**/__{mocks,tests}__/**/*.{js,ts,tsx}',
            ],
            globals: {
                context: true,
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            modules: true,
        },
        ecmaVersion: 2020,
        project: [
            'tsconfig.eslint.json',
            'tsconfig.json',
        ],
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'putout',
        'sort-class-members',
    ],
    root: true,
    rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/comma-dangle': [
            'error',
            'always-multiline',
        ],
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/indent': 'off', // https://github.com/typescript-eslint/typescript-eslint/issues/1824
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'after-used',
                argsIgnorePattern: '^_',
                ignoreRestSiblings: true,
                vars: 'all',
            },
        ],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/space-before-function-paren': 'error',
        'array-bracket-spacing': [
            'error',
            'always',
        ],
        'arrow-body-style': [
            'error',
            'as-needed',
        ],
        'arrow-parens': [
            'error',
            'as-needed',
        ],
        'class-methods-use-this': 'off',
        'comma-dangle': 'off',
        'import/imports-first': 'off',
        'import/newline-after-import': 'off',
        'import/no-dynamic-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default': 'off',
        'import/no-unresolved': 'error',
        'import/no-webpack-loader-syntax': 'off',
        'import/prefer-default-export': 'off',
        indent: [
            'error',
            4,
            {
                // TypeScript fixes...
                ignoredNodes: [
                    'TSTypeAliasDeclaration > UnionType',
                    '*[typeAnnotation.typeAnnotation.type="TSTypeLiteral"] ObjectExpression',
                ],
                SwitchCase: 1,
            },
        ],
        'max-len': 'off',
        'newline-per-chained-call': 'off',
        'no-alert': 'off',
        'no-await-in-loop': 'off',
        'no-confusing-arrow': 'off',
        'no-console': 'off',
        'no-continue': 'off',
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        'no-restricted-syntax': [
            'error',
            {
                message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
                selector: 'ForInStatement',
            },
            {
                message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
                selector: 'LabeledStatement',
            },
            {
                message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
                selector: 'WithStatement',
            },
        ],
        'no-return-assign': 'off',
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'off',
        'prefer-exponentiation-operator': 'off',
        'prefer-template': 'error',
        'putout/multiple-properties-destructuring': [
            'error',
        ],
        'require-yield': 'off',
        'sort-class-members/sort-class-members': [
            2,
            {
                accessorPairPositioning: 'getThenSet',
                groups: {
                    'accessor-pairs': [
                        {
                            accessorPair: true,
                            sort: 'alphabetical',
                        },
                    ],
                    methods: [
                        {
                            sort: 'alphabetical',
                            type: 'method',
                        },
                    ],
                    properties: [
                        {
                            sort: 'alphabetical',
                            type: 'property',
                        },
                    ],
                    'static-methods': [
                        {
                            sort: 'alphabetical',
                            static: true,
                            type: 'method',
                        },
                    ],
                    'static-properties': [
                        {
                            sort: 'alphabetical',
                            static: true,
                            type: 'property',
                        },
                    ],
                },
                order: [
                    '[static-properties]',
                    '[static-methods]',
                    '[properties]',
                    'constructor',
                    '[accessor-pairs]',
                    '[methods]',
                ],
            },
        ],
        'sort-keys': [
            'error',
            'asc',
            {
                caseSensitive: false,
                natural: true,
            },
        ],
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': [
                '.ts',
                '.tsx',
            ],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
};
