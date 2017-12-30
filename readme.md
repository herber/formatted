# Formatted

A simple JavaScript code-formatter powered by [prettier](https://github.com/prettier/prettier)

## Features

- Zero config necessary
- Automatic - you don't need to do anything
- Fully configurable

## Install

```bash
$ npm install -g formatted
```

## Usage

```bash
cd my-project
formatted
# that's it
```

## Configuration

Although no configuration is necessary formatted can be configured to your needs.

Custom configurations can be stored in `.formattedrc`, `formatted.config.js` and in the `formatted` property in your `package.json`.

### Configuration properties

| Name           | Description                              | Default |
| -------------- | ---------------------------------------- | ------- |
| semi           | If set to `true` expressions must end with a semicolon | `true`  |
| printWidth     | The maximum length of a line             | 100     |
| tabWidth       | The number of spaces per indentation-level | 2       |
| useTabs        | If set to `true` formatted will indent with tabs | `false` |
| singleQuote    | Use single quotes instead of double quotes | `true`  |
| trailingComma  | Where to add trailing commas             | `none`  |
| bracketSpacing | Spaces between brackets in object literals | `true`  |

For more details check out prettier's [docs](https://prettier.io/docs/en/options.html) 

## License

MIT © [Tobias Herber](http://tobihrbr.com)
