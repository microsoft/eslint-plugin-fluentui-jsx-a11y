# Accessibility: Progressbar must have aria-valuemin, aria-valuemax, aria-valuenow, aria-describedby and either aria-label or aria-labelledby attributes (`@microsoft/fluentui-jsx-a11y/progressbar-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

ProgressBar must have aria-valuemin, aria-valuemax, aria-valuenow, and aria-describedby attributes.

<https://www.w3.org/TR/html-aria/>

<https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live>

<https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label>

## Ways to fix

-   Make sure that ProgressBar component has following attributes:
    -   aria-valuemin
    -   aria-valuemax
    -   aria-valuenow
    -   aria-describedby
    -   either aria-label or aria-labelledby
- aria-labelledby can also be derived from parent Field component.
- aria-describedby is appended to parent Field component's validationMessage and hint props.
- Make sure that the parent Field components is also accessible.

## Rule Details

This rule aims to make ProgressBars accessible.

Examples of **incorrect** code for this rule:

Missing `aria-valuemin`
```jsx
<Field
    label="Example field"
    validationState="success"
    validationMessage="This is a warning message."
> 
    <ProgressBar value={0.5} aria-valuemax={1} aria-valuenow={0.5} aria-describedby="desc1" />
</Field>
```

Missing `aria-valuenow`
```jsx
<Field
    label="Example field"
    validationState="success"
    validationMessage="This is a test message."
> 
    <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-describedby="desc1" />
</Field>
```

Missing `aria-describedby`
```jsx
<Field
    validationState="success"
    validationMessage="This is not a success message."
> 
    <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} />
</Field>
```

Missing `aria-valuemax` and `aria-describedby`
```jsx
<Field
    label="Example field"
    validationState="success"
    validationMessage="This is an error message."
> 
    <ProgressBar value={0.5} aria-valuemin={0} aria-valuenow={0.5} />
</Field>
```

Missing parent Field component
```jsx
<ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} />
```

Examples of **correct** code for this rule:

```jsx
<Field
    label="Example field"
    validationState="success"
    validationMessage="This is a success message."
>
    <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} aria-describedby="desc1" aria-label="label1"/>
</Field>
```

```jsx
<Field
    label="Example field"
    validationState="success"
    hint="my hint"
>
    <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} aria-describedby="desc1" aria-labelledby="color"/>
</Field>
```

```jsx
<Field
    label="Example field"
    validationState="success"
    validationMessage="This is a warning message."
    hint="other hint"
>
    <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} aria-describedby="desc3" aria-label="label2"/>
</Field>
```
