# Accessibility: Progressbar must have aria-valuemin, aria-valuemax, aria-valuenow, aria-describedby and either aria-label or aria-labelledby attributes (`@microsoft/fluentui-jsx-a11y/progressbar-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

ProgressBar must have `max` or `aria-valuemin`, `aria-valuemax` and `aria-valuenow` attributes. It also must have an accessible `Field` parent or appropriate labelling using `aria-describedby` and `aria-label`/`aria-labelledby` .

<https://www.w3.org/TR/html-aria/>

## Ways to fix

-   Make sure that ProgressBar component has following attributes:
    -   Either have a `max` prop or `aria-valuemin`, `aria-valuemax` and `aria-valuenow` attributes
    -   Either have an accessible `Field` parent or have `aria-describedby` and either `aria-label` or `aria-labelledby`

Notes:
- aria-labelledby is also be derived from parent Field component.
- aria-describedby is appended to parent Field component's validationMessage and hint props.
- Make sure that the parent Field components is also accessible.

## Rule Details

This rule aims to make ProgressBars accessible.

Examples of **incorrect** code for this rule:

Missing `max` and `aria-valuemin`, `aria-valuemax` and `aria-valuenow`
```jsx
<Field
label="Example field"
validationState="success"
validationMessage="This is a warning message."
> 
    <ProgressBar value={0.5}/>
</Field>
```

Missing `aria-valuemax`
```jsx
<Field
label="Example field"
validationState="success"
validationMessage="This is an error message."
> 
    <ProgressBar value={0.5} aria-valuemin={0} aria-valuenow={0.5} />
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

Missing `aria-valuemax`
```jsx
<Field
    label="Example field"
    validationState="success"
    validationMessage="This is an error message."
> 
    <ProgressBar value={0.5} aria-valuemin={0} aria-valuenow={0.5} />
</Field>
```

Missing `aria-describedby` and `aria-label`/`aria-labelledby`
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
    <ProgressBar value={0.5} max={1}/>
</Field>`
```

```jsx
<Field
    label="Example field"
    validationState="success"
    validationMessage="This is a success message."
>
    <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5}/>
</Field>
```

```jsx
<ProgressBar value={0.5} max={5} aria-describedby="desc1" aria-labelledby="color"/>
```

```jsx
<ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5} aria-describedby="desc1" aria-labelledby="color"/>
```

```jsx
<Field
    label="Example field"
    validationState="success"
    validationMessage="This is a warning message."
    hint="other hint"
>
    <ProgressBar value={0.5} aria-valuemin={0} aria-valuemax={1} aria-valuenow={0.5}/>
</Field>
```
