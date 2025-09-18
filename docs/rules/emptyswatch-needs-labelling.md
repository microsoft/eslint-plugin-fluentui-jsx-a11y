# Accessibility: EmptySwatch must have an accessible name via aria-label, Tooltip, aria-labelledby, etc. (`@microsoft/fluentui-jsx-a11y/emptyswatch-needs-labelling`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

All interactive elements must have an accessible name.

`EmptySwatch` without a supported label lacks an accessible name for assistive technology users.

## Allowed labelling strategies

- ✅ `aria-label` **on `EmptySwatch`**
- ✅ `aria-labelledby` **on `EmptySwatch`**
- ✅ `htmlFor`/`id` (native `<label htmlFor="…">` ↔ `id="…"` on `EmptySwatch`)
- ✅ Wrapping native `<label>…</label>`
- ✅ `Tooltip` parent with `relationship="label"`
- ✅ Text content child (e.g., `<EmptySwatch>None</EmptySwatch>`)
- ❌ `Field` parent (not allowed for `EmptySwatch`)
- ❌ Container-only label (e.g., only the surrounding `SwatchPicker` is labelled)

## Ways to fix

- Add `aria-label`/`aria-labelledby` to `EmptySwatch`.
- Use `<label htmlFor="…">` + `id="…"` on `EmptySwatch`.
- Wrap in a native `<label>` or `Tooltip (relationship="label")`.
- Provide meaningful text **as the child** of `EmptySwatch`.

## Rule Details

This rule ensures `EmptySwatch` is labelled using **allowed** mechanisms.

### Examples of **incorrect** code

```jsx
// No label
<SwatchPicker>
  <EmptySwatch value="none" />
</SwatchPicker>
```

```jsx
// Container-only label: EmptySwatch itself is unnamed
<SwatchPicker aria-label="Color picker">
  <EmptySwatch value="none" />
</SwatchPicker>
```

```jsx
// Not allowed: Field parent labelling
<SwatchPicker>
  <Field label="No color">
    <EmptySwatch value="none" />
  </Field>
</SwatchPicker>
```

### Examples of **correct** code

```jsx
// aria-label
<SwatchPicker>
  <EmptySwatch value="none" aria-label="No color" />
</SwatchPicker>
```

```jsx
// aria-labelledby
<>
  <span id="empty-no-color">No color</span>
  <SwatchPicker>
    <EmptySwatch value="none" aria-labelledby="empty-no-color" />
  </SwatchPicker>
</>
```

```jsx
// htmlFor/id
<>
  <label htmlFor="empty-none">No color</label>
  <SwatchPicker>
    <EmptySwatch id="empty-none" value="none" />
  </SwatchPicker>
</>
```

```jsx
// Wrapping native <label>
<label>
  No color
  <EmptySwatch value="none" />
</label>
```

```jsx
// Tooltip (acts as a label)
<SwatchPicker>
  <Tooltip relationship="label" content="No color">
    <EmptySwatch value="none" />
  </Tooltip>
</SwatchPicker>
```

```jsx
// Text content child
<SwatchPicker>
  <EmptySwatch value="none">No color</EmptySwatch>
</SwatchPicker>
```
