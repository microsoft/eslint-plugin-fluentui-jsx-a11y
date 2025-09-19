// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils } from "@typescript-eslint/utils";
import { makeLabeledControlRule } from "../util/ruleFactory";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default ESLintUtils.RuleCreator.withoutDocs(
    makeLabeledControlRule({
        component: "Card",
        messageId: "cardNeedsAccessibleName",
        description: "Accessibility: Interactive Card must have an accessible name via aria-label, aria-labelledby, etc.",
        labelProps: ["aria-label"],
        allowFieldParent: false,
        allowHtmlFor: false,
        allowLabelledBy: true,
        allowWrappingLabel: false,
        allowTooltipParent: true,
        allowDescribedBy: false,
        allowLabeledChild: true,
        allowTextContentChild: true
    })
);
