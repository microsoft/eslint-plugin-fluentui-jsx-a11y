// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

"use strict";
console.log("Loading my-eslint-plugin");
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
    rules: {
        "checkbox-needs-labelling-v9": require("./rules/checkbox-needs-labelling-v9"),
        "image-button-missing-aria": require("./rules/image-button-missing-aria"),
        "image-link-missing-aria-v9": require("./rules/image-link-missing-aria-v9"),
        "input-missing-label-v9": require("./rules/input-missing-label-v9"),
        "menu-item-needs-labelling-v9": require("./rules/menu-item-needs-labelling-v9"),
        "switch-needs-labelling-v9": require("./rules/switch-needs-labelling-v9"),
        "text-area-missing-label-v9": require("./rules/text-area-missing-label-v9"),
        "image-button-missing-aria-v9": require("./rules/image-button-missing-aria-v9"),
        "toolbar-missing-aria-v9": require("./rules/toolbar-missing-aria-v9"),
        "combobox-needs-labelling-v9": require("./rules/combobox-needs-labelling-v9"),
        "no-empty-components-v9": require("./rules/no-empty-components-v9"),
        "accordion-header-needs-labelling-v9": require("./rules/accordion-header-needs-labelling-v9"),
        "accordion-item-needs-header-and-panel-v9": require("./rules/accordion-item-needs-header-and-panel-v9"),
        "compound-button-needs-labelling-v9": require("./rules/compound-button-needs-labelling-v9"),
        "no-empty-buttons-v9": require("./rules/no-empty-buttons-v9"),
        "spin-button-needs-labelling-v9": require("./rules/spin-button-needs-labelling-v9"),
        "spin-button-unrecommended-labelling-v9": require("./rules/spin-button-unrecommended-labelling-v9"),
        "breadcrumb-needs-labelling-v9": require("./rules/breadcrumb-needs-labelling-v9"),
        "dropdown-needs-labelling-v9": require("./rules/dropdown-needs-labelling-v9"),
        "tooltip-not-recommended-v9": require("./rules/tooltip-not-recommended-v9"),
        "avatar-needs-name-v9": require("./rules/avatar-needs-name-v9"),
        "radio-button-missing-label-v9": require("./rules/radio-button-missing-label-v9"),
        "radiogroup-missing-label-v9": require("./rules/radiogroup-missing-label-v9"),
        "prefer-aria-over-title-attribute-v9": require("./rules/prefer-aria-over-title-attribute-v9")
    },
    configs: {
        recommended: {
            rules: {
                "@microsoft/fluentui-jsx-a11y/checkbox-needs-labelling-v9": "error",
                "@microsoft/fluentui-jsx-a11y/image-link-missing-aria-v9": "error",
                "@microsoft/fluentui-jsx-a11y/input-missing-label-v9": "error",
                "@microsoft/fluentui-jsx-a11y/menu-item-needs-labelling-v9": "error",
                "@microsoft/fluentui-jsx-a11y/switch-needs-labelling-v9": "error",
                "@microsoft/fluentui-jsx-a11y/text-area-missing-label-v9": "error",
                "@microsoft/fluentui-jsx-a11y/image-button-missing-aria-v9": "error",
                "@microsoft/fluentui-jsx-a11y/toolbar-missing-aria-v9": "error",
                "@microsoft/fluentui-jsx-a11y/combobox-needs-labelling-v9": "error",
                "@microsoft/fluentui-jsx-a11y/no-empty-components-v9": "error",
                "@microsoft/fluentui-jsx-a11y/accordion-header-needs-labelling-v9": "error",
                "@microsoft/fluentui-jsx-a11y/accordion-item-needs-header-and-panel-v9": "error",
                "@microsoft/fluentui-jsx-a11y/compound-button-needs-labelling-v9": "error",
                "@microsoft/fluentui-jsx-a11y/no-empty-buttons-v9": "error",
                "@microsoft/fluentui-jsx-a11y/spin-button-needs-labelling-v9": "error",
                "@microsoft/fluentui-jsx-a11y/spin-button-unrecommended-labelling-v9": "error",
                "@microsoft/fluentui-jsx-a11y/breadcrumb-needs-labelling-v9": "error",
                "@microsoft/fluentui-jsx-a11y/dropdown-needs-labelling-v9": "error",
                "@microsoft/fluentui-jsx-a11y/tooltip-not-recommended-v9": "error",
                "@microsoft/fluentui-jsx-a11y/avatar-needs-name-v9": "error",
                "@microsoft/fluentui-jsx-a11y/radio-button-missing-label-v9": "error",
                "@microsoft/fluentui-jsx-a11y/radiogroup-missing-label-v9": "error",
                "@microsoft/fluentui-jsx-a11y/prefer-aria-over-title-attribute-v9": "warn"
            }
        }
    }
};

// import processors
module.exports.processors = {
    // add your processors here
};
