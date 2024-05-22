# Using aria over the title attribute for primary accessibility labeling is generally recommended. (`prefer-aria-over-title-attribute-v9`)

Please describe the origin of the rule here.

## Rule Details

Using aria-label over the title attribute for accessibility labeling is generally recommended for several reasons:

Screen Reader Support:

aria-label is specifically designed for accessibility and is better supported by screen readers. Screen readers will consistently read out the aria-label content, making it clear to users what the purpose of the element is.
The title attribute is not consistently read by screen readers, and its behavior can vary depending on the screen reader and the user's settings.
Usability:

The title attribute typically displays as a tooltip when the user hovers over the element with a mouse. However, this is not helpful for users who navigate via keyboard or touch devices, where tooltips are not displayed.
aria-label provides a reliable method for labeling elements that works across different interaction methods (keyboard, touch, mouse).
Visual Focus:

The title attribute is not visible on focus, which means users navigating with a keyboard won't see the tooltip and may miss important information.
aria-label ensures that the label information is available to assistive technologies regardless of how the user interacts with the page.
Consistency:

Using aria-label ensures that labeling is consistently available and presented to users of assistive technologies, promoting a more predictable and accessible user experience.

Examples of **incorrect** code for this rule:

```jsx
<Button icon={<CloseIcon />} title="hello"></Button>
```

Examples of **correct** code for this rule:

The aria-label will override the title attribute but the title will still display when a mouse is hovered over it.

```jsx
<Button icon={<CalendarMonthRegular />} aria-label="hello world" title="hello world"></Button>
```

