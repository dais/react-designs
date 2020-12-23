module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true
  },
  "extends": [
    "eslint:recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "@typescript-eslint"
  ],
  "rules": {
    "no-console": 1,
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "camelcase":0,
    "default-case": 0,
    "consistent-return": 0,
    "import/no-duplicates": 0,
    "import/extensions": 0,
    "react/jsx-uses-vars": 1,
    "react/prop-types": 0,
    "react/no-string-refs": 0,
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": 0,
    "react/jsx-filename-extension": [2, { "extensions": [".jsx", ".tsx"]}],
    "import/prefer-default-export": 0,
    "@typescript-eslint/no-empty-function": 0,
    "jsx-a11y/label-has-associated-control": [ 2, {
      "controlComponents": ["Checkbox", "TextField", "TextArea", "Select"],
    }],
    // next.js対応
    "jsx-a11y/label-has-for": 0,
    "react/jsx-uses-react": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/react-in-jsx-scope": 0,
    // storybook対応
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*!(stories).ts", "**/*!(stories).tsx"]}]
  },
  "globals": {
    "React": "writable"
  },
  settings: {
    "import/resolver": {
      // this loads <rootdir>/tsconfig.json to eslint
      typescript: {}
    },
    react: {
      version: "detect"
    }
  },
};
