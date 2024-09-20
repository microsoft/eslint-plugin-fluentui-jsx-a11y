"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Loading my-eslint-plugin");
const prefer_aria_over_title_attribute_1 = __importDefault(require("./rules/prefer-aria-over-title-attribute"));
const checkbox_needs_labelling_1 = __importDefault(require("./rules/checkbox-needs-labelling"));
const image_button_missing_aria_1 = __importDefault(require("./rules/buttons/image-button-missing-aria"));
const link_missing_labelling_1 = __importDefault(require("./rules/link-missing-labelling"));
const input_components_require_accessible_name_1 = __importDefault(require("./rules/input-components-require-accessible-name"));
const menu_item_needs_labelling_1 = __importDefault(require("./rules/menu-item-needs-labelling"));
const switch_needs_labelling_1 = __importDefault(require("./rules/switch-needs-labelling"));
const toolbar_missing_aria_1 = __importDefault(require("./rules/toolbar-missing-aria"));
const combobox_needs_labelling_1 = __importDefault(require("./rules/combobox-needs-labelling"));
const no_empty_components_1 = __importDefault(require("./rules/no-empty-components"));
const accordion_header_needs_labelling_1 = __importDefault(require("./rules/accordion-header-needs-labelling"));
const accordion_item_needs_header_and_panel_1 = __importDefault(require("./rules/accordion-item-needs-header-and-panel"));
const compound_button_needs_labelling_1 = __importDefault(require("./rules/buttons/compound-button-needs-labelling"));
const no_empty_buttons_1 = __importDefault(require("./rules/buttons/no-empty-buttons"));
const spin_button_needs_labelling_1 = __importDefault(require("./rules/spin-button-needs-labelling"));
const spin_button_unrecommended_labelling_1 = __importDefault(require("./rules/spin-button-unrecommended-labelling"));
const breadcrumb_needs_labelling_1 = __importDefault(require("./rules/breadcrumb-needs-labelling"));
const dropdown_needs_labelling_1 = __importDefault(require("./rules/dropdown-needs-labelling"));
const tooltip_not_recommended_1 = __importDefault(require("./rules/tooltip-not-recommended"));
const avatar_needs_name_1 = __importDefault(require("./rules/avatar-needs-name"));
const radio_button_missing_label_1 = __importDefault(require("./rules/radio-button-missing-label"));
const radiogroup_missing_label_1 = __importDefault(require("./rules/radiogroup-missing-label"));
const dialogbody_needs_title_content_and_actions_1 = __importDefault(require("./rules/dialogbody-needs-title-content-and-actions"));
const dialogsurface_needs_aria_1 = __importDefault(require("./rules/dialogsurface-needs-aria"));
const spinner_needs_labelling_1 = __importDefault(require("./rules/spinner-needs-labelling"));
const badge_needs_accessible_name_1 = __importDefault(require("./rules/badge-needs-accessible-name"));
const progressbar_needs_labelling_1 = __importDefault(require("./rules/progressbar-needs-labelling"));
const field_needs_labelling_1 = __importDefault(require("./rules/field-needs-labelling"));
const tablist_and_tabs_need_labelling = __importDefault(require("./rules/tablist-and-tabs-need-labelling"));
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------
// import all rules in lib/rules
module.exports = {
    rules: {
        "checkbox-needs-labelling": checkbox_needs_labelling_1.default,
        "image-button-missing-aria": image_button_missing_aria_1.default,
        "link-missing-labelling": link_missing_labelling_1.default,
        "input-components-require-accessible-name": input_components_require_accessible_name_1.default,
        "menu-item-needs-labelling": menu_item_needs_labelling_1.default,
        "switch-needs-labelling": switch_needs_labelling_1.default,
        "toolbar-missing-aria": toolbar_missing_aria_1.default,
        "combobox-needs-labelling": combobox_needs_labelling_1.default,
        "no-empty-components": no_empty_components_1.default,
        "accordion-header-needs-labelling": accordion_header_needs_labelling_1.default,
        "accordion-item-needs-header-and-panel": accordion_item_needs_header_and_panel_1.default,
        "compound-button-needs-labelling": compound_button_needs_labelling_1.default,
        "no-empty-buttons": no_empty_buttons_1.default,
        "spin-button-needs-labelling": spin_button_needs_labelling_1.default,
        "spin-button-unrecommended-labelling": spin_button_unrecommended_labelling_1.default,
        "breadcrumb-needs-labelling": breadcrumb_needs_labelling_1.default,
        "dropdown-needs-labelling": dropdown_needs_labelling_1.default,
        "tooltip-not-recommended": tooltip_not_recommended_1.default,
        "avatar-needs-name": avatar_needs_name_1.default,
        "radio-button-missing-label": radio_button_missing_label_1.default,
        "radiogroup-missing-label": radiogroup_missing_label_1.default,
        "prefer-aria-over-title-attribute": prefer_aria_over_title_attribute_1.default,
        "dialogbody-needs-title-content-and-actions": dialogbody_needs_title_content_and_actions_1.default,
        "dialogsurface-needs-aria": dialogsurface_needs_aria_1.default,
        "spinner-needs-labelling": spinner_needs_labelling_1.default,
        "badge-needs-accessible-name": badge_needs_accessible_name_1.default,
        "progressbar-needs-labelling": progressbar_needs_labelling_1.default,
        "field-needs-labelling": field_needs_labelling_1.default,
        "tablist-and-tabs-need-labelling": tablist_and_tabs_need_labelling.default
    },
    configs: {
        recommended: {
            rules: {
                "@microsoft/fluentui-jsx-a11y/checkbox-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/link-missing-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/input-components-require-accessible-name": "error",
                "@microsoft/fluentui-jsx-a11y/menu-item-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/switch-needs-labelling": "error",
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
                "@microsoft/fluentui-jsx-a11y/prefer-aria-over-title-attribute": "warn",
                "@microsoft/fluentui-jsx-a11y/dialogbody-needs-title-content-and-actions": "error",
                "@microsoft/fluentui-jsx-a11y/dialogsurface-needs-aria": "error",
                "@microsoft/fluentui-jsx-a11y/spinner-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/progressbar-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/field-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/tablist-and-tabs-need-labelling": "error"
            }
        }
    }
};
// import processors
module.exports.processors = {
// add your processors here
};
