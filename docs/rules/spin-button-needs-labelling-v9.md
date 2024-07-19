# Accessibility: SpinButtons must have an accessible label (`@microsoft/fluentui-jsx-a11y/spin-button-needs-labelling-v9`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Spin Button components need a visual label.

Please add label, aria-labelledby or htmlFor.

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```jsx
<SpinButton defaultValue={10} min={0} max={20} />
```

```jsx

<Label>Default SpinButton</Label>
<SpinButton
    defaultValue={10}
    min={0}
    max={20}
/>
```

Examples of **correct** code for this rule:

```jsx
<Label>
    Default SpinButton
    <SomethingNesting>
        <SpinButton defaultValue={10} min={0} max={20} />
    </SomethingNesting>
</Label>
```

```jsx
<Label htmlFor={id}>Default SpinButton</Label>
<SpinButton
    defaultValue={10}
    min={0}
    max={20}
    id={id}
/>
```

```jsx
<Label id={id}>Default SpinButton</Label>
<SpinButton
    defaultValue={10}
    min={0}
    max={20}
    aria-labelledby={id}
/>
```

```jsx
<Field label="SpinButton">
    <SpinButton />
</Field>
```
