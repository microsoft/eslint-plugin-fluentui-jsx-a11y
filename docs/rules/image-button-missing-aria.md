# Accessibility: Image buttons must have accessible labelling: aria-label, aria-labelledby, aria-describedby (`@microsoft/fluentui-jsx-a11y/image-button-missing-aria`)

<!-- end auto-generated rule header -->

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

Image buttons without additional text content lack an accessible name.

Please add title, aria-label, aria-labelledby, aria-described by etc.

<https://www.w3.org/TR/html-aria/>

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

<Button icon={<CalendarMonthRegular />} />

```

Examples of **correct** code for this rule:

```js

<Button icon={<CalendarMonthRegular />} aria-label="Current month" />
<Button icon={<CalendarMonthRegular />} title="Current month" />

```
