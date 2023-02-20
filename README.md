# fluentui-eslint-plugin-jsx-a11y

A set of eslint rules against [FluentUI](https://github.com/microsoft/fluentui) to prevent common accessibility issues.

Rules for FluentUI v9 end in `-v9`. [Fluent UI React v9](https://react.fluentui.dev/?path=/docs/concepts-introduction--page)

Rules for v8 have no ending.

Developed and maintained by the [MWT Dublin Accessibility V-Team](https://domoreexp.visualstudio.com/Teamspace/_wiki/wikis/Teamspace.wiki/28464/Accessibility-Contacts).

## Why?

This plugin does a static code analysis of the React JSX to spot accessibility issues in apps built with FluentUI. That way, common accessibility issues are detected before the pull request stage and will be prevented from being checked into a code base.

As the plugin can only catch errors in static source code, please use it in combination with [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react) to test the accessibility of the rendered DOM. Consider these tools just as one step of a larger a11y testing process and always test your apps with assistive technology.

We also recomend that you use this plugin in conjuction with the [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) plugin. Please configure [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) to work with FluentUI components.

Example:

```json
{
  "settings": {
    "jsx-a11y": {
      "components": {
        "Button": "button",
        "Image": "img"
      }
    }
  }
}
```

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
| [unlabelled-checkbox](docs/rules/unlabelled-checkbox.md)                                                     | Accessibility: Checkboxes without label must have accessible labelling: aria-label, aria-labelledby, aria-describedby                                                                                                  |    |

<!-- end auto-generated rules list -->
