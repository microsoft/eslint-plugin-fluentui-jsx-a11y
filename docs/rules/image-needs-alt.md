# Accessibility: Image must have alt attribute with a meaningful description of the image. If the image is decorative, use alt="" (`@microsoft/fluentui-jsx-a11y/image-needs-alt`)

💼 This rule is enabled in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## Rule details

This rule requires all `<Image>` components have non-empty alternative text. The `alt` attribute should provide a clear and concise text replacement for the image's content. It should *not* describe the presence of the image itself or the file name of the image. Purely decorative images should have empty `alt` text (`alt=""`).


Examples of **incorrect** code for this rule:

```jsx
<Image src="image.png" />
```

```jsx
<Image src="image.png" alt={null} />
```

Examples of **correct** code for this rule:

```jsx
<Image src="image.png" alt="A dog playing in a park." />
```

```jsx
<Image src="decorative-image.png" alt="" />
```

## Further Reading

- [`<img>` Accessibility](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#accessibility)
