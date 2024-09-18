// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prefer_aria_over_title_attribute_1 = __importDefault(require("./rules/prefer-aria-over-title-attribute"));
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
        "checkbox-needs-labelling": require("./rules/checkbox-needs-labelling"),
        "image-button-missing-aria": require("./rules/image-button-missing-aria"),
        "image-link-missing-aria": require("./rules/image-link-missing-aria"),
        "input-missing-label": require("./rules/input-missing-label"),
        "menu-item-needs-labelling": require("./rules/menu-item-needs-labelling"),
        "switch-needs-labelling": require("./rules/switch-needs-labelling"),
        "text-area-missing-label": require("./rules/text-area-missing-label"),
        "toolbar-missing-aria": require("./rules/toolbar-missing-aria"),
        "combobox-needs-labelling": require("./rules/combobox-needs-labelling"),
        "no-empty-components": require("./rules/no-empty-components"),
        "accordion-header-needs-labelling": require("./rules/accordion-header-needs-labelling"),
        "accordion-item-needs-header-and-panel": require("./rules/accordion-item-needs-header-and-panel"),
        "compound-button-needs-labelling": require("./rules/compound-button-needs-labelling"),
        "no-empty-buttons": require("./rules/no-empty-buttons"),
        "spin-button-needs-labelling": require("./rules/spin-button-needs-labelling"),
        "spin-button-unrecommended-labelling": require("./rules/spin-button-unrecommended-labelling"),
        "breadcrumb-needs-labelling": require("./rules/breadcrumb-needs-labelling"),
        "dropdown-needs-labelling": require("./rules/dropdown-needs-labelling"),
        "tooltip-not-recommended": require("./rules/tooltip-not-recommended"),
        "avatar-needs-name": require("./rules/avatar-needs-name"),
        "radio-button-missing-label": require("./rules/radio-button-missing-label"),
        "radiogroup-missing-label": require("./rules/radiogroup-missing-label"),
        "prefer-aria-over-title-attribute": prefer_aria_over_title_attribute_1.default
    },
    configs: {
        recommended: {
            rules: {
                "@microsoft/fluentui-jsx-a11y/checkbox-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/image-link-missing-aria": "error",
                "@microsoft/fluentui-jsx-a11y/input-missing-label": "error",
                "@microsoft/fluentui-jsx-a11y/menu-item-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/switch-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/text-area-missing-label": "error",
                "@microsoft/fluentui-jsx-a11y/image-button-missing-aria": "error",
                "@microsoft/fluentui-jsx-a11y/toolbar-missing-aria": "error",
                "@microsoft/fluentui-jsx-a11y/combobox-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/no-empty-components": "error",
                "@microsoft/fluentui-jsx-a11y/accordion-header-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/accordion-item-needs-header-and-panel": "error",
                "@microsoft/fluentui-jsx-a11y/compound-button-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/no-empty-buttons": "error",
                "@microsoft/fluentui-jsx-a11y/spin-button-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/spin-button-unrecommended-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/breadcrumb-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/dropdown-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/tooltip-not-recommended": "error",
                "@microsoft/fluentui-jsx-a11y/avatar-needs-name": "error",
                "@microsoft/fluentui-jsx-a11y/radio-button-missing-label": "error",
                "@microsoft/fluentui-jsx-a11y/radiogroup-missing-label": "error",
                "@microsoft/fluentui-jsx-a11y/prefer-aria-over-title-attribute": "warn"
            }
        }
    }
};
// import processors
module.exports.processors = {
// add your processors here
};
