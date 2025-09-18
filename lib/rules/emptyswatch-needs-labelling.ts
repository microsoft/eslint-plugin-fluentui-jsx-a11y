// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils } from "@typescript-eslint/utils";
import { makeLabeledControlRule } from "../util/ruleFactory";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default ESLintUtils.RuleCreator.withoutDocs(
    makeLabeledControlRule({
        component: "EmptySwatch",
        messageId: "noUnlabeledEmptySwatch",
        description: "Accessibility: EmptySwatch must have an accessible name via aria-label, Tooltip, aria-labelledby, etc..",
        labelProps: ["aria-label"],
        allowFieldParent: false,
        allowHtmlFor: true,
        allowLabelledBy: true,
        allowWrappingLabel: true,
        allowTooltipParent: true,
        allowDescribedBy: false,
        allowLabeledChild: false,
        allowTextContentChild: true
    })
);
