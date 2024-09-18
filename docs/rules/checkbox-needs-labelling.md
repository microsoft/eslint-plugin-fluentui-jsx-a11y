# Accessibility: Checkbox without label must have an accessible and visual label: aria-labelledby (`@microsoft/fluentui-jsx-a11y/checkbox-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Checkboxes without a label or accessible labelling lack an accessible name.

<https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/>

## Ways to fix

-   Add a label, aria-label or aria-labelledby attribute or text content to the Checkbox tag.

## Rule Details

This rule aims to make Checkboxes accessible.

Examples of **incorrect** code for this rule:

```jsx
<Checkbox checked={true} />
<Checkbox></Checkbox>
```

```jsx
    <Label>This is a switch.</Label>
    <Checkbox
      checked={true}
      onChange={onChange}
    />
```

Examples of **correct** code for this rule:

```jsx
<Checkbox label="anything" checked={true} />
```

```jsx
    <Label id="my-label-1">This is a checkbox.</Label>
    <Checkbox
      checked={checked}
      onChange={onChange}
      aria-labelledby="my-label-1"
    />
```

```jsx
<Field hint="Checkboxes use their own label instead of the Field label.">
    <Checkbox label="Checkbox" />
</Field>
```
