# Accessibility: RadioGroup without label must have an accessible and visual label: aria-labelledby (`@microsoft/fluentui-jsx-a11y/radiogroup-missing-label`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

RadioGroup without a label or accessible labeling lack an accessible name.

<https://www.w3.org/WAI/standards-guidelines/act/rules/e086e5/>

## Ways to fix

-   Add a label, aria-label or aria-labelledby attribute to the RadioGroup tag.

## Rule Details

This rule aims to make Radioes accessible.

Examples of **incorrect** code for this rule:

```jsx
<RadioGroup />
<Radio></Radio>
```

```jsx
    <Label>This is a switch.</Label>
    <RadioGroup
      onChange={onChange}
    />
```

Examples of **correct** code for this rule:

```jsx
<RadioGroup label="anything" checked={true} />
```

```jsx
    <Label id="my-label-1">This is a Radio.</Label>
    <RadioGroup
      checked={checked}
      onChange={onChange}
      aria-labelledby="my-label-1"
    />
```

```jsx
<RadioGroup aria-label="anything" checked={true} />
```

```jsx
<Field label="RadioGroup">
    <RadioGroup>
        <Radio label="Option 1" />
        <Radio label="Option 2" />
        <Radio label="Option 3" />
    </RadioGroup>
</Field>
```
