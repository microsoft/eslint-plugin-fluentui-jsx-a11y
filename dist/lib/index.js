"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      }
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
              o["default"] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
Object.defineProperty(exports, "__esModule", { value: true });
const rules = __importStar(require("./rules"));
//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------
// import all rules in lib/rules
module.exports = {
    rules: {
        "accordion-header-needs-labelling": rules.accordionHeaderNeedsLabelling,
        "accordion-item-needs-header-and-panel": rules.accordionItemNeedsHeaderAndPanel,
        "avatar-needs-name": rules.avatarNeedsName,
        "avoid-using-aria-describedby-for-primary-labelling": rules.avoidUsingAriaDescribedByForPrimaryLabelling,
        "badge-needs-accessible-name": rules.badgeNeedsAccessibleName,
        "breadcrumb-needs-labelling": rules.breadcrumbNeedsLabelling,
        "checkbox-needs-labelling": rules.checkboxNeedsLabelling,
        "combobox-needs-labelling": rules.comboboxNeedsLabelling,
        "compound-button-needs-labelling": rules.compoundButtonNeedsLabelling,
        "counter-badge-needs-count": rules.counterBadgeNeedsCount,
        "dialogbody-needs-title-content-and-actions": rules.dialogbodyNeedsTitleContentAndActions,
        "dialogsurface-needs-aria": rules.dialogsurfaceNeedsAria,
        "dropdown-needs-labelling": rules.dropdownNeedsLabelling,
        "field-needs-labelling": rules.fieldNeedsLabelling,
        "image-button-missing-aria": rules.imageButtonMissingAria,
        "input-components-require-accessible-name": rules.inputComponentsRequireAccessibleName,
        "link-missing-labelling": rules.linkMissingLabelling,
        "menu-item-needs-labelling": rules.menuItemNeedsLabelling,
        "no-empty-buttons": rules.noEmptyButtons,
        "no-empty-components": rules.noEmptyComponents,
        "prefer-aria-over-title-attribute": rules.preferAriaOverTitleAttribute,
        "progressbar-needs-labelling": rules.progressbarNeedsLabelling,
        "radio-button-missing-label": rules.radioButtonMissingLabel,
        "radiogroup-missing-label": rules.radiogroupMissingLabel,
        "rating-needs-name": rules.ratingNeedsName,
        "spin-button-needs-labelling": rules.spinButtonNeedsLabelling,
        "spin-button-unrecommended-labelling": rules.spinButtonUnrecommendedLabelling,
        "spinner-needs-labelling": rules.spinnerNeedsLabelling,
        "switch-needs-labelling": rules.switchNeedsLabelling,
        "tablist-and-tabs-need-labelling": rules.tablistAndTabsNeedLabelling,
        "toolbar-missing-aria": rules.toolbarMissingAria,
        "tooltip-not-recommended": rules.tooltipNotRecommended,
        "visual-label-better-than-aria-suggestion": rules.visualLabelBetterThanAriaSuggestion
    },
    configs: {
        recommended: {
            rules: {
                "@microsoft/fluentui-jsx-a11y/accordion-header-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/accordion-item-needs-header-and-panel": "error",
                "@microsoft/fluentui-jsx-a11y/avatar-needs-name": "error",
                "@microsoft/fluentui-jsx-a11y/avoid-using-aria-describedby-for-primary-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/badge-needs-accessible-name": "error",
                "@microsoft/fluentui-jsx-a11y/breadcrumb-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/checkbox-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/combobox-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/compound-button-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/counter-badge-needs-count": "error",
                "@microsoft/fluentui-jsx-a11y/dialogbody-needs-title-content-and-actions": "error",
                "@microsoft/fluentui-jsx-a11y/dialogsurface-needs-aria": "error",
                "@microsoft/fluentui-jsx-a11y/dropdown-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/field-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/image-button-missing-aria": "error",
                "@microsoft/fluentui-jsx-a11y/input-components-require-accessible-name": "error",
                "@microsoft/fluentui-jsx-a11y/link-missing-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/menu-item-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/no-empty-buttons": "error",
                "@microsoft/fluentui-jsx-a11y/no-empty-components": "error",
                "@microsoft/fluentui-jsx-a11y/prefer-aria-over-title-attribute": "warn",
                "@microsoft/fluentui-jsx-a11y/progressbar-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/radio-button-missing-label": "error",
                "@microsoft/fluentui-jsx-a11y/radiogroup-missing-label": "error",
                "@microsoft/fluentui-jsx-a11y/rating-needs-name": "error",
                "@microsoft/fluentui-jsx-a11y/spin-button-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/spin-button-unrecommended-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/spinner-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/switch-needs-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/tablist-and-tabs-need-labelling": "error",
                "@microsoft/fluentui-jsx-a11y/toolbar-missing-aria": "error",
                "@microsoft/fluentui-jsx-a11y/tooltip-not-recommended": "error",
                "@microsoft/fluentui-jsx-a11y/visual-label-better-than-aria-suggestion": "warn"
            }
        }
    }
};
// import processors
module.exports.processors = {
    // add your processors here
};
