# Accessibility: SplitButton must have text content or accessible name on primaryActionButton prop (`@microsoft/fluentui-jsx-a11y/split-button-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

SplitButton without a label or accessible labeling lack an accessible name for assistive technology users.

SplitButton components need a visual label.

Please add label, or aria-labelledby.

<https://www.w3.org/WAI/standards-guidelines/act/rules/97a4e1/>

## Rule Details

This rule aims to...

Example of **incorrect** code for this rule:

```jsx
   <SplitButton
      menuButton={triggerProps}
      primaryActionButton={primaryActionButtonProps}
      icon={<CalendarMonthRegular />}
   />
```

Examples of **correct** code for this rule:

```jsx
   <SplitButton
      menuButton={triggerProps}
      primaryActionButton={primaryActionButtonProps}
   >
      Example
   </SplitButton>
```

```jsx
<SplitButton
   menuButton={triggerProps}
   primaryActionButton={{
      ref: setPrimaryActionButtonRef,
      "aria-label": "With calendar icon only",
   }}
   icon={<CalendarMonthRegular />}
   />
```