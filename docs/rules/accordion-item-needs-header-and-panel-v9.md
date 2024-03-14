# An AccordionItem needs exactly one header and one panel (`@microsoft/fluentui-jsx-a11y/accordion-item-needs-header-and-panel-v9`)

<!-- end auto-generated rule header -->

The ESLint rule is designed to enforce accessibility standards in React components, specifically ensuring an accordion component has one button (as a header) which controls one panel region.

## Rule Details

Accordions are common UI components that allow users to expand and collapse sections of content.

For an accordion to be accessible:

Each accordion header should be implemented as a button. This is because buttons are inherently accessible, providing keyboard and screen reader support. Making the accordion header a button ensures that users can interact with it using keyboard commands or assistive technologies.

Each accordion panel should be marked as a region that is controlled by the accordion header. This can be achieved using attributes like aria-controls to link the header to the panel. The panel should be appropriately labeled to ensure it can be identified and understood by users of assistive technologies.

Examples of **incorrect** code for this rule:

```jsx
<Accordion>
    <AccordionItem>
        <AccordionHeader>Accordion Header 1</AccordionHeader>
        <AccordionHeader>Accordion Header 2</AccordionHeader>
        <AccordionPanel>
            <div>Accordion Panel 1</div>
        </AccordionPanel>
    </AccordionItem>
</Accordion>
```

```jsx
<Accordion>
    <AccordionItem>
        <AccordionHeader>Accordion Header 1</AccordionHeader>
        <AccordionPanel>
            <div>Accordion Panel 1</div>
        </AccordionPanel>
        <AccordionPanel>
            <div>Accordion Panel 2</div>
        </AccordionPanel>
    </AccordionItem>
</Accordion>
```

Examples of **correct** code for this rule:

```jsx
<Accordion>
    <AccordionItem>
        <AccordionHeader>Accordion Header 1</AccordionHeader>
        <AccordionPanel>
            <div>Accordion Panel 1</div>
        </AccordionPanel>
    </AccordionItem>
</Accordion>
```

## Further Reading

[ARIA Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

