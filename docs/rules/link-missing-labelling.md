# Accessibility: Image links must have an accessible name. Add either text content, labelling to the image or labelling to the link itself (`@microsoft/fluentui-jsx-a11y/link-missing-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Links that contain Images without additional text content lack an accessible name.

Ways to fix:

1. Add a title, aria-label or aria-labelledby attribute or text content to the Link element.
2. Add a alt text, title, aria-label or aria-labelledby attribute to the Image element.

<https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/>

## Rule Details

This rule aims to make Image links accessible.

Examples of **incorrect** code for this rule:

```jsx
<Link href="#test"><Image src="/test.png"/></Link>
<Link href="#test" title=""><Image src="/test.png"/></Link>
<Link href="#test"><Image src="/test.png" title=""/></Link>
```

Examples of **correct** code for this rule:

```jsx
<Link href="#test"><Image src="/test.png"/>This is a label link</Link>
<Link href="#test" title="This is a title for the link"><Image src="/test.png"/></Link>
<Link href="#test"><Image src="/test.png" title="This is a title for the image link"/></Link>
<Link href="#test"><Image src="/test.png" aria-label="This is an aria-label for the image link"/></Link>
<Link href="#test"><Image src="/test.png" aria-labelledby="id1"/></Link>
```
