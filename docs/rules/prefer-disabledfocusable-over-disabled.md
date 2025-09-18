# Prefer 'disabledFocusable' over 'disabled' when component has loading state (`@microsoft/fluentui-jsx-a11y/prefer-disabledfocusable-over-disabled`)

⚠️ This rule is enabled in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

When components are in a loading state, prefer using `disabledFocusable` over `disabled` to maintain proper keyboard navigation flow and accessibility.

## Rule Details

This rule encourages the use of `disabledFocusable` instead of `disabled` when components have loading state indicators. This ensures:

1. **Keyboard Navigation**: The component remains in the keyboard tab order, allowing users to discover and navigate to it
2. **Screen Reader Compatibility**: Screen reader users can still navigate to and understand the component's state  
3. **Loading State Awareness**: Users understand that the component is temporarily unavailable due to loading, not permanently disabled
4. **Consistent UX**: Provides a more predictable and accessible user experience

### Accessibility Impact

- `disabled` removes elements completely from the tab order (tabindex="-1")
- `disabledFocusable` keeps elements in the tab order while conveying disabled state via `aria-disabled="true"`
- Loading states are temporary conditions where users benefit from knowing the component exists and will become available

### Applicable Components

This rule applies to FluentUI components that support both `disabled` and `disabledFocusable` props:

**Button Components:** `Button`, `ToggleButton`, `CompoundButton`, `MenuButton`, `SplitButton`
**Form Controls:** `Checkbox`, `Radio`, `Switch`  
**Input Components:** `Input`, `Textarea`, `Combobox`, `Dropdown`, `SpinButton`, `Slider`, `DatePicker`, `TimePicker`
**Other Interactive:** `Link`, `Tab`

### Loading State Indicators

The rule detects these loading-related props:
- `loading`
- `isLoading`
- `pending` 
- `isPending`
- `busy`
- `isBusy`

## Examples

### ❌ Incorrect

```jsx
<Button disabled loading>Submit</Button>
<ToggleButton disabled isLoading />
<Checkbox disabled pending />
<Input disabled={true} busy={isBusy} />
<SpinButton disabled={isDisabled} loading={isSubmitting} />
<Combobox disabled pending />
```

### ✅ Correct

```jsx
<Button disabledFocusable loading>Submit</Button>
<ToggleButton disabledFocusable isLoading />
<Checkbox disabledFocusable pending />
<Input disabledFocusable={true} busy={isBusy} />
<SpinButton disabledFocusable={isDisabled} loading={isSubmitting} />
<Combobox disabledFocusable pending />

<!-- These are acceptable since no loading state is present -->
<Button disabled>Cancel</Button>
<Checkbox disabled />
<Input disabled={permanentlyDisabled} />

<!-- These are acceptable since component is not disabled -->
<Button loading>Submit</Button>
<SpinButton isLoading />
<Input busy />
```

## Edge Cases & Considerations

### Both Props Present
If both `disabled` and `disabledFocusable` are present, this rule will not trigger as it represents a different configuration issue.

```jsx
<!-- Rule will not trigger - different concern -->
<Button disabled disabledFocusable loading>Submit</Button>
```

### Non-Loading Disabled States
The rule only applies when both disabled AND loading states are present:

```jsx
<!-- ✅ Acceptable - no loading state -->
<Button disabled>Permanently Disabled Action</Button>
```

### Complex Expressions
The rule works with boolean expressions and variables:

```jsx
<!-- ❌ Will trigger -->
<Button disabled={!isEnabled} loading={isSubmitting}>Submit</Button>

<!-- ✅ Correct -->
<Button disabledFocusable={!isEnabled} loading={isSubmitting}>Submit</Button>
```

## When Not To Use It

You may want to disable this rule if:

1. **Intentional UX Decision**: You specifically want loading components removed from tab order
2. **Legacy Codebase**: Existing implementations rely on specific disabled behavior during loading
3. **Custom Loading Patterns**: Your application uses non-standard loading state management

However, disabling this rule is generally **not recommended** as it reduces accessibility.

## Automatic Fixes

The rule provides automatic fixes that replace `disabled` with `disabledFocusable` while preserving the original prop value:

```jsx
// Before fix
<Button disabled={isSubmitting} loading>Submit</Button>

// After fix  
<Button disabledFocusable={isSubmitting} loading>Submit</Button>
```

## Related Rules

- [`no-empty-buttons`](./no-empty-buttons.md) - Ensures buttons have content or accessible labeling
- [`prefer-aria-over-title-attribute`](./prefer-aria-over-title-attribute.md) - Improves screen reader compatibility

## Further Reading

- [WAI-ARIA: Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
- [FluentUI Accessibility Guidelines](https://react.fluentui.dev/?path=/docs/concepts-developer-accessibility--page)
- [Understanding ARIA: disabled vs aria-disabled](https://css-tricks.com/making-disabled-buttons-more-inclusive/)
