# Accessibility: Field must have either label, validationMessage and hint attributes (`@microsoft/fluentui-jsx-a11y/field-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Field must have `label` prop and either `validationMessage` or `hint` prop.

<https://www.w3.org/TR/html-aria/>

## Ways to fix

-   Make sure that Field component has following props:
    -   `label`
    -   `validationMessage` or `hint`

## Rule Details

This rule aims to make Field component accessible.

Examples of **incorrect** code for this rule:

```jsx
<Field
    label="Example field"
    validationState="success"
>
    <ProgressBar value={0.5} max={1} />
</Field>
```

```jsx
<Field
    validationState="success"
    hint="This is a hint."
>
    <ProgressBar value={0.5} max={1} />
</Field>
```

Examples of **correct** code for this rule:

```jsx
<Field
    label="Example field"
    validationState="success"
    validationMessage="This is a success message."
>
    <ProgressBar value={0.5} max={1} />
</Field>
```

```jsx
<Field
    label="Example field"
    validationState="success"
    hint="This is a hint."
>
    <ProgressBar value={0.5} max={1} />
</Field>
```
