module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  globals: {
    Spotify: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "indent": ["error", 4, { "SwitchCase": 1, "MemberExpression": 1 }],
    "no-trailing-spaces": "error",
    "no-console": [
      "error",
      { "allow": ["warn", "error"] }
    ],
    "no-fallthrough": "off",
    "no-case-declarations": "off",
    "space-before-function-paren": "error",
    "spaced-comment": "error",
    "arrow-spacing": "error",
    "keyword-spacing": "error",
    "semi": ["error", "always"],
    "dot-location": ["error", "property"],
    "dot-notation": "error",
    "no-alert": "error",
    "eqeqeq": ["error", "always"],
    "no-floating-decimal": "error",
    "no-global-assign": "error",
    "no-multi-spaces": "error",
    "no-useless-return": "error",
    "no-undef-init": "warn",
    "no-use-before-define": ["error", { "functions": false }],
    "array-bracket-newline": ["error", "consistent"],
    "brace-style": ["error", "1tbs"],
    "comma-dangle": [ "error", "always-multiline" ],
    "comma-spacing": "error",
    "comma-style": "error",
    "eol-last": "error",
    "func-call-spacing": "error",
    "jsx-quotes": ["error", "prefer-double"],
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "quote-props": ["error", "as-needed"],
    "linebreak-style": "warn",
    "lines-around-comment": "warn",
    "max-depth": ["error", 3],
    "max-statements-per-line": "error",
    "newline-per-chained-call": "error",
    "no-lonely-if": "error",
    "no-mixed-operators": "warn",
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }],
    "no-tabs": "warn",
    "space-before-blocks": "error",
    "space-infix-ops": "error",
    "space-unary-ops": [2, {
      "words": true,
      "nonwords": true,
      "overrides": {
        "-": false,
        "++": false,
        "--": false
      }
    }],
    "space-in-parens": "error",
    "switch-colon-spacing": "error",
    "arrow-body-style": "error",
    "no-duplicate-imports": "warn",
    "no-useless-computed-key": "warn",
    "no-var": "error",
    "arrow-parens": ["error", "as-needed"],
    "curly": "error",
    "vue/no-dupe-keys": "error",
    "vue/no-reserved-keys": "error",
    "vue/no-shared-component-data": "error",
    "vue/require-valid-default-prop": "error",
    "vue/require-default-prop": "error",
    "vue/require-prop-types": "error",
    "vue/this-in-template": "error",
    "vue/return-in-computed-property": "error",
    "vue/html-quotes": "error",
    "vue/order-in-components": [2, {
      "order": [
        ["name", "delimiters", "functional", "model"],
        "el",
        ["components", "directives", "filters"],
        ["parent", "mixins", "extends", "provide", "inject"],
        "template",
        "props",
        "propsData",
        "data",
        "chill",
        "computed",
        "watch",
        "methods",
        "LIFECYCLE_HOOKS",
        "render",
        "renderError"
      ]
    }],
    "vue/max-attributes-per-line": [2, {
      "singleline": 2,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "never",
        "normal": "never",
        "component": "never"
      }
    }],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "always"
    }],
    "vue/html-indent": ["error", 4],
    "vue/no-side-effects-in-computed-properties": ["off"],
    "vue/attributes-order": ["off"],
    "vue/prop-name-casing": ["error", "camelCase"]
  
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
