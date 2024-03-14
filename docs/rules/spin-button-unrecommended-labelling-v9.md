# Accessibility: Unrecommended accessibility labelling - SpinButton (`@microsoft/fluentui-jsx-a11y/spin-button-unrecommended-labelling-v9`)

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Spin Button components need a visual label.

Using aria-label or wrapping the SpinButton in a Tooltip component is not recommended.

<https://www.w3.org/TR/html-aria/>


## Rule Details

This rule aims to...

Examples of **unrecommended** code for this rule:

```jsx
<SpinButton defaultValue={10} min={0} max={20} aria-label={"my-aria-label-1"} />
```

```jsx

<Tooltip content="Spin Button label" relationship="label">
    <SpinButton
        defaultValue={10}
        min={0}
        max={20}
    />
</Tooltip>
```

Examples of **correct** code for this rule:

```jsx
<Label>
    Default SpinButton
    <SomethingNesting>
        <SpinButton
            defaultValue={10}
            min={0}
            max={20}
        />
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
