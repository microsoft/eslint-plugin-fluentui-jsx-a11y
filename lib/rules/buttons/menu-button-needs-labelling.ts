// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils } from "@typescript-eslint/utils";
import { makeLabeledControlRule } from "../../util/ruleFactory";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default ESLintUtils.RuleCreator.withoutDocs(
    makeLabeledControlRule({
        component: "MenuButton",
        messageId: "menuButtonNeedsLabelling",
        description: "Accessibility: MenuButton must have an accessible name via aria-label, text content, aria-labelledby, etc.",
        labelProps: ["aria-label"],
        allowFieldParent: false,
        allowHtmlFor: false,
        allowLabelledBy: true,
        allowWrappingLabel: true,
        allowTooltipParent: true,
        allowDescribedBy: false,
        allowLabeledChild: true,
        allowTextContentChild: true
    })
);
