# Accessibility: Toggle buttons must have accessible labelling: title, aria-label, aria-labelledby, aria-describedby (`@microsoft/fluentui-jsx-a11y/toggle-button-needs-labelling-v9`)

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Toggle buttons without additional text content lack an accessible name.

Please add title, aria-label, aria-labelledby, aria-described by etc.

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to prevent an icon button from not having an accessible name.

Examples of **incorrect** code for this rule:

```jsx
<ToggleButton/>
<ToggleButton></ToggleButton>

<Label id="calendar-2">Start date</Label>
<ToggleButton aria-labelledby="calendar-" />
```

Examples of **correct** code for this rule:

```jsx
<ToggleButton title="Toggle example" />
<ToggleButton aria-label="Toggle example" />
<ToggleButton>Toggle example</ToggleButton>

<Label id="calendar-1">Toggle example</Label>
<ToggleButton aria-labelledby="calendar-1" />

<Tooltip content="Toggle example" relationship="label">
    <ToggleButton/>
</Tooltip>
```
