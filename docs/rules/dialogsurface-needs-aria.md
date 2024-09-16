# DialogueSurface need accessible labelling: aria-describedby on DialogueSurface and aria-label or aria-labelledby(if DialogueTitle is missing) (`@microsoft/fluentui-jsx-a11y/dialogsurface-needs-aria`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

Accessibility: DialogueSurface must have a aria-describedby and aria-label or aria-labelledby(if DialogueTitle is missing).

<https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/>

## Ways to fix

-   Add a label with id, add the aria-describedby having same value as id to DialogueSurface.
-   Add a label with id, add the aria-labelledby having same value as id to DialogueSurface.
-   Add a aria-label to DialogueSurface.
-   Add DialogTitle inside DialogueSurface. 

## Rule Details

This rule aims to make Dialogs accessible

Examples of **incorrect** code for this rule:

```jsx
<DialogSurface>
    <DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>Test</DialogContent>
        <DialogActions>
            <Button>Close</Button>
            <Button>Do Something</Button>
        </DialogActions>
    </DialogBody>
</DialogSurface>
```

```jsx
<>
    <Label id="dialoge-test-id">My Label</Label>
        <DialogSurface aria-describedby="dialoge-test-id">
            <DialogBody>
                <DialogTitle></DialogTitle>
                <DialogContent>Test</DialogContent>
                <DialogActions>
                    <Button>Close</Button>
                    <Button>Do Something</Button>
                </DialogActions>
            </DialogBody>
    </DialogSurface>
</>
```

Examples of **correct** code for this rule:

```jsx
<>
    <span id="dialoge-test-id">My Label</span>
    <DialogSurface aria-describedby="dialoge-test-id">
        <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>Test</DialogContent>
            <DialogActions>
                <Button>Close</Button>
                <Button>Do Something</Button>
            </DialogActions>
        </DialogBody>
    </DialogSurface>
</>
```

```jsx
<>
    <Label id="dialoge-test-id">My Label</Label>
    <DialogSurface aria-describedby="dialoge-test-id" aria-label="test-label">
        <DialogBody>
            <DialogTitle></DialogTitle>
            <DialogContent>Test</DialogContent>
            <DialogActions>
                    <Button>Close</Button>
                    <Button>Do Something</Button>
            </DialogActions>
        </DialogBody>
    </DialogSurface>
</>
```

```jsx
<>
    <div id="dialoge-test-id-desc">My Label1</div>
    <span id="dialoge-test-id-label">My Label2</span>
    <DialogSurface aria-describedby="dialoge-test-id-desc" aria-labelledby="dialoge-test-id-label">
        <DialogBody>
            <DialogTitle></DialogTitle>
            <DialogContent>Test</DialogContent>
            <DialogActions>
                <Button>Close</Button>
                <Button>Do Something</Button>
            </DialogActions>
        </DialogBody>
    </DialogSurface>
</>
```
