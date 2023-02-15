# Accessibility: Image links must have an accessible name (`@microsoft/fluentui-jsx-a11y/image-link-missing-aria-v9`)

All interactive elements must have an accessible name.

Links that contain Images without additional text content lack an accessible name.

Ways to fix:

1) Add a title attribute or text content to the Link tag.
2) Add a title, aria-label or aria-labelledby attribute to the Image tag.

<https://www.w3.org/WAI/standards-guidelines/act/rules/c487ae/>

## Rule Details

This rule aims to make Image links accessible.

Examples of **incorrect** code for this rule:

```js

<Link href="#test"><Image src="/test.png"/></Link>
<Link href="#test" title=""><Image src="/test.png"/></Link>
<Link href="#test"><Image src="/test.png" title=""/></Link>

```

Examples of **correct** code for this rule:

```js

<Link href="#test"><Image src="/test.png"/>This is a label link</Link>
<Link href="#test" title="This is a title for the link"><Image src="/test.png"/></Link>
<Link href="#test"><Image src="/test.png" title="This is a title for the image link"/></Link>
<Link href="#test"><Image src="/test.png" aria-label="This is an aria-label for the image link"/></Link>
<Link href="#test"><Image src="/test.png" aria-labelledby="id1"/></Link>

```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
