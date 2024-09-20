// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

console.log("Loading my-eslint-plugin");
import preferAriaOverTitleAttribute from "./rules/prefer-aria-over-title-attribute";
import checkboxNeedsLabelling from "./rules/checkbox-needs-labelling";
import imageButtonMissingAria from "./rules/buttons/image-button-missing-aria";
import linkMissingLabelling from "./rules/link-missing-labelling";
import inputComponentsRequireAccessibleName from "./rules/input-components-require-accessible-name";
import menuItemNeedsLabelling from "./rules/menu-item-needs-labelling";
import switchNeedsLabelling from "./rules/switch-needs-labelling";
import toolbarMissingAria from "./rules/toolbar-missing-aria";
import comboboxNeedsLabelling from "./rules/combobox-needs-labelling";
import noEmptyComponents from "./rules/no-empty-components";
import accordionHeaderNeedsLabelling from "./rules/accordion-header-needs-labelling";
import accordionItemNeedsHeaderAndPanel from "./rules/accordion-item-needs-header-and-panel";
import compoundButtonNeedsLabelling from "./rules/buttons/compound-button-needs-labelling";
import noEmptyButtons from "./rules/buttons/no-empty-buttons";
import spinButtonNeedsLabelling from "./rules/spin-button-needs-labelling";
import spinButtonUnrecommendedLabelling from "./rules/spin-button-unrecommended-labelling";
import breadcrumbNeedsLabelling from "./rules/breadcrumb-needs-labelling";
import dropwdonNeedsLabelling from "./rules/dropdown-needs-labelling";
import tooltipNotRecommended from "./rules/tooltip-not-recommended";
import avatarNeedsName from "./rules/avatar-needs-name";
import radioButtonMissingLabel from "./rules/radio-button-missing-label";
import radiogroupMissingLabel from "./rules/radiogroup-missing-label";
import dialogbodyNeedsTitleContentAndActions from "./rules/dialogbody-needs-title-content-and-actions";
import dialogsurfaceNeedsAria from "./rules/dialogsurface-needs-aria";
import spinnerNeedsLabelling from "./rules/spinner-needs-labelling";
import badgeNeedsAccessibleName from "./rules/badge-needs-accessible-name";
import progressbarNeedsLabelling from "./rules/progressbar-needs-labelling";
import fieldNeedsLabelling from "./rules/field-needs-labelling";
import CounterBadgeNeedsCount from "./rules/counter-badge-needs-count";
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
    rules: {
        "checkbox-needs-labelling": checkboxNeedsLabelling,
        "image-button-missing-aria": imageButtonMissingAria,
        "link-missing-labelling": linkMissingLabelling,
        "input-components-require-accessible-name": inputComponentsRequireAccessibleName,
        "menu-item-needs-labelling": menuItemNeedsLabelling,
        "switch-needs-labelling": switchNeedsLabelling,
        "toolbar-missing-aria": toolbarMissingAria,
        "combobox-needs-labelling": comboboxNeedsLabelling,
        "no-empty-components": noEmptyComponents,
        "accordion-header-needs-labelling": accordionHeaderNeedsLabelling,
        "accordion-item-needs-header-and-panel": accordionItemNeedsHeaderAndPanel,
        "compound-button-needs-labelling": compoundButtonNeedsLabelling,
        "no-empty-buttons": noEmptyButtons,
        "spin-button-needs-labelling": spinButtonNeedsLabelling,
        "spin-button-unrecommended-labelling": spinButtonUnrecommendedLabelling,
        "breadcrumb-needs-labelling": breadcrumbNeedsLabelling,
        "dropdown-needs-labelling": dropwdonNeedsLabelling,
        "tooltip-not-recommended": tooltipNotRecommended,
        "avatar-needs-name": avatarNeedsName,
        "radio-button-missing-label": radioButtonMissingLabel,
        "radiogroup-missing-label": radiogroupMissingLabel,
        "prefer-aria-over-title-attribute": preferAriaOverTitleAttribute,
        "dialogbody-needs-title-content-and-actions": dialogbodyNeedsTitleContentAndActions,
        "dialogsurface-needs-aria": dialogsurfaceNeedsAria,
        "spinner-needs-labelling": spinnerNeedsLabelling,
        "badge-needs-accessible-name": badgeNeedsAccessibleName,
        "progressbar-needs-labelling": progressbarNeedsLabelling,
        "field-needs-labelling": fieldNeedsLabelling,
        "counter-badge-needs-count": CounterBadgeNeedsCount
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
                "@microsoft/fluentui-jsx-a11y/field-needs-labelling": "error"
            }
        }
    }
};

// import processors
module.exports.processors = {
    // add your processors here
};
