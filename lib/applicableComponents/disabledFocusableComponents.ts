// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * FluentUI components that support both 'disabled' and 'disabledFocusable' props
 * These are components where the rule should apply
 */
const disabledFocusableComponents = [
    // Button components
    "Button",
    "ToggleButton",
    "CompoundButton",
    "MenuButton",
    "SplitButton",

    // Form controls
    "Checkbox",
    "Radio",
    "Switch",

    // Input components
    "Input",
    "Textarea",
    "Combobox",
    "Dropdown",
    "SpinButton",
    "Slider",
    "DatePicker",
    "TimePicker",

    // Other interactive components
    "Link",
    "Tab"
] as const;

export { disabledFocusableComponents };
