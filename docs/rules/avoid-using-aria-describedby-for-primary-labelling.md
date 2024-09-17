# aria-describedby provides additional context and is not meant for primary labeling. (`avoid-using-aria-describedby-for-primary-labelling`)

You should avoid using `aria-describedby` as a primary labeling mechanism because it is intended to provide supplementary or additional information, not to act as the main label for an element.

**Purpose:** `aria-describedby` is designed to describe an element in more detail beyond the primary label, such as offering extended help text, usage instructions, or explanations. It’s meant to be used alongside a label, not to replace it.

**Accessibility and User Experience:** Some screen readers may not announce content associated with `aria-describedby`, or users might disable this feature for various reasons, such as reducing verbosity or simplifying their experience. This makes relying on `aria-describedby` as the primary labeling mechanism risky because it can lead to critical information being missed by users who need it. Screen readers treat `aria-describedby` differently than `aria-labelledby`. The `aria-labelledby` attribute is explicitly used for primary labeling, and it ensures that the name of an element is read in the expected order and with the right emphasis. On the other hand, `aria-describedby` provides additional context that may be read after the main label, so it may confuse users if used as the primary label.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<Button aria-describedby="submitDesc icon={<CalendarMonthRegular />} />
<p id="submitDesc">Click to submit your form. This will save your data.</p>
```

```jsx
<TextField id="myInput" aria-describedby="nameDesc" placeholder="Enter your name" />
<p id="nameDesc">Name</p>
```

Examples of **correct** code for this rule:

```jsx
<Button aria-label="submit" aria-describedby="submitDesc icon={<CalendarMonthRegular />} />
<p id="submitDesc">Click to submit your form. This will save your data.</p>
```

```jsx
<Label htmlFor="myInput">Name</Label>
<TextField id="myInput" aria-describedby="nameDesc" placeholder="Enter your name" />
<p id="nameDesc">This field is for your full legal name.</p>
```

## Further Reading

-   [ARIA Describedby: Definition & Examples for Screen Readers](https://accessiblyapp.com/blog/aria-describedby/)
-   [aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby)

