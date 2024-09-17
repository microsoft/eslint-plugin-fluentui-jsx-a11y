# A DialogBody should have a header(DialogTitle), content(DialogContent), and footer(DialogActions) (`@microsoft/fluentui-jsx-a11y/dialogbody-needs-title-content-and-actions`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Accessibility: A DialogBody should have a header(DialogTitle), content(DialogContent), and footer(DialogActions).

<https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/>

## Ways to fix

-   Add DialogTitle, DialogContent and DialogActions inside DialogBody component.

## Rule Details

This rule aims to make Dialogs accessible

Examples of **incorrect** code for this rule:

```jsx
<DialogBody>
        <DialogContent>Test</DialogContent>
        <DialogActions>
            <Button>Close</Button>
            <Button>Do Something</Button>
        </DialogActions>
</DialogBody>
```

```jsx
<DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogActions>
            <Button>Close</Button>
            <Button>Do Something</Button>
        </DialogActions>
</DialogBody>
```

```jsx
<DialogBody>
    <DialogTitle>Dialog title</DialogTitle>
    <DialogContent>Test</DialogContent>
</DialogBody>
```

Examples of **correct** code for this rule:

```jsx
<DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>Test</DialogContent>
        <DialogActions>
            <Button>Close</Button>
            <Button>Do Something</Button>
        </DialogActions>
</DialogBody>
```
