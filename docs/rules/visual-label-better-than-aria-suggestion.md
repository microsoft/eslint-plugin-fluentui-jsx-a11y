# Visual label is better than an aria-label (`@microsoft/fluentui-jsx-a11y/visual-label-better-than-aria-suggestion`)

⚠️ This rule _warns_ in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

For component like Dropdown, SpinButton, it's good to have a aria-label for screen reader users but visual labels are considered better because they're also useful for sighted user and comes in screen announcement as well.

## Rule Details

This rule aims to encourage the usage of visual labels in place of aria-label

Examples of **incorrect** code for this rule:

```jsx
<Dropdown aria-label="This is a Dropdown" />
```

Examples of **correct** code for this rule:

```jsx
<><Label id="my-dropdownid">This is the visual label</Label><Dropdown aria-labelledby="my-dropdownid" /></>
```
