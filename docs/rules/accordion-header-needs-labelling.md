# The accordion header is a button and it needs an accessibile name e.g. text content, aria-label, aria-labelledby (`@microsoft/fluentui-jsx-a11y/accordion-header-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

The ESLint rule is designed to enforce accessibility standards in React components, specifically ensuring an accordion header is accessible to screen reader users.

## Rule Details

Accordions are common UI components that allow users to expand and collapse sections of content.

For an accordion to be accessible:

Each accordion header should be implemented as a button. This is because buttons are inherently accessible, providing keyboard and screen reader support. Making the accordion header a button ensures that users can interact with it using keyboard commands or assistive technologies.

Each accordion panel should be marked as a region that is controlled by the accordion header. This can be achieved using attributes like aria-controls to link the header to the panel. The panel should be appropriately labeled to ensure it can be identified and understood by users of assistive technologies.

Examples of **incorrect** code for this rule:

```jsx
<AccordionHeader icon={<RocketRegular />}></AccordionHeader>
```

```jsx
<AccordionHeader icon={<RocketRegular />} expandIcon={<RocketRegular />}></AccordionHeader>
```

```jsx
<Label>Heading 1</Label>
<AccordionHeader icon={<RocketRegular />} expandIcon={<RocketRegular />}></AccordionHeader>
```

Examples of **correct** code for this rule:

```jsx
<AccordionHeader>Accordion Header 1</AccordionHeader>
```

```jsx
<AccordionHeader icon={<RocketRegular />}>Accordion Header 1</AccordionHeader>
```

## Further Reading

[ARIA Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
