# Accessibility: Image buttons must have accessible labelling: title, aria-label, aria-labelledby, aria-describedby (`@microsoft/fluentui-jsx-a11y/image-button-missing-aria`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Image buttons without additional text content lack an accessible name.

Please add title, aria-label, aria-labelledby, aria-described by etc.

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to prevent an icon button from not having an accessible name.

Examples of **incorrect** code for this rule:

```jsx
<Button icon={<CalendarMonthRegular />} />
<Button icon={<CalendarMonthRegular />}></Button>

<Label>Start date</Label>
<Button icon={<CalendarMonthRegular />} />
```

Examples of **correct** code for this rule:

```jsx
<Button icon={<CalendarMonthRegular />} title="Current month" />
<Button icon={<CalendarMonthRegular />} aria-label="Start date" />
<Button icon={<CalendarMonthRegular />}>Start date</Button>

<Label id="calendar-1">Start date</Label>
<Button icon={<CalendarMonthRegular />} aria-labelledby="calendar-1" />

<Tooltip content="With calendar icon only" relationship="label">
    <Button icon={<CalendarMonthRegular />} />
</Tooltip>
```
