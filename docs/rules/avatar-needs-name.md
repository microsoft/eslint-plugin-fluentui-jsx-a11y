# Accessibility: Avatar must have an accessible labelling: name, aria-label, aria-labelledby (`@microsoft/fluentui-jsx-a11y/avatar-needs-name`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Avatar lacks an accessible name without a name or accessible labelling.

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to prevent an avatar from not having an accessible name.

Examples of **incorrect** code for this rule:

```jsx
<Avatar image={{ src: "example-image" }} />
<Avatar image={{ src: "example-image" }}></Avatar>

<Label>Start date</Label>
<Avatar image={{ src: "example-image" }} />
```

Examples of **correct** code for this rule:

```jsx
<Avatar image={{ src: "example-image" }} name="Jane Doe" />
<Avatar image={{ src: "example-image" }} aria-label="Jane Doe" />

<Label id="label-1">Jane Doe</Label>
<Avatar image={{ src: "example-image" }} aria-labelledby="label-1" />
```
