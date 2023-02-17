# Project

## ***Under Construction***

A set of eslint rules against [FluentUI](https://fluentsite.z22.web.core.windows.net/0.64.0) to prevent common accessibility issues.

## ESLint

This plugin was generated with The ESLint generator for Yeoman: [eslint/generator-eslint](https://github.com/eslint/generator-eslint).

### eslint:plugin

```sh
yo eslint:plugin
```

### eslint:rule

If you want to create a new ESLint rule, make sure you're in the top-level directory of an ESLint repo clone or an ESLint plugin and type:

```sh
yo eslint:rule
```

## Installation

Before installing, make sure to authenticate with GitHub Package Registry or using a `.npmrc` file. See "[Configuring npm for use with GitHub Package Registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry)."

`$ npm install -D @microsoft/fluentui-eslint-plugin-jsx-a11y`

Or add this package to your `package.json` file:

```sh
"devDependencies": {
    "@microsoft/fluentui-eslint-plugin-jsx-a11y": "1.0.0"
  }
```

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

## Rules
<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                                                         | Description                                                                                                                                                                                                            | 🔧 |
| :----------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :- |
| [icon-text-content-button-does-not-need-aria](docs/rules/icon-text-content-button-does-not-need-aria.md)     | Accessibility: an image button with text content does not need aria labelling. The button already has an accessible name and the aria-label or aria-labelledby will override the text content for screen reader users. |    |
| [image-button-missing-aria](docs/rules/image-button-missing-aria.md)                                         | Accessibility: Image buttons must have accessible labelling: aria-label, aria-labelledby, aria-describedby                                                                                                             |    |
| [image-button-prefer-aria-over-title-attribute](docs/rules/image-button-prefer-aria-over-title-attribute.md) | Accessibility: prefer wai-aria over title or placeholder attributes. Title/placeholder can be used in addition to wai-aria. aria-label, aria-labelledby, aria-describedby                                              |    |
| [image-link-missing-aria-v9](docs/rules/image-link-missing-aria-v9.md)                                       | Accessibility: Image links must have an accessible name                                                                                                                                                                | 🔧 |
| [input-missing-label-v9](docs/rules/input-missing-label-v9.md)                                               | Accessibility: Inputs must have accessible labelling: aria-label, aria-labelledby or an associated label                                                                                                               |    |
| [no-empty-buttons](docs/rules/no-empty-buttons.md)                                                           | Accessibility: buttons must either text content or accessible labelling                                                                                                                                                |    |
| [object-literal-button-no-missing-aria](docs/rules/object-literal-button-no-missing-aria.md)                 | Accessibility: Object literal image buttons must have accessible labelling: aria-label, aria-labelledby, aria-describedby                                                                                              |    |
| [text-area-missing-label-v9](docs/rules/text-area-missing-label-v9.md)                                       | Accessibility: Textarea must have an accessible name                                                                                                                                                                   |    |
| [text-content-button-does-not-need-aria](docs/rules/text-content-button-does-not-need-aria.md)               | Accessibility: a button with text content does not need aria labelling. The button already has an accessible name and the aria-label will override the text content for screen reader users.                           |    |

<!-- end auto-generated rules list -->